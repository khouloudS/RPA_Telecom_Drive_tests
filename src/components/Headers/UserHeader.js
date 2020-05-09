/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import jwt_decode from 'jwt-decode'
// reactstrap components
import {  Container, Row, Col } from "reactstrap";


class UserHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            role:'',
            errors: {}
        }
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            role: decoded.role
        })
    }
    render() {
        return (
            <>
                <div
                    className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "600px",
                        backgroundImage:
                            "url(" + require("assets/img/theme/Logo-SFM.png") + ")",
                        backgroundSize: "50 %"  ,
                        backgroundPosition: "center top"
                    }}
                >
                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-8" />
                    {/* Header container */}
                    <Container className="d-flex align-items-center" fluid>
                        <Row>
                            <Col lg="7" md="10">
                                <h1 className="display-2 text-white">Hello {this.state.first_name}</h1>
                                <p className="text-white mt-0 mb-5">
                                    This is your profile page.
                                </p>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default UserHeader;
