import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBAnimation, MDBTableBody, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import { Dropdown, FormControl, } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import * as LS from 'local-storage';

class SelfAdminEdit extends Component {
    state = {
        initInfo: {
            firstName: undefined,
            lastName: undefined,
            nationalId: undefined,
            email: undefined,
            gender: undefined,
            activity: undefined,
            roleName: undefined,
        },
        rolesList: [],
        roleSelectedToShow: undefined,
        successUpdate: false,
        failedUpdate: false,
        newInfo: {
            firstName: {
                value: undefined,
                valid: undefined,
            },
            lastName: {
                value: undefined,
                valid: undefined,
            },
            nationalId: {
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
            },
            roleId: {
                value: undefined,
                valid: undefined,
            },
            activity: {
                value: undefined,
            },
        },
    };

    // get initial data
    componentDidMount = async () => {

        // get initial information to show for edit
        const initInfo = await axios.get(`http://localhost:5002/api/v1/admin/singleUserInfo/${this.props.match.params.userID}`);

        if (!initInfo) return // error
        console.log(initInfo.data)
        this.setState({
            initInfo: {
                firstName: initInfo.data.userId.firstName,
                lastName: initInfo.data.userId.lastName,
                nationalId: initInfo.data.userId.nationalID,
                email: initInfo.data.userId.email,
                gender: initInfo.data.userId.gender,
                activity: initInfo.data.activity,
                roleName: initInfo.data.roleId.roleName,
            },
        });

        // list of roles to show and for send roleId
        axios.get("http://localhost:5002/api/v1/admin/showGroupRoles")
            .then(res => {
                res.data.map(eachRole => {
                    this.setState({
                        rolesList: [
                            ...this.state.rolesList,
                            <Dropdown.Item key={eachRole._id} onClick={() => this.selectRole(eachRole.roleId._id)} className="py-3">
                                <strong>{eachRole.roleId.roleName}</strong>
                            </Dropdown.Item>
                        ],
                    });
                });
            })
            .catch(err => {
                // this.setState({ serverError: true });
            });
    };

    // get new first name
    fName = e => this.setState({ newInfo: { ...this.state.newInfo, firstName: { value: e.target.value.length > 2 ? e.target.value : undefined, valid: e.target.value.length > 2 ? true : false } } });


    // get new last name
    lName = e => this.setState({ newInfo: { ...this.state.newInfo, lastName: { value: e.target.value.length > 2 ? e.target.value : undefined, valid: e.target.value.length > 2 ? true : false } } });


    // get new national id
    nationalId = e => this.setState({ newInfo: { ...this.state.newInfo, nationalId: { value: e.target.value.length > 7 ? e.target.value : undefined, valid: e.target.value.length > 7 ? true : false } } });


    // get new email
    email = e => this.setState({ newInfo: { ...this.state.newInfo, email: { value: (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) ? e.target.value : undefined, valid: (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) ? true : false } } });


    // get new password
    password = e => this.setState({ newInfo: { ...this.state.newInfo, password: { value: e.target.value.length > 7 ? e.target.value : undefined, valid: e.target.value.length > 7 ? true : false } } });


    // get new gender
    gender = e => this.setState({ newInfo: { ...this.state.newInfo, gender: { value: e.target.value === "female" ? true : false } } });


    // get new activity
    activity = e => this.setState({ newInfo: { ...this.state.newInfo, activity: { value: e.target.value === "active" ? true : false } } });

    // get new role from list
    selectRole = e => this.setState({ newInfo: { ...this.state.newInfo, roleId: { value: e._id } }, roleSelectedToShow: e.roleName, initInfo: { ...this.state.initInfo, roleName: undefined } });

    // send changing  form
    subEditFrm = async e => {
        e.preventDefault();

        const values = {
            firstName: this.state.newInfo.firstName.value,
            lastName: this.state.newInfo.lastName.value,
            nationalID: Number(this.state.newInfo.nationalId.value) || undefined,
            email: this.state.newInfo.email.value,
            password: this.state.newInfo.password.value,
            gender: this.state.newInfo.gender.value,
            activity: this.state.newInfo.activity.value,
            roleId: this.state.newInfo.roleId.value,
        };

        axios.put(`http://localhost:5002/api/v1/admin/updateUserInfo/${this.props.match.params.userID}`, values)
            .then(res => this.setState({ successUpdate: true }))
            .catch(err => this.setState({ failedUpdate: true }))
    };

