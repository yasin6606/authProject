import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBAnimation, MDBAlert, MDBModal, } from 'mdbreact';
import { FaExclamation, FaFan, FaDatabase, } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './../../../../../CSS/fontSize.css';
import './../../../../../CSS/rtl.css';

class AddNewUser extends Component {

    state = {
        newData: {
            firstName: {
                value: undefined,
                valid: undefined,
            },
            lastName: {
                value: undefined,
                valid: undefined,
            },
            nationalID: {
                value: undefined,
                valid: undefined,
            },
            email: {
                value: undefined,
                valid: undefined,
            },
            password: {
                value: undefined,
                valid: undefined,
            },
            gender: {
                value: undefined,
                valid: undefined,
            },
            activity: {
                value: undefined,
                valid: undefined,
            },
            roleId: {
                value: undefined,
                valid: undefined,
            },
        },
        roleSelectedToShow: undefined,
        rolesList: [],
        wrongForm: false,
        serverError: false,
        loadingBtn: false,
        successRegistered: false,
    };

    // get first name
    getFName = e => {
        (e.target.value.trim().length > 2)
            ?
            this.setState({ newData: { ...this.state.newData, firstName: { value: e.target.value.trim(), valid: true } }, })
            :
            this.setState({ newData: { ...this.state.newData, firstName: { valid: false } }, });
    };

    // get last name
    getLName = e => {
        (e.target.value.trim().length > 2)
            ?
            this.setState({ newData: { ...this.state.newData, lastName: { value: e.target.value.trim(), valid: true } }, })
            :
            this.setState({ newData: { ...this.state.newData, lastName: { valid: false } }, });
    };

    // get national id
    getNationalId = e => {
        (e.target.value.trim().length > 7)
            ?
            this.setState({ newData: { ...this.state.newData, nationalID: { value: e.target.value.trim(), valid: true } }, })
            :
            this.setState({ newData: { ...this.state.newData, nationalID: { valid: false } }, });
    };

