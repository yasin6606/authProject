import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert, MDBAnimation, } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { FaCheck, FaTasks, FaDatabase, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './../../../../../CSS/fontSize.css';
import { Multiselect } from 'multiselect-react-dropdown';

class DefineRoles extends Component {

    state = {
        role: undefined,
        options: {
            val1: undefined,
            val2: undefined,
            val3: undefined,
        },
        listItemsLevelOne: {
            options: [],
        },
        listItemsLevelTwo: {
            options: [],
        },
        listItemsLevelThree: {
            options: [],
        },
        databaseAlert: false,
        fillAlert: false,
        successAlert: false,
        rolesList: [],
        roleSelectedToShow: undefined,
        delRoleSuccess: false,
        delRoleFailed: false,
        roleAccRolesId: undefined,
        roleId: undefined,
        serverError: false,
    };

    // setState Role
    role = role => this.setState({ ...this.state, role });

    // send role to the server
    createRole = e => {
        e.preventDefault();
        if (this.state.role && (this.state.options.val1 !== undefined || this.state.options.val2 !== undefined || this.state.options.val3 !== undefined)) {
            axios.post("http://localhost:5002/api/v1/admin/defineNewRole", { role: this.state.role, options: this.state.options })
                .then(res => {
                    this.setState({ successAlert: true });
                })
                .catch(err => {
                    this.setState({ databaseAlert: true });
                });
        } else {
            this.setState({ fillAlert: true });
        };
    };

    cssStyle = {
        multiselectContainer: { // To change css for multiselect (Width,height,etc..)
            textAlign: "right",
        },
    };

    // select level one list
    levelOneSelection = async selectedList => this.setState({ options: { ...this.state.options, val1: selectedList } });


    // select level two list
    levelTwoSelection = async selectedList => this.setState({ options: { ...this.state.options, val2: selectedList } });


    // select level three list
    levelThreeSelection = async selectedList => this.setState({ options: { ...this.state.options, val3: selectedList } });


    componentDidMount = () => {

        // list of each option to show in selections
        axios.get("http://localhost:5002/api/v1/admin/showOptions")
            .then((res) => {
                res.data.map(eachOpt => {
                    if (eachOpt.accessLevelsId.title === "levelOne")
                        this.setState({ listItemsLevelOne: { options: [...this.state.listItemsLevelOne.options, { name: eachOpt.subOptId.optionName, id: eachOpt._id }] } });
                    if (eachOpt.accessLevelsId.title === "levelTwo")
                        this.setState({ listItemsLevelTwo: { options: [...this.state.listItemsLevelTwo.options, { name: eachOpt.subOptId.optionName, id: eachOpt._id }] } });
                    if (eachOpt.accessLevelsId.title === "levelThree")
                        this.setState({ listItemsLevelThree: { options: [...this.state.listItemsLevelThree.options, { name: eachOpt.subOptId.optionName, id: eachOpt._id }] } });
                })
            })
            .catch((err) => this.setState({ serverError: true }));
    };

    render = () => {
        return (
            <>
                <MDBContainer className="mb-5 mt-2 mt-xl-0 mt-lg-0 mt-md-0 pr-4 pr-xl-3 pr-lg-3 pr-md-5">
                    <MDBRow className="mt-4">
                        <MDBCol>
                            <h2 className="font-weight-bold d-none d-xl-inline-flex d-lg-inline-flex d-md-inline-flex">تعریف نقش</h2>
                            <h4 className="font-weight-bold d-xl-none d-lg-none d-md-none">تعریف نقش</h4>
                        </MDBCol>
                        <MDBCol className="d-flex justify-content-end">
                            <NavLink to="/deleteRoles" className="text-danger">
                                <span className="px-1">
                                    <FaTrashAlt />
                                </span>
                                <span className="px-1 font-weight-bold">حذف نقش</span>
                            </NavLink>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol className="p-2">
                            <form onSubmit={this.createRole}>
                                <MDBRow>
                                    <MDBCol xl="4" lg="5" md="6" sm="12" xs="12">
                                        <MDBInput label="نام نقش" getValue={this.role} />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" className="mt-3 w3-small">
                                        <Multiselect
                                            style={this.cssStyle}
                                            options={this.state.listItemsLevelOne.options}
                                            displayValue="name"
                                            placeholder="انتخاب آپشن در سطح یک"
                                            onSelect={this.levelOneSelection}
                                        />
                                    </MDBCol>
                                    <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" className="mt-3 w3-small">
                                        <Multiselect
                                            style={this.cssStyle}
                                            options={this.state.listItemsLevelTwo.options}
                                            displayValue="name"
                                            placeholder="انتخاب آپشن در سطح دو"
                                            onSelect={this.levelTwoSelection}
                                        />
                                    </MDBCol>
                                    <MDBCol xl="4" lg="4" md="4" sm="12" xs="12" className="mt-3 w3-small">
                                        <Multiselect
                                            style={this.cssStyle}
                                            options={this.state.listItemsLevelThree.options}
                                            displayValue="name"
                                            placeholder="انتخاب آپشن در سطح سه"
                                            onSelect={this.levelThreeSelection}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="mt-5">
                                    <MDBCol>
                                        <MDBBtn type="submit" color="cyan" className="col-12 col-md-7 col-lg-5 col-xl-4">ایجاد نقش</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBAnimation type="wobble" className={this.state.successAlert ? "fixed-bottom d-inline-flex" : "d-none"}>
                    <MDBAlert color="success">
                        <span className="px-1">
                            <FaCheck />
                        </span>
                        <span className="px-1">
                            <p className="d-inline-block m-0 tinyFontSize">نقش مورد نظر با موفقیت ایجاد شد</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="wobble" className={this.state.databaseAlert ? "fixed-bottom d-inline-flex" : "d-none"}>
                    <MDBAlert color="danger">
                        <span className="px-1">
                            <FaDatabase />
                        </span>
                        <span className="px-1">
                            <p className="d-inline-block m-0 tinyFontSize">خطا در ایجاد نقش ، ارتباط با سرور را بررسی کنید</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
                <MDBAnimation type="shake" className={this.state.fillAlert ? "fixed-bottom d-inline-flex" : "d-none"}>
                    <MDBAlert color="warning">
                        <span className="px-1">
                            <FaTasks />
                        </span>
                        <span className="px-1">
                            <p className="d-inline-block m-0 tinyFontSize">لطفاً تمام موارد را پر کنید</p>
                        </span>
                    </MDBAlert>
                </MDBAnimation>
            </>
        );
    };
};

export default DefineRoles;