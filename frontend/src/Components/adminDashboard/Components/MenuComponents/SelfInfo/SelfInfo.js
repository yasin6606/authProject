import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import * as LS from 'local-storage';

class SelfInfo extends Component {

    componentDidMount = () => {
        console.log(LS.get("successLoggedInId"))
    };

    render() {
        return (
            <>
                self user information
            </>
        );
    }
}

export default SelfInfo;