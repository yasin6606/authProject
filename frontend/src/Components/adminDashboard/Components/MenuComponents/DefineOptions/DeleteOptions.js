import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation, MDBAlert } from 'mdbreact';
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaExclamation, FaCheck, FaPrescriptionBottleAlt } from 'react-icons/fa';
import axios from 'axios';

class DeleteOptions extends Component {

    state = {
        optionsList: [],
        optionSelectedToShow: undefined,
        delOptionSuccess: false,
        delOptionFailed: false,
    };

    // select option
    selectOption = option => this.setState({ optionSelectedToShow: option.subOptId.optionName, accOptModelId: option._id, optionId: option.subOptId._id });

    // delete option
    delOption = e => {
        axios.delete(`http://localhost:5002/api/v1/admin/deleteOption/${this.state.accOptModelId}/${this.state.optionId}`)
            .then(res => {
                this.setState({ delOptionSuccess: true });
                // setTimeout(() => window.location.reload(), 3000);
            })
            .catch(err => {
                this.setState({ delOptionFailed: true });
                // setTimeout(() => window.location.reload(), 3000);
            });
    };

    componentDidMount = () => {

        // list of options to show and delete
        axios.get("http://localhost:5002/api/v1/admin/showOptions")
            .then(res => {
                res.data.map(eachOption => {
                    this.setState({
                        optionsList: [
                            ...this.state.optionsList,
                            <Dropdown.Item key={eachOption._id} onClick={() => this.selectOption(eachOption)} className="border-bottom py-2 px-1">
                                <div>
                                    <h6 className="font-weight-bold">
                                        {eachOption.subOptId.optionName}
                                    </h6>
                                </div>
                                <div>
                                    {
                                        (
                                            eachOption.accessLevelsId.title === "levelOne"
                                                ?
                                                <p className="tinyFontSize text-danger d-inline-block w3-small">سطح دسترسی یک</p>
                                                :
                                                null
                                        )
                                        ||
                                        (
                                            eachOption.accessLevelsId.title === "levelTwo"
                                                ?
                                                <p className="tinyFontSize text-danger d-inline-block w3-small">سطح دسترسی دو</p>
                                                :
                                                null
                                        )
                                        ||
                                        (
                                            eachOption.accessLevelsId.title === "levelThree"
                                                ?
                                                <p className="tinyFontSize text-danger d-inline-block w3-small">سطح دسترسی سه</p>
                                                :
                                                null
                                        )
                                    }
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
                                    <MDBAnimation type="shake" className={this.state.delOptionSuccess ? "fixed-bottom d-inline-flex" : "d-none"}>
                                        <MDBAlert color="success">
                                            <span className="px-1">
                                                <FaCheck />
                                            </span>
                                            <span className="px-1">
                                                <p className="d-inline-block m-0 tinyFontSize">آپشن مورد نظر با موفقیت حذف شد</p>
                                            </span>
                                        </MDBAlert>
                                    </MDBAnimation>
                                    <MDBAnimation type="shake" className={this.state.delOptionFailed ? "fixed-bottom d-inline-flex" : "d-none"}>
                                        <MDBAlert color="danger">
                                            <span className="px-1">
                                                <FaExclamation />
                                            </span>
                                            <span className="px-1">
                                                <p className="d-inline-block m-0 tinyFontSize">خطا در حذف آپشن مورد نظر رخ داده</p>
                                            </span>
                                        </MDBAlert>
                                    </MDBAnimation>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <h2 className="font-weight-bold d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">حذف آپشن</h2>
                                    <h4 className="font-weight-bold d-xl-none d-lg-none d-md-none">حذف آپشن</h4>
                                </MDBCol>
                                <MDBCol className="d-flex justify-content-end">
                                    <NavLink to="/defineOptions">
                                        <span className="px-1">
                                            <FaPrescriptionBottleAlt />
                                        </span>
                                        <span className="px-1 font-weight-bold">آپشن ها</span>
                                    </NavLink>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mt-4">
                                <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                    <Dropdown drop="down" className="col-12 col-md-8 col-lg-6 col-xl-6 px-0">
                                        <Dropdown.Toggle color="info" caret="true" className="w-100">
                                            <p className="m-0 d-inline-block px-2 tinyFontSize">انتخاب آپشن</p>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu color="primary" right="true" className="text-right w-100" style={{ height: '200px', overflowY: 'auto' }}>
                                            {this.state.optionsList}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </MDBCol>
                                <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                    <p className="m-0 text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning">
                                        {this.state.optionSelectedToShow}
                                    </p>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={this.state.optionSelectedToShow ? null : "d-none"}>
                                <MDBCol className="my-5 d-flex justify-content-center">
                                    <MDBBtn color="danger" onClick={this.delOption}>حذف آپشن</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default DeleteOptions;