import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation, MDBAlert } from 'mdbreact';
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaExclamation, FaCheck, FaPrescriptionBottleAlt } from 'react-icons/fa';
import axios from 'axios';

class DeleteAccessLevel extends Component {

    state = {
        accessLevelsList: [],
        accessLevelSelectedToShow: undefined,
        delAccessLevelSuccess: false,
        delAccessLevelFailed: false,
    };

    // select option
    selectAccessLevel = accessLevel => this.setState({ accessLevelSelectedToShow: accessLevel.title, accLevId: accessLevel._id });

    // delete option
    delAccessLevel = e => {
        axios.delete(`http://localhost:5002/api/v1/admin/deleteAccessLevels/${this.state.accLevId}`)
            .then(res => {
                this.setState({ delAccessLevelSuccess: true });
            })
            .catch(err => {
                this.setState({ delAccessLevelFailed: true });
            });
    };

    componentDidMount = () => {

        // list of options to show and access levels
        axios.get("http://localhost:5002/api/v1/admin/showAccessLevels")
            .then(res => {
                res.data.map(eachAccessLevel => {
                    this.setState({
                        accessLevelsList: [
                            ...this.state.accessLevelsList,
                            <Dropdown.Item key={eachAccessLevel._id} onClick={() => this.selectAccessLevel(eachAccessLevel)} className="py-3 px-1">
                                <div>
                                    <h6 className="font-weight-bold">
                                        {eachAccessLevel.title}
                                    </h6>
                                </div>
                            </Dropdown.Item>
                        ],
                    });
                });
            })
            .catch(err => {
                this.setState({ serverError: true });
            });
    };

    render() {
        return (
            <>
                <MDBContainer className="mt-4">
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <MDBAnimation type="slideInDown" className={this.state.delAccessLevelSuccess ? "d-inline-flex" : "d-none"}>
                                        <MDBAlert color="success">
                                            <span className="px-1">
                                                <FaCheck />
                                            </span>
                                            <span className="px-1">
                                                <p className="d-inline-block m-0 tinyFontSize">سطح دسترسی مورد نظر با موفقیت حذف شد</p>
                                            </span>
                                        </MDBAlert>
                                    </MDBAnimation>
                                    <MDBAnimation type="shake" className={this.state.delAccessLevelFailed ? "d-inline-flex" : "d-none"}>
                                        <MDBAlert color="danger">
                                            <span className="px-1">
                                                <FaExclamation />
                                            </span>
                                            <span className="px-1">
                                                <p className="d-inline-block m-0 tinyFontSize">خطا در حذف سطح دسترسی مورد نظر رخ داده</p>
                                            </span>
                                        </MDBAlert>
                                    </MDBAnimation>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBAlert color="warning">
                                        <div className="text-danger">
                                            <span className="px-1">
                                                <MDBAnimation type="wobble" infinite className="d-inline-flex">
                                                    <FaExclamation />
                                                </MDBAnimation>
                                            </span>
                                            <span className="px-1">
                                                <h3 className="font-weight-bold d-inline-block">توجه</h3>
                                            </span>
                                        </div>
                                        <div className="pr-xl-5 pr-lg-5 pr-3">
                                            <p className="tinyFontSize">با حذف سطح دسترسی مورد نظر ، تمام آپشن های مرتبط با آن نیز حذف خواهند شد</p>
                                        </div>
                                    </MDBAlert>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <h2 className="font-weight-bold d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">حذف سطح دسترسی</h2>
                                    <h6 className="font-weight-bold d-xl-none d-lg-none d-md-none">حذف سطح دسترسی</h6>
                                </MDBCol>
                                <MDBCol className="d-flex justify-content-end">
                                    <NavLink to="/defineOptions">
                                        <span className="px-1">
                                            <FaPrescriptionBottleAlt />
                                        </span>
                                        <span className="px-1 font-weight-bold d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">سطح دسترسی ها</span>
                                        <span className="px-1 font-weight-bold  d-xl-none d-lg-none d-md-none w3-small">سطح دسترسی ها</span>
                                    </NavLink>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mt-4">
                                <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                    <Dropdown drop="down" className="col-12 col-md-8 col-lg-6 col-xl-6 px-0">
                                        <Dropdown.Toggle color="info" caret="true" className="w-100">
                                            <p className="m-0 d-inline-block px-2 tinyFontSize">انتخاب سطح دسترسی</p>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu color="primary" right="true" className="text-right w-100" style={{ height: '200px', overflowY: 'auto' }}>
                                            {this.state.accessLevelsList}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </MDBCol>
                                <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                    <p className="m-0 text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning">
                                        {this.state.accessLevelSelectedToShow}
                                    </p>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={this.state.accessLevelSelectedToShow ? null : "d-none"}>
                                <MDBCol className="my-5 d-flex justify-content-center">
                                    <MDBBtn color="danger" onClick={this.delAccessLevel}>حذف سطح دسترسی</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default DeleteAccessLevel;