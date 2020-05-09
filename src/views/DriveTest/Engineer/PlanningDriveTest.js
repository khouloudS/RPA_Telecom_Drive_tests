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
import bsCustomFileInput from 'bs-custom-file-input';
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
import SimpleReactValidator from 'simple-react-validator';
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import jwt_decode from "jwt-decode";

class PlanningDriveTest extends React.Component {



    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                py: {  // name the rule
                    message: 'This file must be python script with .py extension.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/(?:.*).py/)
                    }
                },
                csv: {  // name the rule
                    message: 'This file must be data set  with .CSV/.csv extension.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/(?:.*).CSV|csv/)
                    }
                }

            }
        });
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleRoadChange = this.handleRoadChange.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
        this.VerifyData=this.VerifyData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            file1:'',file2:'',
            DriveTest_Title: '',
            DriveTest_Description: '',
            DriveTest_Start_Time: null,
            DriveTest_File: null,
            DriveTest_Road: null,
            DriveTest_Driver: null,
            drivers:[],test:[]
        }
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
    }
    VerifyData(stateDriver,date){
        axios.get('http://localhost:4000/api/driveTestDrivers/CheckAvibility/'+date+'/'+stateDriver)
            .then(response => {
                this.setState({ test: response.data });

            })
            .catch(function (error){
                console.log(error);
            });

    }
    handleSelectChange  (e)  {
        this.setState({DriveTest_Driver: e.target.value  });


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
            file1 : e.target.files[0].name,
            loaded: 0,
        });

    }
    handleRoadChange(e) {
        this.setState({
            DriveTest_Road: e.target.files[0],
            file2:  e.target.files[0].name,
            loaded: 0,

        });console.log(this.state.DriveTest_Road)
    }
    onSubmit(e) {
        e.preventDefault();
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const formData = new FormData();
        formData.append('DriveTest_Title',this.state.DriveTest_Title);
        formData.append('DriveTest_Description',this.state.DriveTest_Description);
        formData.append('DriveTest_Start_Time',this.state.DriveTest_Start_Time);
        formData.append('DriveTestFile',this.state.DriveTest_File);
        formData.append('DriveTestRoad',this.state.DriveTest_Road);
        formData.append('DriveTest_Driver_id',this.state.DriveTest_Driver);
        formData.append('DriveTest_Enginner_id',decoded._id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if (this.validator.allValid() ) {

            axios.get('http://localhost:4000/api/driveTestDrivers/CheckAvibility/'+this.state.DriveTest_Start_Time+'/'+this.state.DriveTest_Driver)
                .then(response => {
                    this.setState({ test: response.data });
                    console.log("aaaa",this.state.test);
                    if(this.state.test.length === 0) {
                        axios.post('http://localhost:4000/api/driveTest/AddDriveTest', formData,config)
                            .then(response =>
                            {
                                if ( response.status === 200) {
                                    if (decoded.role === "Admin") {
                                        document.location.href = '/admin/DrivetestListAdmin'
                                    } else if (decoded.role === "Engineer") {
                                        document.location.href = '/admin/Engineer'
                                    }
                                }
                                else
                                {
                                    console.log('DriveTest failed to add')

                                }
                            });
                        this.setState({
                            DriveTest_Title: '',
                            DriveTest_Description: '',
                            DriveTest_Start_Time: '',
                            DriveTest_File: null,
                            DriveTest_Road: null,
                            selectedOption: null,
                        })
                    }else
                    {
                        alert("Choose another driver for this test !!! This driver has a mission at that time")
                    }

                })
                .catch(function (error){
                    console.log(error);
                });

            }
        else {
            this.validator.showMessages();
            console.log(this.validator.allValid())
            this.forceUpdate();
        }

    }

    render() {
        return (
            <>
                <div
                    className="header pb-8 pt-5 pt-lg-8  align-items-center"
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

                    <Container className="align-items-center " fluid>
                        <Container className="align-items-center" fluid>
                            <Row>
                                <Col lg="12" md="5">
                                    <Card  style={{ width: "80rem" }} className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-transparent pb-5">
                                            <div className="text-center mt-2 mb-4">
                                                <strong>Fill the form to plan a drive test</strong>
                                            </div>

                                        </CardHeader>
                                        <CardBody className="px-lg-5 py-lg-5">
                                            <div className="text-center text-muted mb-4">
                                                <small>All fields are required</small>
                                            </div>
                                            <Form  onSubmit={this.onSubmit} className="d-flex flex-column" >
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-check-bold" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Write the Title" type="text"
                                                               value={this.state.DriveTest_Title}
                                                               onChange={this.handleTitleChange} name="DriveTest_Title"/>

                                                    </InputGroup>
                                                    <Badge className="badge-danger" pill >
                                                        {this.validator.message('DriveTest_Title', this.state.DriveTest_Title, 'required')}
                                                    </Badge>

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
                                                                  onChange={this.handleDescChange}  name="DriveTest_Description">

                                                </textarea>

                                                    </InputGroup>
                                                    <Badge className="badge-danger" pill >
                                                        {this.validator.message('DriveTest_Description', this.state.DriveTest_Description, 'required')}
                                                    </Badge>
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-calendar-grid-58" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Datetime dateFormat="YYYY-MM-DD"  showTimeSelect
                                                                  timeFormat="HH:mm"
                                                                  timeIntervals={5}
                                                                  timeCaption="time"
                                                                  inputProps={{
                                                                      placeholder: "Date Picker Here..." +
                                                                          " Select the date and time for this drive test"

                                                                  }}
                                                                  name="DriveTest_Start_Time"
                                                                  selected={this.state.DriveTest_Start_Time}
                                                                  onChange={ this.handleTimeChange } />

                                                    </InputGroup>
                                                    <Badge className="badge-danger" pill >
                                                        {this.validator.message('DriveTest_Start_Time', this.state.DriveTest_Start_Time, 'required')}
                                                    </Badge>
                                                </FormGroup>

                                                <FormGroup>
                                                    <div className="custom-file">
                                                        <input id="inputGroupFile01" type="file"
                                                               className="custom-file-input"
                                                               name="DriveTest_File"
                                                               onChange={this.handleFileChange} onBlur={() => this.validator.showMessageFor('DriveTest_File')}
                                                        />
                                                        <label style={{color: "red"}}  className="custom-file-label" htmlFor="inputGroupFile01">
                                                            Choose Python script file for this drive test</label>
                                                    </div>
                                                    <Badge className="badge-danger" pill>
                                                        {this.validator.message('DriveTest_File', this.state.file1, 'required|py')}
                                                    </Badge>
                                                </FormGroup>
                                                <FormGroup>
                                                    <div className="custom-file">
                                                        <input id="inputGroupFile01" type="file"
                                                               className="custom-file-input"
                                                               name="DriveTest_Road"
                                                               onChange={this.handleRoadChange}
                                                               onBlur={() => this.validator.showMessageFor('DriveTest_Road')}
                                                        />
                                                        <label style={{color: "red"}} className="custom-file-label" htmlFor="inputGroupFile01">
                                                            Choose CSV file of the Drive test's Road</label>
                                                    </div>
                                                    <Badge className="badge-danger" pill >
                                                        {this.validator.message('DriveTest_Road', this.state.file2, 'required|csv')}
                                                    </Badge>
                                                </FormGroup>
                                                <FormGroup>

                                                    <select className="browser-default custom-select"
                                                            name="DriveTest_Driver"
                                                            onChange={this.handleSelectChange}  >
                                                        <option  disabled selected>Choose the affected driver for this mission... </option>
                                                        {this.state.drivers.map(V => (
                                                            <option   value={V._id}>{V.first_name} {V.last_name}</option>))}
                                                    </select>
                                                    <Badge className="badge-danger" pill >
                                                        {this.validator.message('DriveTest_Driver', this.state.DriveTest_Driver, 'required')}
                                                    </Badge>
                                                </FormGroup>
                                                <div className="text-center">
                                                    <Button className="mt-4" color="primary"  type="submit"
                                                    >
                                                        Add drive test
                                                    </Button>
                                                </div>
                                            </Form>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>


                    </Container>
                </div>

            </>
        );
    }
}

export default PlanningDriveTest;
