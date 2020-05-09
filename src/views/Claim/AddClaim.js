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
// reactstrap components
import {
    Button,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon, InputGroupText
} from "reactstrap";
import axios from "axios";

class AddClaim extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subject_claim: '',
            description_claim: '',

        }
    }

    handleSubjectChange(e) {
        this.setState({
            subject_claim: e.target.value
        });
    }

    handleDescChange(e) {
        this.setState({
            description_claim: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();


        const Claim = {
            subject_claim: this.state.subject_claim,
            description_claim: this.state.description_claim,

        };

        axios.post('http://localhost:4000/api/claim/AddClaim', Claim)
            .then(response =>
            {
                if ( response.status === 200)
                {
                    document.location.href='/admin/ClaimsList'
                }
                else
                {
                   alert('claim failed to add')

                }
            });

            this.setState({
            subject_claim: '',
            description_claim: ''
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
                    }}>

                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-8" />
                    {/* Header container */}

                    <Container className="d-flex align-items-center" fluid>
                        <Container className="d-flex align-items-center" fluid>
                            <Row>
                                <Col lg="7" md="10">
                                    <h1 className="display-1 text-white text-center">Send Claim </h1>


                                </Col>
                            </Row>
                        </Container>
                            <Col lg="8" md="8">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent pb-5">
                                        <div className="text-center mt-2 mb-4">
                                            <strong>Fill the form and send your claim to the administrator</strong>
                                        </div>

                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>All fields are required</small>
                                        </div>
                                        <Form  onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-button-play" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Write your subject" type="text"
                                                           value={this.state.subject_claim}
                                                           onChange={this.handleSubjectChange} />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-align-left-2" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <textarea className="form-control-alternative form-control"
                                                              rows="6" placeholder="Write your description here..." type="text"
                                                              value={this.state.description_claim}
                                                              onChange={this.handleDescChange}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>

                                            </FormGroup>


                                            <div className="text-center">
                                                <Button className="mt-4" color="primary"  type="submit"
                                                >
                                                    Send Claim
                                                </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>

                    </Container>
                </div>
            </>
        );
    }
}

export default AddClaim;