    // get email
    getEmail = e => {
        (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
            ?
            this.setState({ newData: { ...this.state.newData, email: { value: e.target.value, valid: true } } })
            :
            this.setState({ newData: { ...this.state.newData, email: { valid: false } } });
    };

    // get password
    getPassword = e => {
        if (e.target.value.trim().length > 7)
            this.setState({ newData: { ...this.state.newData, password: { value: e.target.value.trim(), valid: true } }, });
        else
            this.setState({ newData: { ...this.state.newData, password: { valid: false } }, });
    };

    // select gender
    selectGender = e => this.setState({ newData: { ...this.state.newData, gender: { value: (e === "female" ? true : false), valid: true } }, });

    // select activity
    selectActivity = e => this.setState({ newData: { ...this.state.newData, activity: { value: (e === "active" ? true : false), valid: true } }, });

    // select role
    selectRole = e => this.setState({ newData: { ...this.state.newData, roleId: { value: e._id, valid: true } }, roleSelectedToShow: e.roleName, });

    // submit registration form
    subRegFrm = async e => {
        e.preventDefault();

        // start loading ...
        this.setState({ loadingBtn: true });

        // get values
        const values = {
            firstName: this.state.newData.firstName.value,
            lastName: this.state.newData.lastName.value,
            nationalID: this.state.newData.nationalID.value,
            email: this.state.newData.email.value,
            password: this.state.newData.password.value,
            gender: this.state.newData.gender.value,
            activity: this.state.newData.activity.value,
            roleId: this.state.newData.roleId.value,
        };

        if (
            this.state.newData.firstName.value === undefined ||
            this.state.newData.lastName.value === undefined ||
            this.state.newData.nationalID.value === undefined ||
            this.state.newData.email.value === undefined ||
            this.state.newData.password.value === undefined ||
            this.state.newData.gender.value === undefined ||
            this.state.newData.activity.value === undefined ||
            this.state.newData.roleId.value === undefined
        ) {
            return this.setState({ wrongForm: true, loadingBtn: false });
        };

        const registered = await axios.post("http://localhost:5002/api/v1/admin/newUser", values);

        !registered ? this.setState({ serverError: true, loadingBtn: false, }) : this.setState({ loadingBtn: false, successRegistered: true, wrongForm: false, serverError: false, });

        setTimeout(() => window.location.reload(), 3000);
    };

    componentDidMount = () => {

        // list of roles to show and for send roleId for register new user
        axios.get("http://localhost:5002/api/v1/admin/showGroupRoles")
            .then(res => {
                res.data.map(eachRole => {
                    this.setState({
                        rolesList: [
                            ...this.state.rolesList,
                            <Dropdown.Item key={eachRole._id} onClick={() => this.selectRole(eachRole.roleId)} className="py-3">
                                <strong>{eachRole.roleId.roleName}</strong>
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
                <MDBContainer>
                    <MDBRow className={this.state.wrongForm ? null : "d-none"}>
                        <MDBCol>
                            <MDBAlert color="danger">
                                <span className="px-2">
                                    <MDBAnimation type="tada" infinite className="d-inline-flex">
                                        <FaExclamation className="tinyFontSize w3-xlarge" />
                                    </MDBAnimation>
                                </span>
                                <span className="px-2">
                                    <p className="d-inline-block tinyFontSize m-0">لطفاً تمام موارد را تکمیل کنید</p>
                                </span>
                            </MDBAlert>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={this.state.serverError ? null : "d-none"}>
                        <MDBCol>
                            <MDBAlert color="warning">
                                <span className="px-2">
                                    <MDBAnimation type="tada" infinite className="d-inline-flex">
                                        <FaDatabase className="tinyFontSize w3-xlarge text-danger" />
                                    </MDBAnimation>
                                </span>
                                <span className="px-2">
                                    <p className="d-inline-block tinyFontSize m-0">سرور خطا دارد</p>
                                </span>
                            </MDBAlert>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <form onSubmit={this.subRegFrm}>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput label="نام" onChange={this.getFName} className={(this.state.newData.firstName.valid ? "is-valid" : null) || (this.state.newData.firstName.valid === false ? "is-invalid" : null)} />
                                                <div className={this.state.newData.firstName.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newData.firstName.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">سه </b> کارکتر وارد کنید </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput label="نام خانوادگی" onChange={this.getLName} className={(this.state.newData.lastName.valid ? "is-valid" : null) || (this.state.newData.lastName.valid === false ? "is-invalid" : null)} />
                                                <div className={this.state.newData.lastName.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newData.lastName.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">سه </b> کارکتر وارد کنید </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput label="کد ملّی" type="number" onChange={this.getNationalId} className={(this.state.newData.nationalID.valid ? "is-valid" : null) || (this.state.newData.nationalID.valid === false ? "is-invalid" : null)} />
                                                <div className={this.state.newData.nationalID.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newData.nationalID.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">هشت </b> کارکتر وارد کنید </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput label="پست الکترونیکی" type="text" onChange={this.getEmail} className={(this.state.newData.email.valid ? "is-valid" : null) || (this.state.newData.email.valid === false ? "is-invalid" : null)} />
                                                <div className={this.state.newData.email.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newData.email.valid === false ? "invalid-feedback d-block" : "d-none"}>لطفاً پست الکترونیکی صحیح وارد کنید</div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput label="رمز عبور" type="text" onChange={this.getPassword} className={(this.state.newData.password.valid ? "is-valid" : null) || (this.state.newData.password.valid === false ? "is-invalid" : null)} />
                                                <div className={this.state.newData.password.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newData.password.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">هشت </b> کارکتر وارد کنید </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="py-3">
                                            <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                                <Dropdown onSelect={eventKey => this.selectGender(eventKey)}>
                                                    <Dropdown.Toggle color="info" caret="true" className="w-100">
                                                        <p className="m-0 d-inline-block px-2">جنسیت</p>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu color="primary" right className="text-right w-100">
                                                        <Dropdown.Item eventKey="male">مرد</Dropdown.Item>
                                                        <Dropdown.Item eventKey="female">زن</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </MDBCol>
                                            <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" middle={true}>
                                                <p className="m-0 text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning">
                                                    {(this.state.newData.gender.value === false ? "مرد" : null) || (this.state.newData.gender.value === true ? "زن" : null)}
                                                </p>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="py-3">
                                            <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                                <Dropdown onSelect={eventKey => this.selectActivity(eventKey)}>
                                                    <Dropdown.Toggle color="info" caret="true" className="w-100">
                                                        <p className="m-0 d-inline-block px-2">فعل / غیر فعال</p>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu color="primary" right className="text-right w-100" onSelect={this.selectActivity}>
                                                        <Dropdown.Item eventKey="active">فعال</Dropdown.Item>
                                                        <Dropdown.Item eventKey="inActive">غیر فعال</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </MDBCol>
                                            <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" middle={true}>
                                                <p className="m-0 text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning">
                                                    {(this.state.newData.activity.value === true ? "فعال" : null) || (this.state.newData.activity.value === false ? "غیر فعال" : null)}
                                                </p>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="py-3">
                                            <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                                <Dropdown>
                                                    <Dropdown.Toggle color="info" caret="true" className="w-100">
                                                        <p className="m-0 d-inline-block px-2">انتخاب نقش</p>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu color="primary" right="true" className="text-right w-100" style={{ height: '177px', overflow: 'auto' }}>
                                                        {this.state.rolesList}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </MDBCol>
                                            <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" middle={true}>
                                                <p className="m-0 text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning">
                                                    {this.state.roleSelectedToShow}
                                                </p>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-5 pb-2 d-flex justify-content-center">
                                            <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                                <MDBAnimation type={!this.state.loadingBtn ? "zoomInLeft" : "zoomOutRight"}>
                                                    <MDBBtn type="submit" color="pink" className={this.state.loadingBtn ? "d-none" : "w-100"}>ثبت نام</MDBBtn>
                                                    <span className={this.state.loadingBtn ? null : "d-none"}>
                                                        <FaFan color="deeppink" className="w3-spin w3-xxlarge" />
                                                        <p>لطفاً صبر کنید ...</p>
                                                    </span>
                                                </MDBAnimation>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={this.state.successRegistered ? null : "d-none"}>
                                <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                    <MDBAnimation type="wobble" className="d-flex">
                                        <MDBAlert color="success" className="col-12">
                                            <p className="m-0 tinyFontSize text-center">کاربر مورد نظر با <b className="font-weight-bold"> موفقیت </b> ثبت شد</p>
                                        </MDBAlert>
                                    </MDBAnimation>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};

export default AddNewUser;