import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBJumbotron, MDBAlert } from 'mdbreact';
import axios from 'axios';
import { FaExclamation } from 'react-icons/fa';
import FullInfoTbl from './FullInfoTbl';

class ViewUserFullInfo extends Component {

    state = {
        info: "",
        tblComponent: [],
        notFound: false,
    };

    componentDidMount() {
        axios.get(`http://localhost:5002/api/v1/admin/singleUserInfo/${this.props.match.params.userID}`)
            .then(res => {
                this.setState({
                    info: res.data.userId,
                    tblComponent: [
                        <MDBCol key={res.data._id}>
                            <FullInfoTbl
                                infos={res.data}
                            />
                        </MDBCol>
                    ]
                });
            })
            .catch(err => this.setState({ notFound: true }));
    };

    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow className={this.state.notFound ? null : "d-none"}>
                        <MDBCol>
                            <MDBAlert color="warning">
                                <span className="px-2">
                                    <MDBAnimation type="jello" infinite className="d-inline-flex">
                                        <FaExclamation />
                                    </MDBAnimation>
                                </span>
                                <span className="px-2">
                                    <p className="d-inline-block m-0">کاربر مورد نظر یافت نشد</p>
                                </span>
                            </MDBAlert>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={this.state.notFound ? "d-none" : null}>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <MDBJumbotron>
                                        <MDBRow>
                                            <MDBCol className="text-center">
                                                <img
                                                    src={!this.state.info.gender ? "https://cdn0.iconfinder.com/data/icons/user-pictures/100/malecostume-512.png" : "https://bornatech.ir/wp-content/uploads/2020/01/male-and-female-avatar-profile-picture-silhouette-vector-4684270-2.jpg"}
                                                    width="100"
                                                    height="100"
                                                    className="d-inline-block rounded-circle"
                                                />
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBRow>
                                                    <span className="px-1" as="MDBCol">
                                                        <p>{this.state.info.firstName}</p>
                                                    </span>
                                                    <span className="px-1" as="MDBCol">
                                                        <p>{this.state.info.lastName}</p>
                                                    </span>
                                                </MDBRow>
                                                <MDBRow>
                                                    <span className="px-1" as="MDBCol">
                                                        <p>کد ملی : </p>
                                                    </span>
                                                    <span className="px-1" as="MDBCol">
                                                        <p>{this.state.info.nationalID}</p>
                                                    </span>
                                                </MDBRow>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBJumbotron>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                {this.state.tblComponent}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default ViewUserFullInfo;