import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert, MDBAnimation, } from 'mdbreact';
import { Dropdown } from 'react-bootstrap';
import { FaExclamation, FaCheck, FaTasks, FaDatabase, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './../../../../../CSS/fontSize.css';
import { NavLink } from 'react-router-dom';

class DefineAccessLevel extends Component {

    state = {
        accLev: undefined,
        databaseAlert: false,
        fillAlert: false,
        successAlert: false,
        optionsList: [],
        optionSelectedToShow: undefined,
        delOptionSuccess: false,
        delOptionFailed: false,
        optionsId: undefined,
        accOptModelId: undefined,
        serverError: false,
    };

    // new access level
    accLevInput = e => this.setState({ accLev: e });

    // send new access level to the server
    createAccLev = e => {
        e.preventDefault();

        if (this.state.accLev !== undefined) {
            axios.post("http://localhost:5002/api/v1/admin/defineNewAccessLevel", { accessLevel: this.state.accLev })
                .then(res => {
                    this.setState({ successAlert: true });
                })
                .catch(err => {
                    this.setState({ databaseAlert: true });
                });

        } else {
            this.setState({ fillAlert: true });
        };
    };

    render = () => {
        return (
            <>
                <MDBContainer className="mb-5 mt-2 mt-xl-0 mt-lg-0 mt-md-0 pr-4 pr-xl-3 pr-lg-3 pr-md-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBAnimation type="slideInDown" className={this.state.successAlert ? "d-inline-flex" : "d-none"}>
                                <MDBAlert color="success">
                                    <span className="px-1">
                                        <FaCheck />
                                    </span>
                                    <span className="px-1">
                                        <p className="d-inline-block m-0 tinyFontSize">سطح دسترسی مورد نظر با موفقیت ایجاد شد</p>
                                    </span>
                                </MDBAlert>
                            </MDBAnimation>
                            <MDBAnimation type="wobble" className={this.state.databaseAlert ? "d-inline-flex" : "d-none"}>
                                <MDBAlert color="danger">
                                    <span className="px-1">
                                        <FaDatabase />
                                    </span>
                                    <span className="px-1">
                                        <p className="d-inline-block m-0 tinyFontSize">خطا در ایجاد سطح دسترسی ، ارتباط با سرور را بررسی کنید</p>
                                    </span>
                                </MDBAlert>
                            </MDBAnimation>
                            <MDBAnimation type="shake" className={this.state.fillAlert ? "d-inline-flex" : "d-none"}>
                                <MDBAlert color="warning">
                                    <span className="px-1">
                                        <FaTasks />
                                    </span>
                                    <span className="px-1">
                                        <p className="d-inline-block m-0 tinyFontSize">لطفاً تمام موارد را پر کنید</p>
                                    </span>
                                </MDBAlert>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-4">
                        <MDBCol>
                            <h2 className="font-weight-bold d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">تعریف سطح دسترسی</h2>
                            <h5 className="font-weight-bold d-xl-none d-lg-none d-md-none">تعریف سطح دسترسی</h5>
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-end">
                            <NavLink to="/deleteAccessLevels" className="text-danger">
                                <span className="px-1">
                                    <FaTrashAlt />
                                </span>
                                <span className="px-1 font-weight-bold">حذف سطح دسترسی</span>
                            </NavLink>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol className="p-2">
                            <form onSubmit={this.createAccLev}>
                                <MDBRow>
                                    <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" className="mt-3 w3-small">
                                        <MDBInput label="تعریف سطح دسترسی جدید" getValue={this.accLevInput} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="mt-5">
                                    <MDBCol>
                                        <MDBBtn type="submit" color="cyan" className="col-12 col-md-7 col-lg-5 col-xl-4">ایجاد سطح دسترسی</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};

export default DefineAccessLevel;