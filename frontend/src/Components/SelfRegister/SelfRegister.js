import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAnimation } from 'mdbreact';
import axios from 'axios';
import './../../CSS/rtl.css';
import './../../CSS/fontSize.css';
import * as LS from 'local-storage';
import { connect } from 'react-redux';

class SelfRegister extends Component {

    state = {
        email: undefined,
        phone: undefined,
        password: {
            value: undefined,
            valid: false,
        },
        userInfo: undefined,
    };

    // get email
    getEmail = email => this.setState({ email });

    // get phone
    getPhone = phone => this.setState({ phone });

    // get password
    getPassword = password => {
        if (password.target.value.length > 7) this.setState({ password: { value: password.target.value, valid: false }, })
        else this.setState({ password: { valid: true } });
    };

    selfReg = async e => {
        e.preventDefault();

        const values = {
            email: this.state.email,
            phone: Number(this.state.phone),
            password: this.state.password.value,
        };

        const selfReg = await axios.post("http://localhost:5002/api/v1/login/selfRegister", values);

        if (!selfReg) {
            return // error
        };

        this.setState({ userInfo: selfReg.data });
        LS.set("successSelfRefLoggedIn", selfReg.data._id);
        this.props.dispatch({ type: "successFirstSelfReg", loginId: selfReg.data._id });
    };

    render() {
        return (
            <>
                <MDBContainer className="text-right">
                    <MDBRow>
                        <MDBCol>
                            <MDBAnimation type="flipInY">
                                <form onSubmit={this.selfReg} className="border-right border-left px-3 mt-4">
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="email" label="پست الکترونیکی" getValue={this.getEmail} required />
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="text" label="شماره تلفن" getValue={this.getPhone} required />
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="text" label="رمز عبور" onChange={this.getPassword} className={this.state.password.valid ? "is-invalid" : null} required />
                                            <div className={this.state.password.valid ? "is-invalid" : "d-none"}>
                                                <MDBAnimation type="tada">
                                                    <p className="m-0 tinyFontSize text-danger">لطفاً حداقل <b className="font-weight-bold">هشت </b> کارکتر وارد کنید</p>
                                                </MDBAnimation>
                                            </div>
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol middle className="d-flex justify-content-center pt-5">
                                            <MDBBtn type="submit" className="col-9">ثبت نام</MDBBtn>
                                        </MDBCol>
                                    </div>
                                </form>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};

export default connect()(SelfRegister);