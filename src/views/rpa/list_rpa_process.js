import React from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Container,
    Row,
    Button, Col, CardBody, CardTitle
} from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "components/Headers/Header_RPA.js";
import axios from "axios";
import {Link} from 'react-router-dom'
import jwt_decode from "jwt-decode";

function icon(e,DriveTest_Done_Date) {
   if (e === false && DriveTest_Done_Date != null){
       return  <img src="https://img.icons8.com/color/30/000000/usb-disconnected.png"/>
   }
   if (e === false && DriveTest_Done_Date == null ){
       return  <img src="https://img.icons8.com/color/30/000000/cancel--v1.png"/>
   }
   else if (e === true){
       return  <img src="https://img.icons8.com/flat_round/30/000000/checkmark.png"/>
   }
  }
  function convertDate(today) {
    today = new Date(today);
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return  date+' '+time;
  }

const DriveTest = (props) => (


    <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
            <Row>
                <div className="col">
                    <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                    >
                        {props.drive_test.DriveTest_Title}
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                        {props.drive_test.DriveTest_Description}
                     </span>
                </div>
                <Col className="col-auto">
                        {icon(props.drive_test.DriveTest_State,props.drive_test.DriveTest_Done_Date)}
                </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-success mr-2">

            <Link to={"/admin/maps/"+props.drive_test._id}>
               <Button
                   className="btn-neutral btn-icon"
                   color="primary"
                  >
                    Show
               </Button>
            </Link>


                </span>{" "}
                <span className="text-nowrap">
            {
               convertDate( props.drive_test.DriveTest_Set_Date)
            }
                </span>
            </p>
        </CardBody>
    </Card>
)

class RPAList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            drive_tests : [],
            currentPage: 0
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.HandleDone=this.HandleDone.bind(this);
        this.HandlePending=this.HandlePending.bind(this);
        this.HandleData=this.HandleData.bind(this);
        this.pageSize = 4;

    }

    componentDidMount = () => {
        this.interval = window.setInterval(this.moveObject, 1000)
       /* axios.get('http://localhost:4000/api/planning/get_planning')
            .then(response => {
                this.setState({ drive_tests: response.data });
                this.drive_test = response.data;
                console.log(this.drive_test);
            })
            .catch(function (error){
                console.log(error);
            })*/
       this.HandleData()
    }
    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });

    }

    HandleDone() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        axios.get('http://localhost:4000/api/planning/filter/done/'+decoded._id)
            .then(response => {
                this.setState({ drive_tests: response.data });
                this.drive_test = response.data;
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandlePending() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        axios.get('http://localhost:4000/api/planning/filter/pending/'+decoded._id)
            .then(response => {
                this.setState({ drive_tests: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandleData() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded._id)
        axios.get('http://localhost:4000/api/planning/'+decoded._id)
            .then(response => {
                this.setState({ drive_tests: response.data });
                this.pagesCount = Math.ceil(this.state.drive_tests.length / this.pageSize);
                console.log('drive====',this.state.drive_tests)
            })
            .catch(function (error){
                console.log(error);
            });
    }
    HandleFailure(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        axios.get('http://localhost:4000/api/planning/filter/failure/'+decoded._id)
            .then(response => {
                this.setState({ drive_tests: response.data });
                this.pagesCount = Math.ceil(this.state.drive_tests.length / this.pageSize);
                console.log('drive====',this.state.drive_tests)
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


    driveTestList() {


            return this.state.drive_tests.map(function(currentTodo, i){
                for (var cpt = 0; cpt < 8; cpt++) {
                    return <DriveTest drive_test={currentTodo} key={i}/>;
                    console.log(i)
                }
            })
    }
    render() {
        const { currentPage } = this.state;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}

                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">

                                    <Col>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                                            Drive tests state
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>this.HandleData()} >All</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>this.HandleDone()} >Done Drive Tests </Dropdown.Item>
                                            <Dropdown.Item onClick={()=>this.HandlePending()}>Pending Drive Tests </Dropdown.Item>
                                            <Dropdown.Item onClick={()=>this.HandleFailure()}>Failed Driving Tests </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </Col>
                                </CardHeader>
                                <br/>

                                <div className="d-flex align-content-around flex-wrap">
                                    {
                                        this.state.drive_tests.slice(
                                            currentPage * this.pageSize,
                                            (currentPage + 1) * this.pageSize
                                        ).map(function(currentTodo, i){
                                            for (var cpt = 0; cpt < 8; cpt++) {
                                                return <DriveTest drive_test={currentTodo} key={i}/>;
                                                console.log(i)
                                            }
                                        })
                                    }


                                </div>
<br/>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
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
                                            <PaginationItem disabled={currentPage >= this.pagesCount - 1} >
                                                <PaginationLink
                                                    onClick={e => this.handleClick(e, currentPage + 1)}
                                                    next
                                                    href="#"
                                                />

                                            </PaginationItem>

                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>

                </Container>
            </>
        );
    }
}

export default RPAList;
