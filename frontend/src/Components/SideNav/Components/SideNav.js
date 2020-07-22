import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBNavItem, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { NavLink, Switch } from 'react-router-dom';
import * as LS from 'local-storage';
import { FaPrescriptionBottleAlt, FaConnectdevelop, FaUserPlus, FaUserTimes, FaSignOutAlt, FaUsers, FaUserEdit, FaLayerGroup, FaLock } from 'react-icons/fa';

class SideNav extends Component {

    state = {
        info: undefined,
    };

    componentDidMount = () => {
        axios.get(`http://localhost:5002/api/v1/admin/singleUserInfo/${LS.get('info').userId}`)
            .then(res => {
                this.setState({ info: res.data })
            })
            .catch(err => console.log());
    };


    logout = () => {
        LS.clear();
        this.setState({ logout: true });
        window.location.href = '/login'
    };

    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow className="mt-5">
                                <MDBCol className="d-flex justify-content-center">
                                    <img
                                        src={
                                            this.state.info !== undefined
                                                ?
                                                !this.state.info.userId.gender
                                                    ?
                                                    "https://cdn0.iconfinder.com/data/icons/user-pictures/100/malecostume-512.png" // male
                                                    :
                                                    "https://bornatech.ir/wp-content/uploads/2020/01/male-and-female-avatar-profile-picture-silhouette-vector-4684270-2.jpg" // female
                                                :
                                                null
                                        }
                                        width="80"
                                        height="80"
                                        className="d-inline-block rounded-circle"
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="my-3 border-bottom">
                                <MDBCol className="d-flex justify-content-center">
                                    <div>
                                        {
                                            this.state.info !== undefined
                                                ?
                                                <>
                                                    <span className="px-1">
                                                        <p className="d-inline-block font-weight-bold">{this.state.info.userId.firstName}</p>
                                                    </span>
                                                    <span className="px-1">
                                                        <p className="d-inline-block font-weight-bold">{this.state.info.userId.lastName}</p>
                                                    </span>
                                                    <span className="px-1">
                                                        <p className="w3-small text-center text-success font-weight-bold m-0">{this.state.info.roleId.roleName}</p>
                                                    </span>
                                                    <MDBBtn as="span" color="white" className="px-1 p-0 mt-3 shadow-none border-0" onClick={this.logout}>
                                                        <p className="w3-small text-center text-danger font-weight-bold">
                                                            <span className="px-1">
                                                                <FaSignOutAlt />
                                                            </span>
                                                            <span className="px-1">خروج</span>
                                                        </p>
                                                    </MDBBtn>
                                                </>
                                                :
                                                null
                                        }
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="pr-xl-5 pr-lg-4 pr-md-0">
                                    {
                                        LS.get("info").roleAccess.accSubOptId.map(item => {
                                            if (item.accessLevelsId.title === "levelOne") {
                                                return (
                                                    <ul key={item._id} className="list-unstyled px-0">
                                                        {
                                                            item.subOptId.optionName === "سطح دسترسی"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to="/defineAccessLevel" className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaLayerGroup />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">سطح دسترسی</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            item.subOptId.optionName === "تعریف اختیارات"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to="/defineOptions" className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaPrescriptionBottleAlt />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">آپشن</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            item.subOptId.optionName === "تعریف نقش"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to="/defineRoles" className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaConnectdevelop />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">نقش ها</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            item.subOptId.optionName === "تعریف کاربر جدید"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to="/addNewUser" className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaUserPlus />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">اضافه کردن کاربر</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            item.subOptId.optionName === "حذف کامل کاربران"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to="/deleteWait" className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaUserTimes />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">در انتظار حذف</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                    </ul>
                                                )
                                            };
                                        })
                                    }
                                    {
                                        LS.get("info").roleAccess.accSubOptId.map(item => {
                                            if (item.accessLevelsId.title === "levelTwo") {
                                                return (
                                                    <ul key={item._id} className="list-unstyled px-0">
                                                        {
                                                            item.subOptId.optionName === "لیست کاربران"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to="/viewUsers" className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaUsers />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">کاربران</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                    </ul>
                                                )
                                            };
                                        })
                                    }
                                    {
                                        LS.get("info").roleAccess.accSubOptId.map(item => {
                                            if (item.accessLevelsId.title === "levelThree") {
                                                return (
                                                    <ul key={item._id} className="list-unstyled px-0">
                                                        {
                                                            item.subOptId.optionName === "تغییر مشخصات"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to={`/editUserInfo/${LS.get('info').userId}`} className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaUserEdit />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">تغییر مشخصات</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            item.subOptId.optionName === "تغییر رمز عبور"
                                                                ?
                                                                <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                    <NavLink to={`/changePassword/${LS.get('info').userId}`} className="text-decoration-none font-weight-bold">
                                                                        <span className="px-1 w3-large">
                                                                            <FaLock />
                                                                        </span>
                                                                        <span className="px-1 d-md-none d-xl-inline-block d-lg-inline-block">تغییر رمز عبور</span>
                                                                    </NavLink>
                                                                </MDBNavItem>
                                                                :
                                                                null
                                                        }
                                                    </ul>
                                                )
                                            };
                                        })
                                    }
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default SideNav;