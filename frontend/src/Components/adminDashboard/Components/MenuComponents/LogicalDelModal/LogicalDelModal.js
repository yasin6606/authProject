import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './../../../../../CSS/fontSize.css';
import { connect } from 'react-redux';
import swal from 'sweetalert';

class LogicalDelModal extends Component {

    state = {
        userInfo: "",
        successDel: false,
        failedDel: false,
    };

    componentDidMount = async () => {

        // get user information from server
        const userInfo = await axios.get(`http://localhost:5002/api/v1/admin/singleUserInfo/${this.props.userId}`);

        !userInfo ? this.setState({ failedDel: true, }) : this.setState({ userInfo: userInfo.data.userId, });
    };


    // no btn
    noBtn = () => {
        this.props.dispatch({ type: "hideModalDelBtn" })
    };

    // yes btn
    yesBtn = async () => {
        const deleted = await axios.delete(`http://localhost:5002/api/v1/admin/logicalDeleteUser/${this.props.userId}`);

        // status : true => successfully logical deleted &  status : false => failed logical deleted
        if (!deleted.status) {
            await swal({
                closeOnClickOutside: true,
                closeOnEsc: true,
                dangerMode: true,
                timer: 3000,
                title: "در پردازش حذف کاربر خطا رخ داده است",
                icon: "warning",
            });
            window.location.reload();
        };

        if (deleted.status === 202) {
            await swal({
                closeOnClickOutside: true,
                closeOnEsc: true,
                dangerMode: false,
                timer: 3000,
                title: "کاربر مورد نظر با موفقیت حذف شد",
                icon: "success",
            });
            window.location.reload();
        };
    };


    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className="text-right">
                            <Modal.Header>
                                <p className="m-0 tinyFontSize">آیا از حذف کاربر جاری با مشخصات زیر اطمینان دارید ؟</p>
                            </Modal.Header>
                            <Modal.Body>
                                <MDBRow>
                                    <MDBCol>
                                        <p>نام : </p>
                                    </MDBCol>
                                    <MDBCol>
                                        <p>
                                            {this.state.userInfo.firstName}
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <p>نام خانوادگی : </p>
                                    </MDBCol>
                                    <MDBCol>
                                        <p>
                                            {this.state.userInfo.lastName}
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <p>کد ملّی : </p>
                                    </MDBCol>
                                    <MDBCol>
                                        <p>
                                            {this.state.userInfo.nationalID}
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <p>جنسیت : </p>
                                    </MDBCol>
                                    <MDBCol>
                                        <p>
                                            {this.state.userInfo.gender ? "زن" : "مرد"}
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <p>وضعیت : </p>
                                    </MDBCol>
                                    <MDBCol>
                                        <p>
                                            {this.state.userInfo.active ? "غیر فعال" : "فعال"}
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <p>نقش : </p>
                                    </MDBCol>
                                    <MDBCol>
                                        <p>
                                            {
                                                (this.state.userInfo.role === "admin" ? "اَدمین" : null) ||
                                                (this.state.userInfo.role === "manager" ? "مدیر" : null) ||
                                                (this.state.userInfo.role === "normalUser" ? "کاربر عادی" : null) ||
                                                (this.state.userInfo.role === "viewer" ? "بازدید کننده" : null)
                                            }
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                            </Modal.Body>
                            <Modal.Footer>
                                <span>
                                    <MDBBtn color="pink" onClick={this.noBtn}>خیر</MDBBtn>
                                </span>
                                <span>
                                    <MDBBtn color="primary" onClick={this.yesBtn}>بلی</MDBBtn>
                                </span>
                            </Modal.Footer>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};

export default connect()(LogicalDelModal);