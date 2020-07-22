import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Route, Switch } from 'react-router-dom';
import ViewUsers from './MenuComponents/ViewUsers/VewUsers';
import AddNewUser from './MenuComponents/AddNewUser/AddNewUser';
import ViewUserFullInfo from './MenuComponents/ViewUserFullInfo/ViewUserFullInfo';
import SelfInfo from './MenuComponents/SelfInfo/SelfInfo';
import SelfEdit from './MenuComponents/SelfEdit/SelfEdit';
import DefineRoles from './MenuComponents/DefineRoles/DefineRoles';
import DefineOptions from './MenuComponents/DefineOptions/DefineOptions';
import DelWait from './MenuComponents/DelWait/DelWait';
import * as LS from 'local-storage';
import DeleteRoles from './MenuComponents/DefineRoles/DeleteRoles';
import DeleteOptions from './MenuComponents/DefineOptions/DeleteOptions';
import DefineAccessLevel from './MenuComponents/DefineAccessLevel/DefineAccessLevel';
import DeleteAccessLevel from './MenuComponents/DefineAccessLevel/DeleteAccessLevel';
import ChangePassword from "./MenuComponents/ChangePassword/ChangePassword";

class Content extends Component {
    // componentDidMount() {console.log(LS.get('info'))}
    render() {
        return (
            <>
                <MDBContainer className="col-12 ml-0 mt-5">
                    <MDBRow>
                        <MDBCol>
                            {
                                LS.get('info').roleAccess.accSubOptId.map(item => {
                                    if (item.accessLevelsId.title === "levelOne") {
                                        return (
                                            <Switch key={item._id}>
                                                {
                                                    item.subOptId.optionName === "سطح دسترسی"
                                                        ?
                                                        <Route path="/defineAccessLevel" component={DefineAccessLevel} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "حذف سطح دسترسی"
                                                        ?
                                                        <Route path="/deleteAccessLevels" component={DeleteAccessLevel} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "تعریف کاربر جدید"
                                                        ?
                                                        <Route path="/addNewUser" component={AddNewUser} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "تعریف نقش"
                                                        ?
                                                        <Route path="/defineRoles" component={DefineRoles} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "حذف نقش"
                                                        ?
                                                        <Route path="/deleteRoles" component={DeleteRoles} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "حذف آپشن"
                                                        ?
                                                        <Route path="/deleteOptions" component={DeleteOptions} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "تعریف اختیارات"
                                                        ?
                                                        <Route path="/defineOptions" component={DefineOptions} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "حذف کامل کاربران"
                                                        ?
                                                        <Route path="/deleteWait" component={DelWait} />
                                                        :
                                                        null
                                                }
                                            </Switch>
                                        );
                                    };
                                })
                            }
                            {
                                LS.get('info').roleAccess.accSubOptId.map(item => {
                                    if (item.accessLevelsId.title === "levelTwo") {
                                        return (
                                            <Switch key={item._id}>
                                                {
                                                    item.subOptId.optionName === "لیست کاربران"
                                                        ?
                                                        <Route path="/viewUsers" component={ViewUsers} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "مشخصات کامل کاربر"
                                                        ?
                                                        <Route path="/viewUserFullInformation/:userID" component={ViewUserFullInfo} />
                                                        :
                                                        null
                                                }
                                            </Switch>
                                        );
                                    };
                                })
                            }
                            {
                                LS.get('info').roleAccess.accSubOptId.map(item => {
                                    if (item.accessLevelsId.title === "levelThree") {
                                        return (
                                            <Switch Switch key={item._id}>
                                                {
                                                    item.subOptId.optionName === "مشخصات"
                                                        ?
                                                        <Route path="/selfUserInfo" component={SelfInfo} exact />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "تغییر مشخصات"
                                                        ?
                                                        <Route path="/editUserInfo/:userID" component={SelfEdit} />
                                                        :
                                                        null
                                                }
                                                {
                                                    item.subOptId.optionName === "تغییر رمز عبور"
                                                        ?
                                                        <Route path="/changePassword/:userID" component={ChangePassword} />
                                                        :
                                                        null
                                                }
                                            </Switch>
                                        );
                                    };
                                })
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};

export default Content;