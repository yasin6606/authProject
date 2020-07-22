import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import * as LS from 'local-storage';
import './../../../CSS/fontSize.css';

class AdminTopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            info: {
                firstName: undefined,
            },
        };
        this.onClick = this.onClick.bind(this);
    };

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    };

    logout = () => {
        LS.clear();
        this.setState({ logout: true });
        window.location.href = '/login'
    };

    componentDidMount = async () => {
        console.log();
        const info = await axios.get(`http://localhost:5002/api/v1/admin/singleUserInfo/${LS.get('info').userId}`);

        if (!info) return console.log(`NavLink Error => ${info}`);

        this.setState({ info: { firstName: info.data.userId.firstName } });
    };

    render() {
        return (
            <div>
                <header>
                    <MDBNavbar className="bg-dark" dark expand="md" scrolling fixed="top">
                        <MDBNavbarBrand className="d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">
                            <strong className="text-warning">{this.state.info.firstName}</strong>
                            <span className="px-2">
                                <p className="d-inline-block text-success w3-small">( {LS.get('info').roleAccess.roleId.roleName} )</p>
                            </span>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.onClick} right className="text-warning">
                            <strong>{this.state.info.firstName}</strong>
                            <span className="px-2">
                                <p className="d-inline-block tinyFontSize text-success">( {LS.get('info').roleAccess.roleId.roleName} )</p>
                            </span>
                        </MDBNavbarToggler>
                        <MDBCollapse isOpen={this.state.collapse} navbar>
                            <MDBNavbarNav center="true" className="text-right">
                                {
                                    LS.get("info").roleAccess.accSubOptId.map(item => {
                                        if (item.accessLevelsId.title === "levelOne") {
                                            return (
                                                <div key={item._id}>
                                                    {
                                                        item.subOptId.optionName === "سطح دسترسی"
                                                            ?
                                                            <MDBNavItem className="py-2 d-flex justify-content-md-center justify-content-xl-start justify-content-lg-start">
                                                                <NavLink to="/defineAccessLevel" className="text-decoration-none font-weight-bold">سطح دسترسی</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.subOptId.optionName === "تعریف اختیارات"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to="/defineOptions" className="text-white text-decoration-none">آپشن</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.subOptId.optionName === "تعریف نقش"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to="/defineRoles" className="text-white text-decoration-none">نقش ها</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.subOptId.optionName === "تعریف کاربر جدید"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to="/addNewUser" className="text-white text-decoration-none">اضافه کردن کاربر</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.subOptId.optionName === "حذف کامل کاربران"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to="/deleteWait" className="text-white text-decoration-none">در انتظار حذف</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            )
                                        };
                                    })
                                }
                                {
                                    LS.get("info").roleAccess.accSubOptId.map(item => {
                                        if (item.accessLevelsId.title === "levelTwo") {
                                            return (
                                                <div key={item._id}>
                                                    {
                                                        item.subOptId.optionName === "لیست کاربران"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to="/viewUsers" className="text-white text-decoration-none">کاربران</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            )
                                        };
                                    })
                                }
                                {
                                    LS.get("info").roleAccess.accSubOptId.map(item => {
                                        if (item.accessLevelsId.title === "levelThree") {
                                            return (
                                                <div key={item._id}>
                                                    {
                                                        item.subOptId.optionName === "تغییر مشخصات"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to={`/editUserInfo/${LS.get('info').userId}`} className="text-white text-decoration-none">تغییر مشخصات</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.subOptId.optionName === "تغییر رمز عبور"
                                                            ?
                                                            <MDBNavItem className="py-2">
                                                                <NavLink to={`/editUserInfo/${LS.get('info').userId}`} className="text-white text-decoration-none">تغییر رمز عبور</NavLink>
                                                            </MDBNavItem>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            )
                                        };
                                    })
                                }
                                <MDBNavItem className="py-2">
                                    <NavLink to="#" className="text-danger text-decoration-none" onClick={this.logout}>خروج</NavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </header>
            </div>
        );
    };
};

export default AdminTopNav;