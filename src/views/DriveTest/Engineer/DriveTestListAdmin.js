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
    Card,

    Container,
    Row,

    CardHeader,
    Table,

    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
} from "reactstrap";
import axios from "axios";
import Button from "reactstrap/es/Button";
import {Modal} from "react-bootstrap";
import { MDBCol, MDBIcon} from "mdbreact";
import { Link } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
import  { Pagination ,PaginationItem, PaginationLink} from "reactstrap";
class DrivetestlistAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drivetests: [],
            show :false,
            DriveTest : '',
            query:'',
            showEval:false,
            DriveTestEval :[],
            currentPage: 0,
            sort: true,
            driver:[],

        };
        this.pageSize = 5;

        //   this.pagesCount=this.pagesCount.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.HandleDone=this.HandleDone.bind(this);
        this.HandlePending=this.HandlePending.bind(this);
        this.HandleData=this.HandleData.bind(this);
        this.HandleModalEval=this.HandleModalEval.bind(this);
        this.toggleSortTitle=this.toggleSortTitle.bind(this);
        this.toggleSortSetDate=this.toggleSortSetDate.bind(this);
        this.toggleSortStartDate=this.toggleSortStartDate.bind(this);
        this.HandleInterrupted=this.HandleInterrupted.bind(this);
        this.HandleMissed=this.HandleMissed.bind(this);
    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });

    }
    componentDidMount() {

        this.HandleData();


    }
    HandleModal(item) {
        this.setState({
            show: !this.state.show,
            DriveTest :item
        });
    }
    HandleModalEval(item){
        var state = Object.assign(this.state, {    DriveTestEval:item });
        this.setState({
                showEval: !this.state.showEval,
                state
            }
        );
        axios.get('http://localhost:4000/api/driveTestDrivers/driver/'+item.DriveTest_Driver_id)
            .then(response => {
                this.setState({driver: response.data[0]["first_name"] +" "+response.data[0]["last_name"] });
                console.log("aaaaaaaaa",  this.state.driver)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    HandleDone() {
        axios.get('http://localhost:4000/api/driveTest/filter/done')
            .then(response => {
                this.setState({ drivetests: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandlePending() {
        axios.get('http://localhost:4000/api/driveTest/filter/pending')
            .then(response => {
                this.setState({ drivetests: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandleMissed() {
        axios.get('http://localhost:4000/api/driveTest/filter/missed')
            .then(response => {
                this.setState({ drivetests: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandleInterrupted() {
        axios.get('http://localhost:4000/api/driveTest/filter/interrupted')
            .then(response => {
                this.setState({ drivetests: response.data });
                console.log(this.state.drivetests);
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandleData() {
        axios.get('http://localhost:4000/api/driveTest')
            .then(response => {
                this.setState({ drivetests: response.data });
                this.pagesCount = Math.ceil(this.state.drivetests.length / this.pageSize);
                console.log('drive====',this.state.drivetests)
            })
            .catch(function (error){
                console.log(error);
            });
    }
    handleInputChange(){
        this.setState({
            query:  this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.HandleSearch();
                }
            }
            else this.HandleData();
        })
    }

    HandleDelete(D) {

        axios.delete('http://localhost:4000/api/driveTest/DeleteDriveTest/'+D._id)
            .then(res => {
                this.setState(previousState => {
                        return {
                            drivetests: previousState.drivetests.filter(m => m._id !== D._id)
                        };
                    },
                    document.location.href='/admin/DrivetestListAdmin');
            })
            .catch(err => {
                console.log(err);
            });


    }
    formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' ,hour:"numeric",minute:"numeric",second:"numeric"};
        return new Date(string).toLocaleDateString([],options);
    }
    CalculHours(string1,string2){
        const date1 = new Date(string1)
        const date2 = new Date(string2)
        let  res=(date2.getTime()-date1.getTime())
        return res
    }
    ResulatCalculhours(A){
        let h = Math.trunc(A/3600000)
        console.log(h);
        let min  = Math.trunc((A%3600000)/60000)
        let sec =Math.trunc(((A%3600000)%60000)/1000)
        let ms =((A%3600000)%60000)%1000
        let  res = h +" hours , "+ min +" minutes ,"+ sec +" secondes and "+ ms+" Millisecondes "
        console.log(res)
        return res
    }
    AffListConditionnel(item){
        console.log(item);
        var d1 = new Date(item.DriveTest_Start_Time);
        var today = new Date();
        if(item.DriveTest_State===true && item.DriveTest_Done_Date!=null)
            return <> <td style={{color: "green"}} > <strong>Done</strong> </td>
                <td style={{color: "green"}} >{this.formatDate(item.DriveTest_Done_Date)}</td></>
        else if (item.DriveTest_State===false && item.DriveTest_Done_Date ==null && (today<d1))
            return <> <td style={{color: "blue"}} > <strong> Pending </strong> </td>
                <td style={{color: "blue"}} > <strong> Pending </strong></td></>
        else if (item.DriveTest_State===false && item.DriveTest_Done_Date !=null  )
            return  <><td style={{color: "orange"}}> <strong>Interrupted</strong> </td>
                <td style={{color: "orange"}}>{this.formatDate(item.DriveTest_Done_Date)}</td></>
        else if( (today> d1) && item.DriveTest_State===false)
            return <> <td style={{color: "red"}} > <strong>Missed</strong> </td>
                <td style={{color: "red"}} ><strong>Missed</strong> </td></>


    }
    AffEvaluationConditionnel(item){
        console.log(item);
        var d1 = new Date(item.DriveTest_Start_Time);
        var today = new Date();
        if(item.DriveTest_State===true && item.DriveTest_Done_Date!=null)
        {
            if(this.CalculHours (item.DriveTest_Start_Time,item.DriveTest_Done_Date) <=7200000
                && this.CalculHours (item.DriveTest_Start_Time,item.DriveTest_Done_Date)>0 )
                return <div>
                    <h1 style={{color: "green"}}> The driver did a great job </h1>
                    <h2 style={{color: "blue"}}>
                        The driver spent  {this.ResulatCalculhours(this.CalculHours (item.DriveTest_Start_Time,item.DriveTest_Done_Date))}
                        in this mission
                    </h2>
                </div>
            else if(this.CalculHours (item.DriveTest_Start_Time,item.DriveTest_Done_Date)>7200000 &&
                item.DriveTest_State===true)
                return <div>
                    <h1 style={{color: "red"}} > The driver has exceeded his provided time on this mission </h1>
                    <h2 style={{color: "#A13838"}}>
                        The driver spent   {this.ResulatCalculhours(this.CalculHours (item.DriveTest_Start_Time,item.DriveTest_Done_Date))}
                        in this mission
                    </h2>
                </div>  ;
        }
        else if (item.DriveTest_State===false && item.DriveTest_Done_Date ==null && (today<d1))
            return  <div>
                <h1 style={{color: "blue"}} > This mission didn't started yet  </h1>
            </div>  ;
        else if (item.DriveTest_State===false && item.DriveTest_Done_Date !=null )
            return  <div>
                <h1 style={{color: "red"}} > This mission was interrupted  </h1>
            </div>  ;
        else if( (today> d1) && item.DriveTest_State===false)
            return <div>
                <h1 style={{color: "red"}} > The driver has missed this mission </h1>
            </div>  ;


    }
    HandleSearch(){

        axios.get('http://localhost:4000/api/driveTest/search/'+this.state.query)
            .then(response => {

                this.setState({ drivetests: response.data });
            })
            .catch(function (error){
                console.log(error);
            });


    }
    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }}
    toggleSortTitle(){
        let res ;
        let List =this.state.drivetests ;
        let NewList;
        console.log("mel lou ",List);
        if(this.state.sort) {
            NewList = List.sort(function (a,b) {
                res=a.DriveTest_Title.localeCompare(b.DriveTest_Title)
                return res;
            });
            // console.log(this.state.sort)
        } else {
            NewList = List.reverse()
        }
        this.setState({
            sort:!this.state.sort,
            drivetests:NewList
        })

    }
    toggleSortSetDate(){
        let res ;
        let List =this.state.drivetests ;
        let NewList;
        console.log("mel lou ",List);
        if(this.state.sort) {
            NewList = List.sort(function (a,b) {
                res=a.DriveTest_Set_Date.localeCompare(b.DriveTest_Set_Date)
                return res;
            });
            // console.log(this.state.sort)
        } else {
            NewList = List.reverse()
        }
        this.setState({
            sort:!this.state.sort,
            drivetests:NewList
        })

    }

    toggleSortStartDate(){
        let res ;
        let List =this.state.drivetests ;
        let NewList;
        console.log("mel lou ",List);
        if(this.state.sort) {
            NewList = List.sort(function (a,b) {
                res=a.DriveTest_Start_Time.localeCompare(b.DriveTest_Start_Time)
                return res;
            });
            // console.log(this.state.sort)
        } else {
            NewList = List.reverse()
        }
        this.setState({
            sort:!this.state.sort,
            drivetests:NewList
        })

    }
    render() {
        const { currentPage } = this.state;
        return (
            <>
                <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style={{
                         minHeight: "600px",
                         backgroundImage:
                             "url(" + require("assets/img/theme/Logo-SFM.png") + ")",
                         backgroundSize: "50 %"  ,
                         backgroundPosition: "center top"
                     }}>
                    <span className="mask bg-gradient-gray-dark opacity-8" />
                    <Container fluid>
                        <Button color="info"  href="/admin/PlanDriveTest" >+ Add New drive Test </Button>
                        <br/> <br/>
                        <div className="header-body">
                            {/* Card stats */}
                            <Row>
                                <div className="col">
                                    <Card className="shadow">
                                        <CardHeader className="border-0">
                                            <MDBCol md="6">
                                                <form className="form-inline mt-4 mb-4" onKeyPress={this.onKeyPress} >
                                                    <MDBIcon icon="search" />
                                                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"
                                                           ref={input => this.search = input}
                                                           onChange={this.handleInputChange}/>
                                                </form>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="warning">
                                                        Filter
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=>this.HandleData()} >All</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>this.HandleDone()} >Done Drive Tests </Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>this.HandlePending()}>Pending Drive Tests </Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>this.HandleMissed()}>Missed Drive Tests </Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>this.HandleInterrupted()}>Interrupted Drive Tests </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </MDBCol>
                                            <br></br>
                                            <h3 className="mb-0">All drive Tests</h3>


                                        </CardHeader>
                                        <Table className="align-items-center table-flush " responsive >
                                            <thead className="thead-light">
                                            <tr>
                                                <th scope="col">
                                                    <Button  color="secondary" outline type="button" onClick={this.toggleSortTitle}>
                                                        <i className="ni ni-bold-up"></i> Title
                                                    </Button>
                                                </th>
                                                <th scope="col">Description</th>
                                                <th scope="col">
                                                    <Button  color="secondary" outline type="button" onClick={this.toggleSortSetDate}>
                                                        <i className="ni ni-bold-up"></i> Set Date
                                                    </Button>
                                                </th>
                                                <th scope="col">
                                                    <Button  color="secondary" outline type="button" onClick={this.toggleSortStartDate}>
                                                        <i className="ni ni-bold-up"></i>  Start Time
                                                    </Button>
                                                </th>
                                                <th scope="col">State </th>
                                                <th scope="col">
                                                    Done Date

                                                </th>



                                                <th> </th>

                                            </tr>
                                            </thead>
                                            <tbody>

                                            {this.state.drivetests
                                                .slice(
                                                    currentPage * this.pageSize,
                                                    (currentPage + 1) * this.pageSize
                                                )
                                                .map(D => (
                                                    <tr key={D._id}>
                                                        <td>{D.DriveTest_Title}</td>
                                                        <td>{D.DriveTest_Description}</td>
                                                        <td>{this.formatDate(D.DriveTest_Set_Date)}</td>
                                                        <td> {this.formatDate(D.DriveTest_Start_Time)}</td>
                                                        { this.AffListConditionnel(D)}
                                                        <td> <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#pablo"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem>
                                                                    <Button color="info"  onClick={()=>{this.HandleModalEval(D)}} >Evaluation</Button>
                                                                </DropdownItem>
                                                                <DropdownItem>
                                                                    <Button color="danger"  onClick={()=>{this.HandleModal(D)}} >Delete</Button>
                                                                </DropdownItem>
                                                                <DropdownItem>
                                                                    <Link to={`/admin/EditDriveTest/${D._id}`}><Button color="success">Update</Button>
                                                                    </Link>
                                                                </DropdownItem>

                                                            </DropdownMenu>
                                                        </UncontrolledDropdown></td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </Table>
                                        <CardFooter className="py-4">
                                            <nav >
                                                <div>
                                                    <Pagination aria-label="Page navigation example">
                                                        <PaginationItem  disabled={currentPage ===0} >
                                                            <PaginationLink
                                                                onClick={e => this.handleClick(e, currentPage - 1)}
                                                                previous
                                                                href="#"
                                                            />
                                                        </PaginationItem>

                                                        {[...Array(this.pagesCount)].map((page, i) =>
                                                            <PaginationItem active={i === currentPage} key={i}>
                                                                <PaginationLink onClick={e => this.handleClick(e, i)}>
                                                                    {i + 1}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        )}
                                                        <PaginationItem disabled={currentPage >= this.pagesCount -1} >
                                                            <PaginationLink
                                                                onClick={e => this.handleClick(e, currentPage + 1)}
                                                                next
                                                                href="#"
                                                            />

                                                        </PaginationItem>

                                                    </Pagination>
                                                </div>
                                            </nav>
                                        </CardFooter>

                                    </Card>

                                </div>
                            </Row>
                        </div>
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

                        <Button color="danger" onClick={()=>this.HandleDelete(this.state.DriveTest)} >
                            Confirm
                        </Button>
                        <Button color="default"  onClick={()=>this.HandleModal()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal  show={this.state.showEval} onHide={()=>this.HandleModalEval(this.state.DriveTestEval)}>
                    <Modal.Header closeButton>
                        <Modal.Title >
                            <h2 style={{color: "blue"}} >{this.state.DriveTestEval.DriveTest_Title} Evaluation</h2>
                            <h4 style={{color: "#1A2493"}}  > {this.state.DriveTestEval.DriveTest_Description}   </h4>
                            <h4 style={{color: "#1A2493"}}  > By The driver {this.state.driver}   </h4>
                            <h4 style={{color: "#9C145A"}}  > {this.formatDate(this.state.DriveTestEval.DriveTest_Start_Time)}   </h4>

                        </Modal.Title >
                    </Modal.Header>
                    <Modal.Body>
                        {this.AffEvaluationConditionnel(this.state.DriveTestEval)}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="default"  onClick={()=>this.HandleModalEval(this.state.DriveTestEval)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


}

export default DrivetestlistAdmin;
