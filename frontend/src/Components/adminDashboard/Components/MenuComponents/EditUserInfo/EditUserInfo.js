import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBAlert, MDBInputGroup, MDBInput, MDBBtn, MDBSpinner } from 'mdbreact';
import axios from 'axios';
import { FaExclamation, FaCheckSquare, FaFan } from 'react-icons/fa';
import './../../../../../CSS/fontSize.css';

class EditUserInfo extends Component {

    state = {
        information: "",
        updatedInfos: {
            firstName: undefined,
            lastName: undefined,
            nationalID: undefined,
            gender: undefined,
            activity: undefined,
            role: undefined,
        },
        updateFailed: false,
        updateSuccess: false,
        loadingBtn: undefined,
    };

    componentDidMount = async () => {
        const infos = await axios.get(`http://localhost:5002/api/v1/admin/singleUserInfo/${this.props.match.params.userID}`);

        if (!infos) return this.setState({ notFound: true });

        this.setState({
            information: infos.data,
        });
    };

    // on change firstName
    handleFName = e => {
        this.setState({ updatedInfos: { ...this.state.updatedInfos, firstName: e.target.value } });
    };

    // on change lastName
    handleLName = e => {
        this.setState({ updatedInfos: { ...this.state.updatedInfos, lastName: e.target.value } });
    };

    // on change national id
    handleNationalID = e => {
        this.setState({ updatedInfos: { ...this.state.updatedInfos, nationalID: e.target.value } });
    };

    // on change gender
    handleGender = e => {
        this.setState({ updatedInfos: { ...this.state.updatedInfos, gender: e.target.value } });
    };


    // on change activity
    handleActivity = e => {
        this.setState({ updatedInfos: { ...this.state.updatedInfos, activity: e.target.value } });
    };

    // on change role
    handleRole = e => {
        this.setState({ updatedInfos: { ...this.state.updatedInfos, role: e.target.id } });
    };


