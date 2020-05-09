import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import CanvasJSReact from '../../assets/css/canvasjs.react';
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class statistics extends React.Component {
   state = {
        drive_tests : [],
    }
    drive_test_done = [];
   drive_test_failed = []
    constructor(props){
        super(props);
        this.state = {
            activeNav: 1,
            chartExample1Data: "data1"
        };
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }
    toggleNavs = (e, index) => {
        e.preventDefault();
        this.setState({
            activeNav: index,
            chartExample1Data:
                this.state.chartExample1Data === "data1" ? "data2" : "data1"
        });
    };
     convertDate(today) {
        today = new Date(today);
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return  date+' '+time;
    }
    componentDidMount() {
        axios.get('http://localhost:4000/api/statistics/done_drive_test_by_date')
            .then(response => {
                this.setState({ drive_tests: response.data });
                this.drive_tests = response.data;
                console.log(this.drive_tests)
                for(var i = 0 ; i<response.data.length; i++) {
                    if (response.data[i]['_id']['DriveTest_State']== true){
                        var today = new Date(response.data[i]['_id']['year'],response.data[i]['_id']['month']-1,response.data[i]['_id']['day']);
                        this.drive_test_done.push(
                            {

                            x:today,
                            y: response.data[i]['count']
                        }
                        )
                    }
                    else if (response.data[i]['_id']['DriveTest_State']== false && response.data[i]['_id']['year']!= null){
                        var today = new Date(response.data[i]['_id']['year'],response.data[i]['_id']['month']-1,response.data[i]['_id']['day']);
                        this.drive_test_failed.push(
                            {
                                x:today,
                                y: response.data[i]['count']
                            }
                        )
                    }
                }
            })
            .catch(function (error){
                console.log(error);
            });

    }

    render() {
        console.log(this.drive_test_failed)

        const options = {
            theme: "light2",
            animationEnabled: true,
            title:{
                text: "Number of done and failed test"
            },
            subtitles: [{
                text: "per day"
            }],
            axisX: {
                title: "date"
            },
            axisY: {
                title: "Number",
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                labelFontColor: "#6D78AD",
                tickColor: "#6D78AD",
                includeZero: false
            },
            axisY2: {
                title: "Profit in USD",
                titleFontColor: "#ff8f32",
                lineColor: "#ff8f32",
                labelFontColor: "#ff8f32",
                tickColor: "#ff8f32",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [
                {
                type: "spline",
                name: "Done",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#",
                dataPoints: this.drive_test_done

            },
                {
                    type: "spline",
                    name: "Failed",
                   axisYType: "primary",
                    showInLegend: true,
                   xValueFormatString: "MMM YYYY",
                    yValueFormatString: "#",
                    dataPoints: this.drive_test_failed
                }
                ]
        }
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="mb-5 mb-xl-0" xl="8">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Page visits</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                size="sm"
                                            >
                                                See all
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>

                                <div>
                                    <CanvasJSChart options = {options}
                                                   onRef={ref => this.chart = ref}
                                    />
                                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                                </div>
                            </Card>
                        </Col>

                    </Row>

                </Container>
            </>
        );
    }
}

export default statistics;
