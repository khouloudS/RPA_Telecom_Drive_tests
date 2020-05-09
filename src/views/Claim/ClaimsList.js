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
    Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import axios from "axios";
const Claim = props => (

    <tr>
        <td>{props.claim.subject_claim}</td>
        <td>{props.claim.description_claim}</td>
        <td>{props.claim.date_claim}</td>



    </tr>
);
class ClaimsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {claims: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/claim')
            .then(response => {
                this.setState({ claims: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    ClaimList() {
        return this.state.claims.map(function(currentClaim, i){
            return <Claim claim={currentClaim} key={i} />;
        })
    }

    render() {
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
                        <div className="header-body">
                            {/* Card stats */}
                            <Row>
                                <div className="col">
                                    <Card className="shadow">
                                        <CardHeader className="border-0">
                                            <h3 className="mb-0">Your Claim List</h3>
                                        </CardHeader>
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Date </th>
                                                <th scope="col">Satus</th>
                                                <th scope="col" />
                                            </tr>
                                            </thead>
                                       <tbody>   { this.ClaimList() }</tbody>
                                        </Table>
                                        <CardFooter className="py-4">
                                            <nav aria-label="...">
                                                <Pagination
                                                    className="pagination justify-content-end mb-0"
                                                    listClassName="justify-content-end mb-0"
                                                >
                                                    <PaginationItem className="disabled">
                                                        <PaginationLink
                                                            href="#pablo"
                                                            onClick={e => e.preventDefault()}
                                                            tabIndex="-1"
                                                        >
                                                            <i className="fas fa-angle-left" />
                                                            <span className="sr-only">Previous</span>
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem className="active">
                                                        <PaginationLink
                                                            href="#pablo"
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            1
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href="#pablo"
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            2 <span className="sr-only">(current)</span>
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href="#pablo"
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            3
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href="#pablo"
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            <i className="fas fa-angle-right" />
                                                            <span className="sr-only">Next</span>
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </Pagination>
                                            </nav>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        );
    }
}

export default ClaimsList;
