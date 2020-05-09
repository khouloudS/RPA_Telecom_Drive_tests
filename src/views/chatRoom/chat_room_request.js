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
    Col, Form
} from "reactstrap";
import axios from "axios";
import {Link} from 'react-router-dom';
import Select from "react-select";


class ChatRoom extends React.Component {
    random_id = '0';
    listEmail = [];
    email = '';
    state = {
        selectedOption: null,
    };

    constructor(props) {
        super(props);
        // this.state = {value: ''};
        this.random_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        axios.get('http://localhost:4000/api/sendEmail/')
            .then(res => {
                    for (var i = 0; i < res.data.length; i++) {
                        this.listEmail.push({'value': res.data[i]['email'], 'label': res.data[i]['email']})
                    }
                    console.log(this.listEmail)
                }
            );


    }

    /* handleChange(event) {
         this.setState({value: event.target.value});
     }*/

    handleChange = selectedOption => {
        this.setState({selectedOption});
        console.log(`Option selected:`, selectedOption);
        this.email = selectedOption['value']
    };

    /* handleSubmit(event) {
         alert('Le nom a été soumis : ' + this.email);
         event.preventDefault();
     }
 */
    invite(event) {
        console.log(this.email)
        console.log(this.random_id)
        var mail = this.email
        var txt = this.random_id;
        console.log(txt)
        axios.get('http://localhost:4000/api/sendEmail/' + mail + '/' + txt)
            .then(res => console.log(res.data));
        // console.log( this.state.value);
    }


    render() {
        const {selectedOption} = this.state;
        const styles = {
            container: base => ({
                ...base,
                flex: 5,
                width: 400
            })
        };
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2">
                                <big>Call request</big>
                            </div>

                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <big>Search email</big>
                            </div>
                            <Form role="form">

                                <div className="text-dark">
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.listEmail}
                                    styles={styles}
                                />
                                </div>

                                <div className="text-center">
                                    <Link to={`/App/${this.random_id}`}>


                                        <Button className="mt-4" color="primary" type="button"
                                                onClick={this.invite(selectedOption)}>
                                            Invite
                                        </Button>
                                    </Link>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}

export default ChatRoom;
