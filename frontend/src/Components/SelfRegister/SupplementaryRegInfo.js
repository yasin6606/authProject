import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAnimation } from 'mdbreact';
import axios from 'axios';
import * as LS from 'local-storage';
import { connect } from 'react-redux';

class SupplementaryInfo extends Component {

    state = {
        fName: undefined,
        lName: undefined,
        nationalId: undefined,
        gender: undefined,
    };

    // get first name
    fName = e => this.setState({ fName: e.target.value });

    // get last name
    lName = e => this.setState({ lName: e.target.value });

    // get national id
    nationalId = e => this.setState({ nationalId: e.target.value });

    // get gender
    gender = e => this.setState({ gender: e.target.value });

    // send form by axios
    secondReg = async e => {
        e.preventDefault();

        const values = {
            userLoginId: this.props.loginId,
            firstName: this.state.fName,
            lastName: this.state.lName,
            nationalID: Number(this.state.nationalId),
            gender: this.state.gender === "female", // send (true) for female and (false) for male
        };

        const regCompleted = await axios.post("http://localhost:5002/api/v1/admin/supplementaryReg", values);

        if (!regCompleted) {
            return // error
        };

        LS.set("normalUserLoggedIn", true);
        LS.set("userId", regCompleted.data._id);
        window.location.reload();
    };

    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBAnimation type="flipInX">
                                <form onSubmit={this.secondReg} className="border-right border-left px-3 mt-4">
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="text" label="نام" onChange={this.fName} />
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="text" label="نام خانوادگی" onChange={this.lName} />
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="text" label="کد ملّی" onChange={this.nationalId} />
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol className="d-flex justify-content-start">
                                            <span className="px-2">
                                                <label htmlFor="male" className="px-2">مرد</label>
                                                <input type="radio" name="gender" id="male" value="male" onChange={this.gender} />
                                            </span>
                                            <span className="px-2">
                                                <label htmlFor="female" className="px-2">زن</label>
                                                <input type="radio" name="gender" id="female" value="female" onChange={this.gender} />
                                            </span>
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol middle className="d-flex justify-content-center pt-5">
                                            <MDBBtn type="submit" color="pink" className="col-9">ثبت</MDBBtn>
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

export default connect()(SupplementaryInfo);