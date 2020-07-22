import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBAlert, MDBAnimation, } from 'mdbreact';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaExclamation, FaFileAlt, FaUserTimes } from 'react-icons/fa';
import './../../../../../CSS/fontSize.css';
import './../../../../../CSS/color.css';
import './../../../../../CSS/zIndex.css';
import LogicalDelModal from '../LogicalDelModal/LogicalDelModal';

class ViewUsers extends Component {

    state = {
        userCard: [],
        notFound: false,
        allLength: undefined,
        delModal: false,
        userId: undefined,
    };

    // show logical deleting
    logicalDeleting = userId => this.setState({ delModal: true, userId });

    // hide logical deleting
    hideLogicalDel = () => this.setState({ delModal: false, });

    // click on NO btn in the modal  !!! IT'S VERY IMPORTANT TO STOP INFINITE RE-RENDERING !!!


    // click on YES btn in the modal and return to the users list & show success OR fail logical deleting alert


    // ajax request for show user's card
    componentDidMount = () => {
        axios.get("http://localhost:5002/api/v1/admin/usersInfo")
            .then(res => {
                res.data.forEach(eachUser => {
                    this.setState({
                        allLength: res.data.length,
                        userCard: [
                            ...this.state.userCard,
                            <MDBCol key={eachUser.userId._id} xl="4" lg="6" md="6" sm="12" xs="12" className="py-3">
                                <MDBCard className="w3-hover-shadow view overlay zoom">
                                    <MDBCardHeader className="position-absolute zIndex-up bg-none-color border-0" onClick={() => this.logicalDeleting(eachUser.userId._id)}>
                                        <FaUserTimes className="text-danger w3-xlarge" />
                                    </MDBCardHeader>
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
                                            <NavLink to={`/viewUserFullInformation/${eachUser.userId._id}`} className="btn btn-info tinyFontSize">مشخصات</NavLink>
                                            <NavLink to={`/editUserInfo/${eachUser.userId._id}`} className="btn btn-pink tinyFontSize">ویرایش</NavLink>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ],
                    });
                });
            })
            .catch(err => {
                this.setState({ notFound: true });
            });
    };

    render = () => {
        return (
            <>
                <MDBContainer>
                    <MDBRow className={this.state.notFound ? null : "d-none"}>
                        <MDBCol>
                            <MDBAlert color="danger" className="justify-content-center d-flex">
                                <span className="pl-2">
                                    <MDBAnimation type="jello" infinite>
                                        <FaExclamation />
                                    </MDBAnimation>
                                </span>
                                <span>هیچ کاربری یافت نشد</span>
                            </MDBAlert>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={this.state.notFound ? "d-none" : null}>
                        <MDBCol>
                            <MDBAlert color="primary" className="justify-content-center d-xl-flex d-lg-flex d-md-flex">
                                <span className="d-block px-xl-4 px-lg-3 px-md-3">
                                    <MDBAnimation type="zoomIn" infinite>
                                        <FaFileAlt />
                                    </MDBAnimation>
                                </span>
                                <span className="d-block px-xl-4 px-lg-3 px-md-3">
                                    <span>تعداد کل کاربران : </span>
                                    <span>{this.state.allLength}</span>
                                </span>
                                <span className="d-block px-xl-4 px-lg-3 px-md-3">
                                    <span>تعداد کاربران فعال : </span>
                                    <span>عدد</span>
                                </span>
                                <span className="d-block px-xl-4 px-lg-3 px-md-3">
                                    <span>تعداد کاربران  غیر فعال : </span>
                                    <span>عدد</span>
                                </span>
                            </MDBAlert>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {this.state.userCard}
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <Modal show={this.state.delModal} onHide={this.hideLogicalDel}>
                                <LogicalDelModal
                                    userId={this.state.userId}
                                />
                            </Modal>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};
const mapStateToProps = state => {
    return {
        noBtn: state.hide,
        logicalDelStatus: state.status,
    };
};
export default connect(mapStateToProps)(ViewUsers);