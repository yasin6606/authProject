import React, {Component} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBAlert, MDBBtn} from 'mdbreact';
import {FormControl} from "react-bootstrap";
import axios from 'axios';
import {FaCheckCircle, FaExclamationCircle} from 'react-icons/fa';

class ChangePassword extends Component {

    state = {
        newPassword: {
            value: undefined,
            valid: undefined
        },
        repeatNewPassword: {
            value: undefined,
            valid: undefined
        },
        result: {
            failedChanging: false,
            successChanging: false,
        }
    };

    // new password handler
    newPasswordHandler = async e => {
        if (e.target.value.length > 7)
            this.setState({newPassword: {value: e.target.value, valid: true},});
        else
            this.setState({newPassword: {valid: false}});
    };

    // repeat new password handler
    repeatNewPasswordHandler = async e => {
        if (this.state.newPassword.value === e.target.value)
            this.setState({repeatNewPassword: {value: e.target.value, valid: true},});
        else
            this.setState({repeatNewPassword: {valid: false}});
    };

    // change password
    changePasswordBtn = async e => {
        e.preventDefault();

        if (this.state.repeatNewPassword.value !== undefined) {
            const password = await axios.put(
                `http://localhost:5002/api/v1/admin/updatePassword/${this.props.match.params.userID}`,
                {newPassword: this.state.repeatNewPassword.value},
            );

            if (!password) return this.setState({failedChanging: true, successChanging: false});

            this.setState({failedChanging: false, successChanging: true,});
        }
    };

    render() {
        return (
            <>
                <MDBRow className={this.state.result.failedChanging ? "mt-3" : "d-none"}>
                    <MDBCol>
                        <MDBAnimation type="slideInDown">
                            <MDBAlert color="success">
                                    <span className="px-1">
                                        <FaCheckCircle/>
                                    </span>
                                <span className="px-1">
                                        <p className="d-inline-block tinyFontSize m-0">رمز عبور با موفقیت تغییر کرد</p>
                                    </span>
                            </MDBAlert>
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={this.state.result.successChanging ? "mt-3" : "d-none"}>
                    <MDBCol>
                        <MDBAnimation type="slideInDown">
                            <MDBAlert color="danger">
                                    <span className="px-1">
                                        <FaExclamationCircle/>
                                    </span>
                                <span className="px-1">
                                        <p className="d-inline-block tinyFontSize m-0">خطا در تغییر رمز عبور</p>
                                    </span>
                            </MDBAlert>
                        </MDBAnimation>
                    </MDBCol>
                </MDBRow>
                <MDBContainer className="mt-5">
                    <MDBRow>
                        <MDBCol xl="2" lg="3" md="3" sm="12" xs="12" middle={true} className="py-3">
                            <strong>رمز عبور جدید</strong>
                        </MDBCol>
                        <MDBCol xl="10" lg="9" md="9" sm="12" xs="12" middle={true}>
                            <FormControl
                                type="text" onChange={this.newPasswordHandler}
                                isValid={this.state.newPassword.valid}
                                isInvalid={this.state.newPassword.valid === false && true}
                            />
                            <FormControl.Feedback type="invalid">
                                <p className="m-0">حداقل هشت کارکتر وارد کنید</p>
                            </FormControl.Feedback>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-4">
                        <MDBCol xl="2" lg="3" md="3" sm="12" xs="12" middle={true} className="py-3">
                            <strong>تکرار رمز عبور جدید</strong>
                        </MDBCol>
                        <MDBCol xl="10" lg="9" md="9" sm="12" xs="12" middle={true}>
                            <FormControl
                                type="text" onChange={this.repeatNewPasswordHandler}
                                isValid={this.state.repeatNewPassword.valid}
                                isInvalid={this.state.repeatNewPassword.valid === false && true}
                            />
                            <FormControl.Feedback type="invalid">
                                <p className="m-0">تکرار رمز ، با رمزِ وارد شده مطابق نیست</p>
                            </FormControl.Feedback>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-5">
                        <MDBCol middle={true} xl="5" lg="5" md="6" sm="12" xs="12">
                            <MDBBtn className="col-12" color="amber" onClick={this.changePasswordBtn}>تغییر رمز</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
}

export default ChangePassword;