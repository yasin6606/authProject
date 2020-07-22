import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Dashboard from './adminDashboard/Dashboard';
import Login from './Login/Login';
import * as LS from 'local-storage';
import { Route, Switch, Redirect } from 'react-router-dom';
import SelfRegister from './SelfRegister/SelfRegister';
import SupplementaryInfo from './SelfRegister/SupplementaryRegInfo';
import { connect } from 'react-redux';

class Main extends Component {
    // componentDidMount() { }

    render() {
        if (LS.get("info")) {
            if (LS.get("info").userId)
                return <Dashboard />;
        } else {
            return (
                <>
                    <MDBContainer fluid={true}>
                        <MDBRow>
                            <MDBCol className="px-0">
                                <Switch>
                                    <Route path="/login" exact component={Login} />
                                </Switch>
                                <Redirect to="/login" />
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </>
            );
        };
    };
};
const mapStateToProps = state => {
    return {
        loginId: state.loginId,
        userLoggedInInfo: state.userInfo,
    };
};
export default connect(mapStateToProps)(Main);


// <Route path="/selfRegister" component={SelfRegister}>
//     {this.props.loginId ? <SupplementaryInfo loginId={this.props.loginId} /> : null}
// </Route>