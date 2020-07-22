import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBAlert, MDBBtn } from 'mdbreact';
import { Dropdown } from 'react-bootstrap';
import { FaCheck, FaExclamation, FaTrashAlt, FaConnectdevelop } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './../../../../../CSS/fontSize.css';

class DeleteRoles extends Component {

    state = {
        rolesList: [],
        roleSelectedToShow: undefined,
        delRoleSuccess: false,
        delRoleFailed: false,
    };


    // select role
    selectRole = role => this.setState({ roleSelectedToShow: role, roleAccRolesId: role._id, roleId: role.roleId._id });


    // delete Role
    delRole = e => {
        axios.delete(`http://localhost:5002/api/v1/admin/deleteRole/${this.state.roleAccRolesId}/${this.state.roleId}`)
            .then(res => {
                this.setState({ delRoleSuccess: true });
                // setTimeout(() => window.location.reload(), 3000);
            })
            .catch(err => {
                this.setState({ delRoleFailed: true });
                // setTimeout(() => window.location.reload(), 3000);
            });
    };


    componentDidMount = () => {
        // list of roles to show and delete
        axios.get("http://localhost:5002/api/v1/admin/showGroupRoles")
            .then(res => {
                res.data.map(eachRole => {
                    this.setState({
                        rolesList: [
                            ...this.state.rolesList,
                            <Dropdown.Item key={eachRole._id} onClick={() => this.selectRole(eachRole)} className="border-bottom py-2 px-1">
                                <div>
                                    <h5 className="font-weight-bold">
                                        {eachRole.roleId.roleName}
                                    </h5>
                                </div>
                            </Dropdown.Item>
                        ],
                    });
                });
            })
            .catch(err => this.setState({ serverError: true }));
    };


    render() {
        return (
            <>
                <MDBContainer className="mt-4">
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <h2 className="font-weight-bold d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">حذف نقش</h2>
                                    <h4 className="font-weight-bold d-xl-none d-lg-none d-md-none">حذف نقش</h4>
                                </MDBCol>
                                <MDBCol className="d-flex justify-content-end">
                                    <NavLink to="/defineRoles">
                                        <span className="px-1">
                                            <FaConnectdevelop />
                                        </span>
                                        <span className="px-1 font-weight-bold">نقش ها</span>
                                    </NavLink>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mt-5">
                                <MDBCol>
                                    <MDBRow>
                                        <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                            <Dropdown drop="down" className="col-12 col-md-8 col-lg-6 col-xl-6 px-0">
                                                <Dropdown.Toggle color="info" caret="true" className="w-100">
                                                    <p className="m-0 d-inline-block px-2 tinyFontSize">انتخاب نقش</p>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu color="primary" right="true" className="text-right w-100" style={{ height: '170px', overflow: 'auto' }}>
                                                    {this.state.rolesList}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </MDBCol>
                                        <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                            <MDBRow className={this.state.roleSelectedToShow ? null : "d-none"}>
                                                <MDBCol middle={true}>
                                                    <strong>نام نقش : </strong>
                                                </MDBCol>
                                                <MDBCol middle={true}>
                                                    <p className="text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning">
                                                        {
                                                            this.state.roleSelectedToShow !== undefined
                                                                ?
                                                                this.state.roleSelectedToShow.roleId.roleName
                                                                :
                                                                null
                                                        }
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={this.state.roleSelectedToShow ? "mt-4" : "d-none"}>
                                                <MDBCol>
                                                    <strong>آپشن ها : </strong>
                                                </MDBCol>
                                                <MDBCol>
                                                    <p>
                                                        {
                                                            this.state.roleSelectedToShow !== undefined
                                                                ?
                                                                this.state.roleSelectedToShow.accSubOptId.map(eachOpt => {
                                                                    if (eachOpt.accessLevelsId.title === "levelOne") {
                                                                        return (
                                                                            <>
                                                                                <p className="m-0 tinyFontSize d-inline-block text-secondary">
                                                                                    {eachOpt.subOptId.optionName}
                                                                                </p>
                                                                                <br />
                                                                            </>
                                                                        )
                                                                    };
                                                                    if (eachOpt.accessLevelsId.title === "levelTwo") {
                                                                        return (
                                                                            <>
                                                                                <p className="m-0 tinyFontSize d-inline-block text-secondary">
                                                                                    {eachOpt.subOptId.optionName}
                                                                                </p>
                                                                                <br />
                                                                            </>
                                                                        )
                                                                    };
                                                                    if (eachOpt.accessLevelsId.title === "levelThree") {
                                                                        return (
                                                                            <>
                                                                                <p className="m-0 tinyFontSize d-inline-block text-secondary">
                                                                                    {eachOpt.subOptId.optionName}
                                                                                </p>
                                                                                <br />
                                                                            </>
                                                                        )
                                                                    };
                                                                })
                                                                :
                                                                null
                                                        }
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className={this.state.roleSelectedToShow ? null : "d-none"}>
                                        <MDBCol className="my-5 d-flex justify-content-center">
                                            <MDBBtn color="danger" onClick={this.delRole}>حذف نقش</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBAnimation type="slideInUp" className={this.state.delRoleSuccess ? "d-flex" : "d-none"}>
                                <MDBAlert color="success">
                                    <span className="px-1">
                                        <FaCheck />
                                    </span>
                                    <span className="px-1">
                                        <p className="d-inline-block m-0 tinyFontSize">نقش مورد نظر با موفقیت حذف شد</p>
                                    </span>
                                </MDBAlert>
                            </MDBAnimation>
                            <MDBAnimation type="shake" className={this.state.delRoleFailed ? "d-flex" : "d-none"}>
                                <MDBAlert color="danger">
                                    <span className="px-1">
                                        <FaExclamation />
                                    </span>
                                    <span className="px-1">
                                        <p className="d-inline-block m-0 tinyFontSize">خطا در حذف نقش مورد نظر رخ داده</p>
                                    </span>
                                </MDBAlert>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default DeleteRoles;