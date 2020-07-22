import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import TopNavComponent from '../SideNav/TopNav';
import Content from './Components/Content';
import SideNav from '../SideNav/Components/SideNav';

class Dashboard extends Component {
    render() {
        return (
            <>
                <MDBContainer fluid className="text-right px-0">
                    <MDBRow className="d-xl-none d-lg-none d-md-none">
                        <MDBCol>
                            <TopNavComponent />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl="3" lg="3" md="2" className="d-none d-xl-block d-lg-block d-md-block border-left px-0">
                            <SideNav />
                        </MDBCol>
                        <MDBCol xl="9" lg="9" md="10">
                            <Content />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
};
export default Dashboard;