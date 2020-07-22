import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

class FullInfoTbl extends Component {

    state = {
        tbl: [],
    };

    componentDidMount = () => {
        console.log(this.props.infos)
        this.setState({
            tbl: [
                ...this.state.tbl,
                <MDBCol key={this.props.infos._id} className="border py-3 table">
                    <MDBRow className="border-bottom py-4">
                        <MDBCol>
                            <p className="m-0 font-weight-bold">نام</p>
                        </MDBCol>
                        <MDBCol>
                            <p className="m-0 tinyFontSize">
                                {this.props.infos.userId.firstName}
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="border-bottom py-4">
                        <MDBCol>
                            <p className="m-0 font-weight-bold">نام خانوادگی</p>
                        </MDBCol>
                        <MDBCol>
                            <p className="m-0 tinyFontSize">
                                {this.props.infos.userId.lastName}
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="border-bottom py-4">
                        <MDBCol>
                            <p className="m-0 font-weight-bold">شماره ملّی</p>
                        </MDBCol>
                        <MDBCol>
                            <p className="m-0 tinyFontSize">
                                {this.props.infos.userId.nationalID}
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="border-bottom py-4">
                        <MDBCol>
                            <p className="m-0 font-weight-bold">جنسیت</p>
                        </MDBCol>
                        <MDBCol>
                            <p className="m-0 tinyFontSize">
                                {this.props.infos.userId.gender ? "زن" : "مرد"}
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="border-bottom py-4">
                        <MDBCol>
                            <p className="m-0 font-weight-bold">پست الکترونیکی</p>
                        </MDBCol>
                        <MDBCol>
                            <p className="m-0 tinyFontSize">
                                {this.props.infos.userId.email}
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="py-4">
                        <MDBCol>
                            <p className="m-0 font-weight-bold">وضعیت</p>
                        </MDBCol>
                        <MDBCol>
                            <span className="px-1">
                                <p className="m-0 tinyFontSize d-inline-block">
                                    {this.props.infos.activity ? "فعال" : "غیر فعال"}
                                </p>
                            </span>
                            <span className="px-1">
                                {
                                    this.props.infos.activity
                                        ?
                                        <FaCheckCircle className="text-success" />
                                        :
                                        <FaExclamationCircle className="text-danger" />
                                }
                            </span>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            ]
        })
    };

    render() {
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        {this.state.tbl}
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default FullInfoTbl;