    render() {
        return (
            <>
                <MDBContainer className="text-right mb-5">
                    <MDBRow>
                        <MDBCol>
                            <form onSubmit={this.subEditFrm}>
                                <MDBTable borderless>
                                    <MDBTableBody>
                                        <tr>
                                            <th className="px-0">
                                                <strong>نام</strong>
                                            </th>
                                            <td className="px-0">
                                                <MDBInput label={this.state.initInfo.firstName} labelClass="d-none d-md-flex d-lg-flex d-xl-flex" containerClass="d-none d-md-flex d-lg-flex d-xl-flex" className={(this.state.newInfo.firstName.valid ? "d-none d-md-flex d-lg-flex d-xl-flex is-valid" : null) || (this.state.newInfo.firstName.valid === false ? "d-none d-md-flex d-lg-flex d-xl-flex is-invalid" : null)} onChange={this.fName} type="text" />
                                                <FormControl placeholder={this.state.initInfo.firstName} className="form-control rounded-0 border-top-0 border-left-0 border-right-0 shadow-none d-md-none d-lg-none d-xl-none" onChange={this.lName} isValid={this.state.newInfo.firstName.valid ? true : false} isInvalid={this.state.newInfo.firstName.valid === false ? true : null} onChange={this.fName} type="text" />
                                                <div className={this.state.newInfo.firstName.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newInfo.firstName.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">سه </b> کارکتر وارد کنید </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-0">
                                                <strong>نام خانوادگی</strong>
                                            </th>
                                            <td className="px-0">
                                                <MDBInput label={this.state.initInfo.lastName} labelClass="d-none d-md-flex d-lg-flex d-xl-flex" containerClass="d-none d-md-flex d-lg-flex d-xl-flex" className={(this.state.newInfo.lastName.valid ? "d-none d-md-flex d-lg-flex d-xl-flex is-valid" : null) || (this.state.newInfo.lastName.valid === false ? "d-none d-md-flex d-lg-flex d-xl-flex is-invalid" : null)} onChange={this.lName} type="text" />
                                                <FormControl placeholder={this.state.initInfo.lastName} className="form-control rounded-0 border-top-0 border-left-0 border-right-0 shadow-none d-md-none d-lg-none d-xl-none" isValid={this.state.newInfo.lastName.valid ? true : false} isInvalid={this.state.newInfo.lastName.valid === false ? true : null} onChange={this.lName} type="text" />
                                                <div className={this.state.newInfo.lastName.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newInfo.lastName.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">سه </b> کارکتر وارد کنید </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-0">
                                                <strong>کد ملّی</strong>
                                            </th>
                                            <td className="px-0">
                                                <MDBInput label={this.state.initInfo.nationalId} labelClass="d-none d-md-flex d-lg-flex d-xl-flex" containerClass="d-none d-md-flex d-lg-flex d-xl-flex" className={(this.state.newInfo.nationalId.valid ? "d-none d-md-flex d-lg-flex d-xl-flex is-valid" : null) || (this.state.newInfo.nationalId.valid === false ? "d-none d-md-flex d-lg-flex d-xl-flex is-invalid" : null)} onChange={this.nationalId} type="text" />
                                                <FormControl placeholder={this.state.initInfo.nationalId} className="form-control rounded-0 border-top-0 border-left-0 border-right-0 shadow-none d-md-none d-lg-none d-xl-none" isValid={this.state.newInfo.nationalId.valid ? true : false} isInvalid={this.state.newInfo.nationalId.valid === false ? true : null} onChange={this.email} onChange={this.nationalId} type="text" />
                                                <div className={this.state.newInfo.nationalId.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newInfo.nationalId.valid === false ? "invalid-feedback d-block" : "d-none"}>حداقل <b className="font-weight-bold">هشت </b> کارکتر وارد کنید </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <strong>پست الکترونیکی</strong>
                                            </th>
                                            <td>
                                                <MDBInput label={this.state.initInfo.email} labelClass="d-none d-md-flex d-lg-flex d-xl-flex" containerClass="d-none d-md-flex d-lg-flex d-xl-flex" className={(this.state.newInfo.email.valid ? "d-none d-md-flex d-lg-flex d-xl-flex is-valid" : null) || (this.state.newInfo.email.valid === false ? "d-none d-md-flex d-lg-flex d-xl-flex is-invalid" : null)} onChange={this.email} type="email" />
                                                <FormControl placeholder={this.state.initInfo.email} className="form-control rounded-0 border-top-0 border-left-0 border-right-0 shadow-none d-md-none d-lg-none d-xl-none" isValid={this.state.newInfo.email.valid ? true : false} isInvalid={this.state.newInfo.email.valid === false ? true : null} onChange={this.email} type="email" />
                                                <div className={this.state.newInfo.email.valid ? "valid-feedback d-block" : "d-none"}>صحیح</div>
                                                <div className={this.state.newInfo.email.valid === false ? "invalid-feedback d-block" : "d-none"}>شکل صحیح پست الکترونیکی را وارد کنید</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-0">
                                                <strong>جنسیت</strong>
                                            </th>
                                            <td className="px-0">
                                                <span className="px-2">
                                                    <label className="px-1" htmlFor="male">مرد</label>
                                                    <input name="gender" id="male" value="male" defaultChecked={this.state.initInfo.gender === false ? true : null} onChange={this.gender} type="radio" />
                                                </span>
                                                <span className="px-2">
                                                    <label className="px-1" htmlFor="female">زن</label>
                                                    <input name="gender" id="female" value="female" defaultChecked={this.state.initInfo.gender === true ? true : null} onChange={this.gender} type="radio" />
                                                </span>
                                            </td>
                                        </tr>
                                        {
                                            LS.get("info").roleAccess.roleId
                                                ?
                                                <>
                                                    {
                                                        LS.get("info").roleAccess.roleId.roleName === "مدیر" || LS.get("info").roleAccess.roleId.roleName === "ادمین" || LS.get("info").roleAccess.roleId.roleName === "اَدمین"
                                                            ?
                                                            <tr>
                                                                <th className="px-0">
                                                                    <strong>وضعیت</strong>
                                                                </th>
                                                                <td className="px-0">
                                                                    <span className="px-1">
                                                                        <label className="px-1" htmlFor="active">فعال</label>
                                                                        <input name="activity" id="active" value="active" defaultChecked={this.state.initInfo.activity === true ? true : null} onChange={this.activity} type="radio" />
                                                                    </span>
                                                                    <span className="px-1">
                                                                        <label className="px-1" htmlFor="inActive">غیر فعال</label>
                                                                        <input name="activity" id="inActive" value="inActive" defaultChecked={this.state.initInfo.activity === false ? true : null} onChange={this.activity} type="radio" />
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            :
                                                            null
                                                    }
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            LS.get("info").roleAccess.roleId
                                                ?
                                                <>
                                                    {
                                                        LS.get("info").roleAccess.roleId.roleName === "ادمین" || LS.get("info").roleAccess.roleId.roleName === "اَدمین"
                                                            ?
                                                            <>
                                                                <tr>
                                                                    <th>
                                                                        <strong>نقش</strong>
                                                                    </th>
                                                                    <td>
                                                                        <Dropdown className="col-12 col-md-8 col-lg-6 col-xl-6">
                                                                            <Dropdown.Toggle color="info" caret="true" className="w-100 px-0">
                                                                                <p className="m-0 d-inline-block px-2 tinyFontSize">انتخاب نقش</p>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu color="primary" right="true" className="text-right w-100" style={{ height: '177px', overflow: 'auto' }}>
                                                                                {this.state.rolesList}
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th></th>
                                                                    <td>
                                                                        <p className="m-0 text-center text-xl-right text-lg-right text-md-right pt-3 pb-2 border-bottom border-warning d-inline-block">
                                                                            {this.state.initInfo.roleName || this.state.roleSelectedToShow}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                            :
                                                            null
                                                    }
                                                </>
                                                :
                                                null
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBBtn color="pink" type="submit" className="col-12 col-md-6 col-lg-6 col-xl-6">تغییر</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBAnimation type="slideInUp" className={this.state.successUpdate ? "d-inline-flex mt-5" : "d-none"}>
                    <MDBAlert color="success">
                        <span className="px-2">
                            <FaCheckCircle />
                        </span>
                        <span className="px-2">
                            <p className="tinyFontSize m-0 d-inline-block">اطلاعات مورد نظر با موفقیت تغییر کرد</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.failedUpdate ? "d-inline-flex mt-5" : "d-none"}>
                    <MDBAlert color="danger">
                        <span className="px-2">
                            <FaCheckCircle />
                        </span>
                        <span className="px-2">
                            <p className="tinyFontSize m-0 d-inline-block">بروزرسانی با خطا مواجه شده است</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
            </>
        );
    };
};

export default SelfAdminEdit;