    // submit edit form
    subEditFrm = async e => {
        e.preventDefault();

        // start loading ...
        this.setState({ loadingBtn: true });

        // new values
        const newValues = {
            firstName: this.state.updatedInfos.firstName || this.state.information.firstName,
            lastName: this.state.updatedInfos.lastName || this.state.information.lastName,
            nationalID: this.state.updatedInfos.nationalID || this.state.information.nationalID,
            gender: this.state.updatedInfos.gender || this.state.information.gender,
            active: this.state.updatedInfos.activity || this.state.information.active,
            role: this.state.updatedInfos.role || this.state.information.role,
        };

        // send new values
        const updateUserInformation = await axios.put(`http://localhost:5002/api/v1/admin/updateUserInfo/${this.props.match.params.userID}`, newValues);

        if (!updateUserInformation) return this.setState({ updateSuccess: false, updateFailed: true, loadingBtn: false });

        this.setState({ updateSuccess: true, updateSuccess: true, updateFailed: false, loadingBtn: false });
    };

    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <form onSubmit={this.subEditFrm} className="p-3">
                                <MDBRow className="py-3">
                                    <MDBCol xl="2" lg="3" md="3" sm="12" xs="12">
                                        <p className="font-weight-bold">نام : </p>
                                    </MDBCol>
                                    <MDBCol xl="10" lg="9" md="9" sm="12" xs="12">
                                        <input type="text" className="form-control" defaultValue={this.state.information.firstName} onChange={this.handleFName} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="py-3">
                                    <MDBCol xl="2" lg="3" md="3" sm="12" xs="12">
                                        <p className="font-weight-bold">نام خانوادگی : </p>
                                    </MDBCol>
                                    <MDBCol xl="10" lg="9" md="9" sm="12" xs="12">
                                        <input type="text" className="form-control" defaultValue={this.state.information.lastName} onChange={this.handleLName} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="py-3">
                                    <MDBCol xl="2" lg="3" md="3" sm="12" xs="12">
                                        <p className="font-weight-bold">کد ملّی : </p>
                                    </MDBCol>
                                    <MDBCol xl="10" lg="9" md="9" sm="12" xs="12">
                                        <input type="number" className="form-control" defaultValue={this.state.information.nationalID} onChange={this.handleNationalID} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="py-3">
                                    <MDBCol xl="2" lg="3" md="3" sm="12" xs="12">
                                        <p className="font-weight-bold">جنسیت : </p>
                                    </MDBCol>
                                    <MDBCol xl="10" lg="9" md="9" sm="12" xs="12">
                                        <span className="px-3">
                                            <label htmlFor="male" className="px-1">مرد</label>
                                            <input type="radio" name="gender" id="male" value={false} defaultChecked={this.state.information.gender} onChange={this.handleGender} />
                                        </span>
                                        <span className="px-3">
                                            <label htmlFor="female" className="px-1">زن</label>
                                            <input type="radio" name="gender" id="female" value={true} defaultChecked={this.state.information.gender} onChange={this.handleGender} />
                                        </span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="py-3">
                                    <MDBCol xl="2" lg="3" md="3" sm="12" xs="12">
                                        <p className="font-weight-bold">فعال / غیر فعال : </p>
                                    </MDBCol>
                                    <MDBCol xl="10" lg="9" md="9" sm="12" xs="12">
                                        <span className="px-3">
                                            <label htmlFor="active" className="px-1">فعال</label>
                                            <input type="radio" name="activity" id="active" value={true} defaultChecked={this.state.information.active} onChange={this.handleActivity} />
                                        </span>
                                        <span className="px-3">
                                            <label htmlFor="inActive" className="px-1">غیر فعال</label>
                                            <input type="radio" name="activity" id="inActive" value={false} defaultChecked={this.state.information.active} onChange={this.handleActivity} />
                                        </span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="py-3">
                                    <MDBCol xl="2" lg="3" md="3" sm="12" xs="12">
                                        <p className="font-weight-bold">نقش : </p>
                                    </MDBCol>
                                    <MDBCol xl="10" lg="9" md="9" sm="12" xs="12">
                                        <span className="px-3 d-flex d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">
                                            <label className="px-2" htmlFor="viewer">بازدید کننده</label>
                                            <input type="checkbox" id="viewer" defaultChecked={this.state.information.role === "viewer" ? true : false} onChange={this.handleRole} />
                                        </span>
                                        <span className="px-3 d-flex d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">
                                            <label className="px-2" htmlFor="normalUser">کاربر عادی</label>
                                            <input type="checkbox" id="normalUser" defaultChecked={this.state.information.role === "normalUser" ? true : false} onChange={this.handleRole} />
                                        </span>
                                        <span className="px-3 d-flex d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">
                                            <label className="px-2" htmlFor="manager">مدیر</label>
                                            <input type="checkbox" id="manager" defaultChecked={this.state.information.role === "manager" ? true : false} onChange={this.handleRole} />
                                        </span>
                                        <span className="px-3 d-flex d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">
                                            <label className="px-2" htmlFor="admin">ادمین</label>
                                            <input type="checkbox" id="admin" defaultChecked={this.state.information.role === "admin" ? true : false} onChange={this.handleRole} />
                                        </span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="py-3 d-flex justify-content-center">
                                    <MDBCol xl="5" lg="6" md="7" sm="12" xs="12">
                                        <MDBAnimation type={!this.state.loadingBtn ? "zoomInLeft" : "zoomOutRight"} className="text-center">
                                            <MDBBtn type="submit" color="orange" className={this.state.loadingBtn ? "d-none" : "w-100"}>تغییر</MDBBtn>
                                            <span className={this.state.loadingBtn ? null : "d-none"}>
                                                <FaFan className="w3-spin text-primary" size="30" />
                                                <p>لطفاً صبر کنید ...</p>
                                            </span>
                                        </MDBAnimation>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={this.state.updateSuccess ? "py-3 d-flex justify-content-center" : "d-none"}>
                                    <MDBCol className="position-relative fixed-bottom">
                                        <MDBAnimation type="flipInY" className="d-flex">
                                            <MDBAlert color="success" className="text-center">
                                                <span className="px-2">
                                                    <FaCheckSquare className="w3-xlarge tinyFontSize" />
                                                </span>
                                                <span className="px-2">
                                                    <p className="d-inline-block m-0 tinyFontSize">اطلاعات کاربر مورد نظر با <b className="font-weight-bold">موفقیت</b> بروز رسانی شد</p>
                                                </span>
                                            </MDBAlert>
                                        </MDBAnimation>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={this.state.updateFailed ? "py-3 d-flex justify-content-center" : "d-none"}>
                                    <MDBCol className="position-relative fixed-bottom">
                                        <MDBAnimation type="flipInY" className="d-flex">
                                            <MDBAlert color="danger" className="text-center">
                                                <span className="px-2">
                                                    <FaExclamation className="w3-xlarge tinyFontSize" />
                                                </span>
                                                <span className="px-2">
                                                    <p className="d-inline-block m-0 tinyFontSize">در بروز رسانی اطلاعات <b className="font-weight-bold"> خطا </b> ایجاد شده است</p>
                                                </span>
                                            </MDBAlert>
                                        </MDBAnimation>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default EditUserInfo;