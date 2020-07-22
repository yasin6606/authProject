import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn, MDBInput, MDBAlert, } from 'mdbreact';
import axios from 'axios';
import "./../../CSS/rtl.css";
import "./../../CSS/fontSize.css";
import { FaUserTimes, FaDatabase, FaUserPlus } from "react-icons/fa";
import * as LS from 'local-storage';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const FormPage = props => {

    const [state, setState] = useState({
        email: undefined,
        password: undefined,
        wrongLogin: false,
        wrongServer: false,
        successLogin: false,
    });

    // get email
    const handleEmail = email => setState({ email });

    // get password
    const handlePassword = password => setState({ ...state, password });

    const subLogin = (e) => {
        e.preventDefault();

        const values = {
            email: state.email,
            password: state.password,
        };

        axios.post("http://localhost:5002/api/v1/login/login", values)
            .then(res => {
                LS.clear();

                LS.set("info", res.data)

                props.dispatch({ type: "someoneLoggedIn" }); // just for refreshing and go to the dashboard
            })
            .catch(err => err.request.status === 401 ? setState({ wrongLogin: true }) : setState({ wrongServer: true }));
    };

    return (
        <MDBContainer className="text-right">
            <MDBRow className="justify-content-center mt-5">
                <MDBCol xl="6" lg="7" md="8" sm="10" xs="10">
                    <MDBAnimation type="slideInDown">
                        <MDBRow>
                            <MDBCol>
                                <form className="p-3 border mt-5" onSubmit={subLogin}>
                                    <div className="form-row text-center">
                                        <MDBCol>
                                            <h4>ورود</h4>
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="email" label="پست الکترونیکی" getValue={handleEmail} />
                                        </MDBCol>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol>
                                            <MDBInput type="password" label="رمز عبور" getValue={handlePassword} />
                                        </MDBCol>
                                    </div>
                                    <div className={state.wrongLogin ? "form-row d-flex justify-content-center" : "d-none"}>
                                        <MDBAnimation type="tada">
                                            <MDBCol>
                                                <MDBAlert color="danger">
                                                    <span className="px-2">
                                                        <FaUserTimes />
                                                    </span>
                                                    <span className="px-2">
                                                        <p className="m-0 tinyFontSize d-inline-block">نام کاربری یا رمز عبور صحیح نمی باشد</p>
                                                    </span>
                                                </MDBAlert>
                                            </MDBCol>
                                        </MDBAnimation>
                                    </div>
                                    <div className={state.wrongServer ? "form-row d-flex justify-content-center" : "d-none"}>
                                        <MDBAnimation type="swing">
                                            <MDBCol>
                                                <MDBAlert color="warning">
                                                    <span className="px-2">
                                                        <FaDatabase />
                                                    </span>
                                                    <span className="px-2">
                                                        <p className="m-0 tinyFontSize d-inline-block">ارتباط با سرور را بررسی کنید</p>
                                                    </span>
                                                </MDBAlert>
                                            </MDBCol>
                                        </MDBAnimation>
                                    </div>
                                    <div className="form-row">
                                        <MDBCol className="text-center">
                                            <MDBBtn type="submit" color="cyan" className="w-50">ورود</MDBBtn>
                                        </MDBCol>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default connect()(FormPage);