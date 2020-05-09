import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "reactstrap/es/Button";
import Card from "react-bootstrap/Card";

import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import {Modal} from "react-bootstrap";
import jwt_decode from "jwt-decode";


class EnginnerList extends React.Component {


    constructor() {
        super(...arguments);
        this.state = {
            drivetests: [],
            Data:[],
            show :false,
            id : '',
            _id:'',
            first_name: '',
            last_name: '',
            email: '',
            role:'',
        }
        this.HandleModal=this.HandleModal.bind(this);
        this.HandleDelete=this.HandleDelete.bind(this);
    }
    HandleDelete(D) {

        axios.delete('http://localhost:4000/api/driveTest/DeleteDriveTest/'+D)
            .then(res => {
                this.setState(previousState => {
                        return {
                            drivetests: previousState.drivetests.filter(m => m._id !== D)
                        };
                    },
                    document.location.href='/admin/Engineer');
            })
            .catch(err => {
                console.log(err);
            });


    }
    convertData(a){
        var accounting = [];

        for(var i in a) {
            var item =a[i];
            var b;
            var d1 = new Date(item.DriveTest_Start_Time);
            var today = new Date();
            if(item.DriveTest_State===true && item.DriveTest_Done_Date!=null)
            {
                b ={
                    "Id" : item._id,
                    "Subject"  : item.DriveTest_Title,
                    "StartTime"       : item.DriveTest_Start_Time,
                    "EndTime"       : item.DriveTest_Done_Date,
                    "Category" : "Done",



                }
            }
            else if (item.DriveTest_State===false)
                if(item.DriveTest_Done_Date ==null && (today<d1))
                {
                    b ={
                        "Id" : item._id,
                        "Subject"  : item.DriveTest_Title,
                        "StartTime"       : item.DriveTest_Start_Time,
                        "EndTime"       : item.DriveTest_Start_Time,
                        "Category" : "Pending",



                    }
                }
                else if (item.DriveTest_Done_Date !=null )
                {
                    b ={
                        "Id" : item._id,
                        "Subject"  : item.DriveTest_Title,
                        "StartTime"       : item.DriveTest_Start_Time,
                        "EndTime"       : item.DriveTest_Done_Date,
                        "Category" : "Interrupted",



                    }
                }
                else if( (today> d1))
                {
                    b ={
                        "Id" : item._id,
                        "Subject"  : item.DriveTest_Title,
                        "StartTime"       : item.DriveTest_Start_Time,
                        "EndTime"       : item.DriveTest_Start_Time,
                        "Category" : "Missed",



                    }
                }
            accounting.push(b); }
        return accounting
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded)
        this.setState({
            _id:decoded._id,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            role: decoded.role
        })
        axios.get('http://localhost:4000/api/driveTest/engineer/drivetests/'+decoded._id)
            .then(response => {
                this.setState({drivetests: response.data , data:this.convertData(response.data) });
                console.log(this.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    template(props) {
        return (<div className="tooltip-wrap">
            <div className="content-area"><div className="name">{props.Subject}</div>
                {(props.City !== null && props.City !== undefined) ? <div className="city">{props.City}</div> : ''}
                <div className="time">From :{props.StartTime.toLocaleString()}</div>
                <div className="time">To  :{props.EndTime.toLocaleString()}</div></div></div>);
    }

    header(props) {
        return (<div>
            {props.elementType === 'cell' ?
                <div className="e-cell-header">
                    <div className="e-header-icon-wrapper">
                        <button className="e-close" title="Close"></button>
                    </div>
                </div> :

                <div className="e-event-header">
                    <div className="e-header-icon-wrapper">
                        <button className="e-close" title="CLOSE"></button>
                    </div>


                    <div className="e-subject-wrap">
                        {(props.Subject !== undefined) ?
                            <div className="e-subject e-text-ellipsis">{props.Subject}</div>
                            : ""}

                        <br></br>
                        <h1 className="e-subject e-text-center" >{props.Category}</h1>
                        <Button color="danger" outline type="button"  size="sm" onClick={()=>{this.HandleModal(props.Id)}}>Delete</Button>
                        <a href={`/admin/EditDriveTest/${props.Id}`}> <Button color="primary" outline type="button"   size="sm">Edit</Button> </a>
                    </div></div>
            }
        </div>);
    }
    HandleModal(item) {
        this.setState({
            show: !this.state.show,
            id :item
        });
    }
    footer(props) {
        return (<div>
            {props.elementType === 'cell' ?
                <div className="e-cell-footer">
                    <button className="e-event-details" title="Extra Details">Extra Details</button>
                    <button className="e-event-create" title="Add">Add</button>
                </div>
                :
                <div className="e-event-footer">
                    <button className="e-event-edit" title="Edit">Edit</button>
                    <button className="e-event-delete" title="Delete">Delete</button>
                </div>}
        </div>); }
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
                        <Container className="d-flex align-items-center" fluid>
                            <Row>
                                <Col lg="7" md="10">
                                    <h1 className="display-2 text-white text-center">Welcome To your work space </h1>


                                </Col>
                                <Col lg="7" md="10">
                                    <p className="text-white mt-0 mb-5 text-center ">
                                        This is your Work page.   Here is where you will plan the drive tests
                                    </p>
                                </Col>
                                <Col lg="7" md="10">
                                    <Button color="info"  className="center"  href="/admin/PlanDriveTest" >+ Add New drive Test </Button>
                                </Col>
                                <br></br><br></br><br></br>

                                <Col lg="12" md="6">

                                    <Card className="card-frame ">


                                        <ScheduleComponent  height='550px' currentView='Month'
                                                            readonly={true}
                                                            quickInfoTemplates={{ header: this.header.bind(this),footer: this.footer.bind(this) }}
                                                            eventSettings={{ dataSource: this.state.data, enableTooltip: true,
                                                                tooltipTemplate: this.template.bind(this) }}
                                        >
                                            <Inject services={[Day, Week, WorkWeek, Month, Agenda ]}/>

                                        </ScheduleComponent>
                                    </Card>
                                </Col>
                            </Row>

                        </Container>
                    </Container>

                </div>

                <Modal show={this.state.show} onHide={()=>this.HandleModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h2>DELETE CONFIRMATION </h2>
                        </Modal.Title >
                    </Modal.Header>
                    <Modal.Body>
                        <h4> Are You sure You want to delete this drive test ? </h4>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button color="danger" onClick={()=>this.HandleDelete(this.state.id)} >
                            Confirm
                        </Button>
                        <Button color="default"  onClick={()=>this.HandleModal()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}
export default EnginnerList;