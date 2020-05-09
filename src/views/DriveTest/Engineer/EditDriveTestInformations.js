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
import Datetime from"react-datetime";
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
    InputGroup,Modal,
    InputGroupAddon, InputGroupText ,Collapse
} from "reactstrap";
import axios from "axios";
import bsCustomFileInput from "bs-custom-file-input";
import SimpleReactValidator from 'simple-react-validator';
import Badge from "react-bootstrap/Badge";
import jwt_decode from "jwt-decode";
class EditDriveTestInformations extends React.Component {
    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleRoadChange=this.handleRoadChange.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onSubmit3 = this.onSubmit3.bind(this);
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.validator2 = new SimpleReactValidator({autoForceUpdate: this,
            validators: {
                csv: {  // name the rule
                    message: 'This file must be data set  with .CSV/.csv extension.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/(?:.*).CSV|csv/)
                    }
                }}});
        this.validator1= new SimpleReactValidator({autoForceUpdate: this ,

            validators: {
                py: {  // name the rule
                    message: 'This file must be python script with .py extension.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/(?:.*).py/)
                    }
                }}});
        this.state = {
            DriveTest_Title: '',
            DriveTest_Description: '',
            DriveTest_Start_Time: null,
            DriveTest_File:  null,
            DriveTest_Road:null,
            DriveTest_Driver:null,
            isOpen1 :false,
            isOpen2 :false,
            isOpen3 :false,
            notificationModal :false,
            drivers:[],
            file1:null, file2:null,
        }}
    handleSelectChange  (e)  {
        this.setState({DriveTest_Driver: e.target.value  });


    }
    componentDidMount() {
        bsCustomFileInput.init();
        axios.get('http://localhost:4000/api/driveTestDrivers')
            .then(response => {
                this.setState({ drivers: response.data });

            })
            .catch(function (error){
                console.log(error);
            });
        let url ='http://localhost:4000/api/driveTest/'+this.props.match.params._id;
        axios.get(url)
            .then(response => {
                console.log("res=",response);
                this.setState({
                    DriveTest_Title: response.data.DriveTest_Title,
                    DriveTest_Description: response.data.DriveTest_Description,
                    DriveTest_Start_Time: response.data.DriveTest_Start_Time,
                    DriveTest_Driver: response.data.DriveTest_Driver_id,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleTitleChange(e) {
        this.setState({
            DriveTest_Title: e.target.value
        });
    }
    handleDescChange(e) {
        this.setState({
            DriveTest_Description: e.target.value
        });
    }
    handleTimeChange(date) {

        this.setState({
            DriveTest_Start_Time: date
        });
    }
    handleFileChange(e) {
        this.setState({
            DriveTest_File: e.target.files[0],
            file1:e.target.files[0].name,
            loaded: 0,
        });
    }
    handleRoadChange(e) {
        this.setState({
            DriveTest_Road: e.target.files[0],
            file2:  e.target.files[0].name,
            loaded: 0,
        });
    }
    HandleCollapse1() {
        if(this.state.isOpen2 === true || this.state.isOpen3=== true )
            this.setState({
                isOpen1: !this.state.isOpen1,
                isOpen3 : false ,
                isOpen2 : false
            });
        else
            this.setState({
                isOpen1: !this.state.isOpen1,
            });
    }
    HandleCollapse2() {
        if(this.state.isOpen1 === true || this.state.isOpen3=== true )
            this.setState({
                isOpen2: !this.state.isOpen2,
                isOpen3 : false ,
                isOpen1: false
            });
        else
            this.setState({
                isOpen2: !this.state.isOpen2,
            });
    }
    HandleCollapse3() {
        if(this.state.isOpen1 === true || this.state.isOpen2=== true )
            this.setState({
                isOpen3: !this.state.isOpen3,
                isOpen2 : false ,
                isOpen1: false
            });
        else
            this.setState({
                isOpen3: !this.state.isOpen3,
            });
    }
    GoList(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        if (decoded.role === "Admin") {
            document.location.href = '/admin/DrivetestListAdmin'
        } else if (decoded.role === "Engineer") {
            document.location.href = '/admin/Engineer'
        }
    }


    UpdateDriveTest(){
        document.location.href='/admin/EditDriveTest/'+this.props.match.params._id;
    }

    onSubmit1(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            const obj = {
                DriveTest_Title: this.state.DriveTest_Title,
                DriveTest_Description: this.state.DriveTest_Description,
                DriveTest_Start_Time: this.state.DriveTest_Start_Time,
                DriveTest_Driver_id:this.state.DriveTest_Driver
            };
            console.log("obj=", obj);
            let url = 'http://localhost:4000/api/driveTest/UpdateDriveTest/' + this.props.match.params._id;
            console.log(url);
            axios.post(url, obj)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            notificationModal: !this.state.notificationModal

                        });
                    } else {
                        console.log('DriveTest failed to update')

                    }
                });

        }else {
            this.validator.showMessages();
        }

    }
    onSubmit2(e) {
        e.preventDefault();
        if (this.validator2.allValid()) {
            const formData = new FormData();
            formData.append('DriveTestRoad', this.state.DriveTest_Road);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            let url = 'http://localhost:4000/api/driveTest/UpdateDriveTestRoad/' + this.props.match.params._id;
            axios.post(url, formData, config)
                .then(response => {
                    console.log(this.state.notificationModal);
                    if (response.status === 200) {
                        this.setState({
                            notificationModal: !this.state.notificationModal

                        });
                    } else {
                        console.log('DriveTest failed to update')

                    }
                }); }else {
            this.validator2.showMessages();
        }}



    onSubmit3(e) {
        e.preventDefault();
        if (this.validator1.allValid()) {
            const formData = new FormData();
            formData.append('DriveTestFile',this.state.DriveTest_File);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            let url ='http://localhost:4000/api/driveTest/UpdateDriveTestfile/'+this.props.match.params._id;
            axios.post(url,formData,config)
                .then(response =>
                {
                    if ( response.status === 200)
                    {
                        this.setState({
                            notificationModal : !this.state.notificationModal

                        });
                    }
                    else
                    {
                        console.log('DriveTest failed to update')

                    }
                });}else {
            this.validator1.showMessages();
        }

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
                                <Col lg="8" md="6">
                                    <Card  style={{ width: "70rem" }} className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-transparent pb-5">
                                            <div className="text-center mt-2 mb-4">
                                                <strong>Choose what You want to update </strong>
                                            </div>
                                            <div className="text-center mt-2 mb-4">
                                                <Button color="primary" onClick={()=>{this.HandleCollapse1()}}>Informations</Button>
                                                <Button color="info" onClick={()=>{this.HandleCollapse2()}}>The Road</Button>
                                                <Button color="danger" onClick={()=>{this.HandleCollapse3()}}>The drive test file</Button>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-lg-5 py-lg-5">
                                            <Collapse isOpen={this.state.isOpen1}>
                                                <Card>
                                                    <CardBody>
                                                        <div className="text-center text-muted mb-4">
                                                            <small>All fields are required * </small>
                                                        </div>
                                                        <Form  onSubmit={this.onSubmit1} className="d-flex flex-column">

                                                            <FormGroup>
                                                                <InputGroup className="input-group-alternative mb-3">
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <i className="ni ni-check-bold" />
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input placeholder="Write the Title" type="text"
                                                                           value={this.state.DriveTest_Title}
                                                                           onChange={this.handleTitleChange}
                                                                           name="DriveTest_Title"
                                                                    />
                                                                </InputGroup>
                                                                <p style={{color:"red" , fontWeight: 'bold' }}>
                                                                    {this.validator.message('DriveTest_Title', this.state.DriveTest_Title, 'required')}
                                                                </p>

                                                            </FormGroup>

                                                            <FormGroup>
                                                                <InputGroup className="input-group-alternative mb-3">
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <i className="ni ni-align-left-2" />
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <textarea className="form-control-alternative form-control"
                                                                              rows="6" placeholder="Write the description here..." type="text"
                                                                              value={this.state.DriveTest_Description}
                                                                              onChange={this.handleDescChange}
                                                                    >
                                                                    </textarea>

                                                                </InputGroup>
                                                                <p style={{color:"red" , fontWeight: 'bold'  }}>
                                                                    {this.validator.message('DriveTest_Description', this.state.DriveTest_Description, 'required')}
                                                                </p>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <InputGroup className="input-group-alternative">
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText>
                                                                            <i className="ni ni-calendar-grid-58" />
                                                                        </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Datetime dateFormat="DD-MM-YYYY"  showTimeSelect
                                                                              required
                                                                              timeFormat="HH:mm"
                                                                              timeIntervals={5}
                                                                              timeCaption="time"
                                                                              inputProps={{
                                                                                  placeholder: "Date Picker Here..." +
                                                                                      " Select the date and time for this drive test"

                                                                              }}
                                                                              name="DriveTest_Start_Time"
                                                                              selected={this.state.DriveTest_Start_Time}
                                                                              onChange={ this.handleTimeChange }
                                                                              value={this.state.DriveTest_Start_Time}  />

                                                                </InputGroup>
                                                                <p style={{color:"red" , fontWeight: 'bold' }}>
                                                                    {this.validator.message('DriveTest_Start_Time', this.state.DriveTest_Start_Time, 'required')}
                                                                </p>
                                                            </FormGroup>
                                                            <FormGroup>

                                                                <select className="browser-default custom-select"
                                                                        name="DriveTest_Driver"
                                                                        onChange={this.handleSelectChange}  >
                                                                    <option  disabled selected>Update the affected driver for this mission... </option>
                                                                    {this.state.drivers.map(V => (
                                                                        <option   value={V._id}>{V.first_name} {V.last_name}</option>))}
                                                                </select>
                                                                <p style={{color:"red" , fontWeight: 'bold' }}>
                                                                    {this.validator.message('DriveTest_Driver', this.state.DriveTest_Driver, 'required')}
                                                                </p>
                                                            </FormGroup>
                                                            <div className="text-center">
                                                                <Button className="mt-4" color="primary"  type="submit">
                                                                    Update drive test informations
                                                                </Button>
                                                            </div>
                                                        </Form>

                                                    </CardBody>
                                                </Card>
                                            </Collapse>
                                            <Collapse isOpen={this.state.isOpen2}>
                                                <Card>
                                                    <CardBody>  <Form  onSubmit={this.onSubmit2} className="d-flex flex-column">
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative mb-3">
                                                                <div className="custom-file">
                                                                    <input id="inputGroupFile01" type="file"
                                                                           className="custom-file-input"
                                                                           onChange={this.handleRoadChange}
                                                                    />
                                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                                        Update file for this drive test's Road</label>
                                                                </div>

                                                            </InputGroup>
                                                            <Badge className="badge-danger" pill >
                                                                {this.validator2.message('DriveTest_Road', this.state.file2, 'required|csv')}
                                                            </Badge>
                                                            <div className="text-center">
                                                                <Button className="mt-4" color="info"  type="submit">
                                                                    Update Drive Test road
                                                                </Button>
                                                            </div>
                                                        </FormGroup>
                                                    </Form> </CardBody>

                                                </Card>
                                            </Collapse>
                                            <Collapse isOpen={this.state.isOpen3}>
                                                <Card> <CardBody>  <Form  onSubmit={this.onSubmit3} className="d-flex flex-column">
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <div className="custom-file">
                                                                <input id="inputGroupFile01" type="file"
                                                                       className="custom-file-input"
                                                                       onChange={this.handleFileChange}
                                                                />
                                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                                    Choose file for this drive test</label>
                                                            </div>

                                                        </InputGroup>
                                                        <Badge className="badge-danger" pill>
                                                            {this.validator1.message('DriveTest_File', this.state.file1, 'required|py')}
                                                        </Badge>
                                                        <div className="text-center">
                                                            <Button className="mt-4" color="danger"  type="submit">
                                                                Update drive test file
                                                            </Button>
                                                        </div>
                                                    </FormGroup>


                                                </Form> </CardBody>


                                                </Card>
                                            </Collapse>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>


                    </Container>

                </div>
                <Modal
                    className="modal-dialog-centered modal-info"
                    isOpen={this.state.notificationModal}>
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-notification">
                            Alert
                        </h6>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className="ni ni-bell-55 ni-3x" />
                            <h4 className="heading mt-4">  Your Drive Test was successfully updated!</h4>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button className="btn-white" color="default" type="button" onClick={()=> this.GoList()}>
                            Got it ,Return to The list
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.UpdateDriveTest()}>
                            Complete Your Changes
                        </Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default EditDriveTestInformations;
