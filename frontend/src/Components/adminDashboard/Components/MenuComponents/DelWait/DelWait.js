import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBAlert, MDBAnimation, } from 'mdbreact';
import { FaDatabase, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import './../../../../../CSS/fontSize.css';

class DelWait extends Component {

    state = {
        userCard: [],
        serverError: false,
        userId: undefined,
        notFound: false,
        fullDelSuccess: false,
        fullDelError: false,
        restoreSuccess: false,
        restoreError: false,
    };

    componentDidMount = () => {
        axios.get('http://localhost:5002/api/v1/admin/usersDelWaitingInfo')
            .then(res => {
                if (res.data.length === 0) return this.setState({ notFound: true });

                res.data.forEach(eachUser => {
                    this.setState({
                        allLength: res.data.length,
                        userCard: [
                            ...this.state.userCard,
                            <MDBCol key={eachUser.userId._id} xl="4" lg="6" md="6" sm="12" xs="12" className="py-3">
                                <MDBCard className="w3-hover-shadow view overlay zoom">
                                    <MDBCardImage
                                        src={!eachUser.userId.gender ? "https://cdn0.iconfinder.com/data/icons/user-pictures/100/malecostume-512.png" : "https://bornatech.ir/wp-content/uploads/2020/01/male-and-female-avatar-profile-picture-silhouette-vector-4684270-2.jpg"}
                                        alt={`alt : ${eachUser.userId.firstName}`}
                                        width="100%"
                                        height="260px"
                                    />
                                    <MDBCardBody>
                                        <MDBCardTitle className="d-flex justify-content-around">
                                            <span>
                                                <span className="px-1">
                                                    <p className="d-inline-block">{eachUser.userId.firstName}</p>
                                                </span>
                                                <span className="px-1">
                                                    <p className="d-inline-block">{eachUser.userId.lastName}</p>
                                                </span>
                                            </span>
                                            <span className="position-relative rounded-circle bgCircleRoleColor waves-circle" style={{ bottom: "50px", right: "25px" }}>
                                                <p className="d-inline-block w3-small text-white tinyFontSize">{eachUser.roleId.roleName}</p>
                                            </span>
                                        </MDBCardTitle>
                                        <MDBCardText>
                                            <span className="pl-2">کد ملی :</span>
                                            <span>{eachUser.userId.nationalID}</span>
                                        </MDBCardText>
                                        <div className="justify-content-around d-flex">
                                            <MDBBtn color="danger" className="px-3 px-md-4 px-lg-4 px-xl-4" onClick={() => this.fullDelete(eachUser.userId._id)}>
                                                <p className="m-0 tinyFontSize">حذف کامل</p>
                                            </MDBBtn>
                                            <MDBBtn color="cyan" className="px-3 px-md-4 px-lg-4 px-xl-4" onClick={() => this.restore(eachUser.userId._id)}>
                                                <p className="m-0 tinyFontSize">بازگرداندن</p>
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ],
                    });
                });
            })
            .catch(err => {
                this.setState({ serverError: true });
            });
    };


    // full delete
    fullDelete = userId => {
        axios.delete(`http://localhost:5002/api/v1/admin/fullDeleteUser/${userId}`)
            .then(res => {
                this.setState({ fullDelSuccess: true }) // has error********************
            })
            .catch(err => {
                this.setState({ fullDelError: true })
            });
    };


    // restore
    restore = userId => {
        axios.delete(`http://localhost:5002/api/v1/admin/restoreUser/${userId}`)
            .then(res => {
                this.setState({ restoreSuccess: true });
            })
            .catch(err => {
                this.setState({ restoreError: true })
            });
    };


    render() {
        return (
            <>
                <MDBAnimation type="shake" className={this.state.serverError ? "mt-4 mt-lg-3 mt-xl-2 d-flex justify-content-center" : "d-none"}>
                    <MDBAlert color="warning" className=" d-inline-flex">
                        <span className="px-2">
                            <FaDatabase />
                        </span>
                        <span className="px-2">
                            <p className="m-0 tinyFontSize d-inline-block font-weight-bold">خطا در هنگام برقراری ارتباط با سرور</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.notFound ? "mt-4 mt-lg-3 mt-xl-2 d-flex justify-content-center" : "d-none"}>
                    <MDBAlert color="dark" className=" d-inline-flex">
                        <span className="px-2">
                            <FaDatabase />
                        </span>
                        <span className="px-2">
                            <p className="m-0 tinyFontSize d-inline-block font-weight-bold">هیچ کاربری در انتظار حذف نیست</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.fullDelSuccess ? "mt-4 mt-lg-3 mt-xl-2 d-flex justify-content-center" : "d-none"}>
                    <MDBAlert color="success" className=" d-inline-flex">
                        <span className="px-2">
                            <FaCheckCircle />
                        </span>
                        <span className="px-2">
                            <p className="m-0 tinyFontSize d-inline-block font-weight-bold">کاربر مورد نظر به صورت کامل حذف شد</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.fullDelError ? "mt-4 mt-lg-3 mt-xl-2 d-flex justify-content-center" : "d-none"}>
                    <MDBAlert color="danger" className=" d-inline-flex">
                        <span className="px-2">
                            <FaExclamationCircle />
                        </span>
                        <span className="px-2">
                            <p className="m-0 tinyFontSize d-inline-block font-weight-bold">خطا در هنگام حذف کامل کاربر</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.restoreSuccess ? "mt-4 mt-lg-3 mt-xl-2 d-flex justify-content-center" : "d-none"}>
                    <MDBAlert color="success" className=" d-inline-flex">
                        <span className="px-2">
                            <FaCheckCircle />
                        </span>
                        <span className="px-2">
                            <p className="m-0 tinyFontSize d-inline-block font-weight-bold">کاربر با موفقیت برگردانده شد</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.restoreError ? "mt-4 mt-lg-3 mt-xl-2 d-flex justify-content-center" : "d-none"}>
                    <MDBAlert color="danger" className=" d-inline-flex">
                        <span className="px-2">
                            <FaExclamationCircle />
                        </span>
                        <span className="px-2">
                            <p className="m-0 tinyFontSize d-inline-block font-weight-bold">خطا در هنگام بازگردانی کاربر</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            {this.state.userCard}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default DelWait;