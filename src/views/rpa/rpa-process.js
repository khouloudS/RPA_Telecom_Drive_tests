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
    Card,
    CardHeader,
    CardBody,
    Col
} from "reactstrap";

class RPA extends React.Component {
    start_rpa_process() {
       /* axios.get('http://localhost:4000/api/rpa')
            .then(res => console.log(res.data));
        alert('Hello!');*/
    /*   var mail = "sellamikhouloud27@gmail.com"
        var txt = "test"
        axios.get('http://localhost:4000/api/sendEmail/'+mail+'/'+txt)
            .then(res => console.log(res.data));*/
    }
    kill_rpa_process(){
       /* axios.get('http://localhost:4000/api/rpa/killProcess')
            .then(res => console.log(res.data));
        alert('Goodbye !');*/
    }
    render() {
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent">
                            <div className="text-muted text-center mt-2 mb-4">
                                <big>Robotic Process Automation</big>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center">
                                <Button
                                    className="btn-neutral btn-icon mr-4"
                                    color="default"

                                    onClick={this.start_rpa_process}
                                >
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src={"https://img.icons8.com/officel/40/000000/start.png"}
                    />
                  </span>
                                    <span className="btn-inner--text">Run</span>
                                </Button>
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"

                                    onClick={this.kill_rpa_process}
                                >
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src="https://img.icons8.com/officel/40/000000/cancel.png"
                    />
                  </span>
                                    <span className="btn-inner--text">Cancel</span>
                                </Button>



                            </div>


                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}

export default RPA;
