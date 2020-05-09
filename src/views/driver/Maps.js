import React from 'react';
import {withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker, InfoWindow} from 'react-google-maps'
import axios from "axios";
import LocationIQ from 'react-native-locationiq';

import {
    Card,
    CardHeader,
    Container,
    Button,
   CardBody
} from "reactstrap";
import {Modal} from "react-bootstrap";

class Map extends React.Component {
    state = {
        progress: [],
        pathFromDatabase: [],
        show :false,
        DriveTest : '',
        query:'',
        showEval:false,
        DriveTestEval :[],
        currentPage: 0,
        sort: true,
    }

    /* pathData = [
         { lat: 36.73085422985146, lng: 10.233588491073034 },
         { lat: 36.73085422985146, lng: 10.233540808521369 },
         { lat: 36.73085422985146, lng: 10.233493125969702 },
         { lat: 36.73085422985146, lng: 10.23339775562768 },
         { lat: 36.73085422985146, lng: 10.23335007307601 },
         { lat: 36.73089244624914, lng: 10.233302390524344 },
         { lat: 36.73089244624914, lng: 10.233254707972677 },
         { lat: 36.73093066262783, lng: 10.233159337630651 },
         { lat: 36.73093066262783, lng: 10.233111655078986 },
         { lat: 36.73093066262783, lng: 10.233063972527319 },
         { lat: 36.73093066262783, lng: 10.233016284736962 },
         { lat: 36.73093066262783, lng: 10.232920919633628 },
         { lat: 36.73093066262783, lng: 10.23287323708196 },
         { lat: 36.73093066262783, lng: 10.232825554530296 },
         { lat: 36.73093066262783, lng: 10.232777866739937 },
         { lat: 36.73096887793784, lng: 10.23273018418827 },
         { lat: 36.73100709427845, lng: 10.232682501636603 },
         { lat: 36.73100709427845, lng: 10.232634819084936 },
         { lat: 36.73100709427845, lng: 10.23258713129458 },
         { lat: 36.73104531060007, lng: 10.23253944874291 },
         { lat: 36.73108352690265, lng: 10.232444083639578 },
         { lat: 36.73108352690265, lng: 10.232396401087911 },
         { lat: 36.73112174318622, lng: 10.232301030745887 },
         { lat: 36.73112174318622, lng: 10.232205665642553 },
         { lat: 36.73119817569629, lng: 10.232110295300528 },
         { lat: 36.73119817569629, lng: 10.232062612748862 },
         { lat: 36.73123639192279, lng: 10.232014930197195 },
         { lat: 36.73123639192279, lng: 10.231967247645528 },
         { lat: 36.73127460813028, lng: 10.231871877303506 },
         { lat: 36.731312823269064, lng: 10.231681141858145 },
         { lat: 36.73138925558894, lng: 10.231538094203145 },
         { lat: 36.73142747172032, lng: 10.231442723861123 },
         { lat: 36.73146568783271, lng: 10.231395041309455 },
         { lat: 36.73146568783271, lng: 10.231347358757787 },
         { lat: 36.731503903926054, lng: 10.231204305864097 },
         { lat: 36.731503903926054, lng: 10.23115662331243 },
         { lat: 36.731503903926054, lng: 10.231108940760762 },
         { lat: 36.73161855209196, lng: 10.230918205315405 },
         { lat: 36.731656767059604, lng: 10.230822834973383 },
         { lat: 36.731656767059604, lng: 10.230727469870047 },
         { lat: 36.73169498305785, lng: 10.230632099528023 },
         { lat: 36.73173319903708, lng: 10.230584416976354 },
         { lat: 36.73184784686063, lng: 10.230489051873022 },
         { lat: 36.73188606276375, lng: 10.230441364082665 },
         { lat: 36.73188606276375, lng: 10.230393681531 },
         { lat: 36.73188606276375, lng: 10.230298316427664 },
         { lat: 36.73192427864787, lng: 10.23020294608564 },
         { lat: 36.731962494512985, lng: 10.230059898430639 },
         { lat: 36.73200071035906, lng: 10.229916845536946 },
         { lat: 36.73200071035906, lng: 10.229821480433614 },
         { lat: 36.732038925136465, lng: 10.22972611009159 },
         { lat: 36.732038925136465, lng: 10.229678427539923 },
         { lat: 36.732038925136465, lng: 10.2295830571979 },
         { lat: 36.73207714094451, lng: 10.22953537464623 },
         { lat: 36.73207714094451, lng: 10.229487692094564 },
         { lat: 36.7321153567335, lng: 10.229392326991231 },
         { lat: 36.73215357250348, lng: 10.229344639200875 },
         { lat: 36.73219178825444, lng: 10.22929695664921 },
         { lat: 36.7322300039864, lng: 10.22924927409754 },
         { lat: 36.73226821969931, lng: 10.229153903755517 },
         { lat: 36.73226821969931, lng: 10.229106221203848 },
         { lat: 36.73230643539321, lng: 10.229010856100516 },
         { lat: 36.732344651068075, lng: 10.228963173548848 },
         { lat: 36.732382865674325, lng: 10.22877243810349 },
         { lat: 36.73242108131117, lng: 10.228581702658133 },
         { lat: 36.732459296928994, lng: 10.228486332316109 },
         { lat: 36.732459296928994, lng: 10.228390967212775 },
         { lat: 36.732459296928994, lng: 10.228343284661108 },
         { lat: 36.732535728107536, lng: 10.228247914319086 },
         { lat: 36.73257394366827, lng: 10.22815254921575 },
         { lat: 36.73257394366827, lng: 10.228057178873726 },
         { lat: 36.73261215921002, lng: 10.227914131218725 },
         { lat: 36.73265037473273, lng: 10.227818760876703 },
         { lat: 36.73268859023639, lng: 10.227723395773367 },
         { lat: 36.732726804671444, lng: 10.227675713221702 },
         { lat: 36.73276502013708, lng: 10.227628025431343 },
         { lat: 36.7328032355837, lng: 10.227580342879676 },
         { lat: 36.732841451011296, lng: 10.22753266032801 },
         { lat: 36.732841451011296, lng: 10.22743729260533 },
         { lat: 36.732879666419876, lng: 10.227389607434317 },
         { lat: 36.73291788180943, lng: 10.22734192488265 },
         { lat: 36.73295609717995, lng: 10.22729423971164 },
         { lat: 36.732994312531474, lng: 10.227246557159972 },
         { lat: 36.732994312531474, lng: 10.227198874608304 },
         { lat: 36.732994312531474, lng: 10.227151189437294 },
         { lat: 36.732994312531474, lng: 10.227103506885626 },
         { lat: 36.73303252786394, lng: 10.22700813916295 },
         { lat: 36.73303252786394, lng: 10.226960453991934 },
         { lat: 36.73310895742226, lng: 10.22681740371759 },
         { lat: 36.7331471726977, lng: 10.22676972116592 },
         { lat: 36.7331471726977, lng: 10.22672203599491 },
         { lat: 36.733185387954094, lng: 10.226626668272232 },
         { lat: 36.733185387954094, lng: 10.226578985720563 },
         { lat: 36.733223603191476, lng: 10.226531300549551 },
         { lat: 36.733223603191476, lng: 10.226483617997886 },
         { lat: 36.733223603191476, lng: 10.226435932826874 },
         { lat: 36.73330003360914, lng: 10.22634056772354 },
         { lat: 36.73330003360914, lng: 10.22624520000086 },
         { lat: 36.73333824878948, lng: 10.226197514829849 },
         { lat: 36.73337646395079, lng: 10.226149832278182 }
     ]*/

    path = [
        {lat: 36.81477236601238, lng: 10.189578804217952},
        {lat: 36.81477236601238, lng: 10.189650329355125},
        {lat: 36.81477236601238, lng: 10.189674171940629},
        {lat: 36.81477236601238, lng: 10.189698013216464},
        {lat: 36.814810540600746, lng: 10.189817222214975},
        {lat: 36.81482962841204, lng: 10.189841064800483},
        {lat: 36.814848715170086, lng: 10.18988874866182},
        {lat: 36.8148868897204, lng: 10.189960273798995},
        {lat: 36.81490597751265, lng: 10.189984115074827},
        {lat: 36.81492506425167, lng: 10.190007957660335},
        {lat: 36.81494415098594, lng: 10.190031798936168},
        {lat: 36.814963238763895, lng: 10.190055641521674},
        {lat: 36.81498232548864, lng: 10.190079482797508},
        {lat: 36.81500141325708, lng: 10.190103325383012},
        {lat: 36.81502049997232, lng: 10.190103325383012},
        {lat: 36.81507776218638, lng: 10.19015100793468},
        {lat: 36.81511593557394, lng: 10.190174850520187},
        {lat: 36.81513502330911, lng: 10.190174850520187},
        {lat: 36.81515410999101, lng: 10.190198691796018},
        {lat: 36.81523045876796, lng: 10.19024637565736},
        {lat: 36.81524954647455, lng: 10.190270218242865},
        {lat: 36.8152686331279, lng: 10.190294059518699},
        {lat: 36.8153068074688, lng: 10.190317902104203},
        {lat: 36.815344981790645, lng: 10.190389427241378},
        {lat: 36.815383156093446, lng: 10.190437111102717},
        {lat: 36.815421329852995, lng: 10.190460952378551},
        {lat: 36.81545950411771, lng: 10.19050863623989},
        {lat: 36.81547859124295, lng: 10.190532478825395},
        {lat: 36.81549767836343, lng: 10.19055632010123},
        {lat: 36.81549767836343, lng: 10.190604003962568},
        {lat: 36.815516765479146, lng: 10.190627845238405},
        {lat: 36.8155358525901, lng: 10.190651687823909},
        {lat: 36.81557402627347, lng: 10.190699371685248},
        {lat: 36.815593113370156, lng: 10.190723212961082},
        {lat: 36.81561220046207, lng: 10.19074705554659},
        {lat: 36.81563128754922, lng: 10.190770896822421},
        {lat: 36.81563128754922, lng: 10.190794738098255},
        {lat: 36.81566946170928, lng: 10.190890105820934},
        {lat: 36.815707635850245, lng: 10.19091394840644},
        {lat: 36.81572672238936, lng: 10.190937789682273},
        {lat: 36.81578398355089, lng: 10.191009314819446},
        {lat: 36.81580307059521, lng: 10.19103315740495},
        {lat: 36.81582215763477, lng: 10.19103315740495},
        {lat: 36.815841244669585, lng: 10.191056998680786},
        {lat: 36.81586033169961, lng: 10.191056998680786},
        {lat: 36.815898505221185, lng: 10.191104682542125},
        {lat: 36.81591759223693, lng: 10.191128525127631},
        {lat: 36.81597485325567, lng: 10.191152366403465},
        {lat: 36.8159939402524, lng: 10.191152366403465},
        {lat: 36.81607028766746, lng: 10.191176208988972},
        {lat: 36.8161466355306, lng: 10.191176208988972},
        {lat: 36.816203896378, lng: 10.191223891540638},
        {lat: 36.816261156658314, lng: 10.191271575401977},
        {lat: 36.81631841742005, lng: 10.191295417987483},
        {lat: 36.816375678138925, lng: 10.191343101848823},
        {lat: 36.81639476503571, lng: 10.191366943124656},
        {lat: 36.81639476503571, lng: 10.191390785710162},
        {lat: 36.81639476503571, lng: 10.191438469571501},
        {lat: 36.81639476503571, lng: 10.191462310847333},
        {lat: 36.81639476503571, lng: 10.191509994708674},
        {lat: 36.816432938290745, lng: 10.191629203707185},
        {lat: 36.81647111205095, lng: 10.191700728844358},
        {lat: 36.816509285792165, lng: 10.191843780428377},
        {lat: 36.8165283726556, lng: 10.191962989426889},
        {lat: 36.81658563321743, lng: 10.192034515873734},
        {lat: 36.816642893212176, lng: 10.192153724872249},
        {lat: 36.816681066867716, lng: 10.192249092594926},
        {lat: 36.816700153688316, lng: 10.1923206177321},
        {lat: 36.816757414121625, lng: 10.19236830159344},
        {lat: 36.81679558719581, lng: 10.19241598545478},
        {lat: 36.816852847557755, lng: 10.192439826730613},
        {lat: 36.816891021108546, lng: 10.192487510591953},
        {lat: 36.81692919464032, lng: 10.192511353177457},
        {lat: 36.816948280874826, lng: 10.192559035729124},
        {lat: 36.81700554112254, lng: 10.192582878314632},
        {lat: 36.81704371459719, lng: 10.192606719590465},
        {lat: 36.81706280132738, lng: 10.192606719590465},
        {lat: 36.817120060965195, lng: 10.192630562175971},
        {lat: 36.817139147676315, lng: 10.192654403451805},
        {lat: 36.81719640778121, lng: 10.192654403451805},
        {lat: 36.81721549447333, lng: 10.192654403451805},
        {lat: 36.81725366784332, lng: 10.192678246037309},
        {lat: 36.81729184066997, lng: 10.192678246037309},
        {lat: 36.81731092733828, lng: 10.192678246037309},
        {lat: 36.817330014001854, lng: 10.192678246037309},
        {lat: 36.817349100660635, lng: 10.192702087313144},
        {lat: 36.817368187314685, lng: 10.192725929898648},
        {lat: 36.8174063606085, lng: 10.192773612450315},
        {lat: 36.81742544724824, lng: 10.192797455035823},
        {lat: 36.81742544724824, lng: 10.192821296311656},
        {lat: 36.81742544724824, lng: 10.192868980172996},
        {lat: 36.81744453388325, lng: 10.192916664034335},
        {lat: 36.81746361998927, lng: 10.192940506619841},
        {lat: 36.817482706614754, lng: 10.193012031757014},
        {lat: 36.817501793235465, lng: 10.193035873032848},
        {lat: 36.81753996646263, lng: 10.193059715618354},
        {lat: 36.81755905306906, lng: 10.193083556894187},
        {lat: 36.81759722626768, lng: 10.193107399479691},
        {lat: 36.817616312859826, lng: 10.193131240755527},
        {lat: 36.817654485505656, lng: 10.193155083341033},
        {lat: 36.822941269910814, lng: 10.198781761953349}

    ]

    velocity = 5
    initialDate = new Date()
    color = "";
    polylineDrawGreen;
    polylineDrawRed = [];
    arr = [];
    markerRed = [];
    imageFlag = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    image = 'https://img.icons8.com/flat_round/20/000000/error--v1.png';
    imageCar = 'https://img.icons8.com/offices/30/000000/rv-campground.png';
    imagex = 'https://img.icons8.com/doodle/16/000000/delete-sign.png'
    get_address_lat_lng_start = [];
    get_address_lat_lng_end = [];
    polynedatabase;
    plannig_state = true;
    process_title = null;
    start_reverse_address= [];
    end_reverse_address= [];
    start_address = null;
    end_address = null;
    constructor(props){
        super(props);
    }
    HandleModal() {
        this.setState({
            show: !this.state.show
        });
    }
    HandleModalEval(){
        this.setState({
                showEval: !this.state.showEval
            }
        );

    }

    getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds
        return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }
    componentDidMount = () => {
        console.log(window.location.href)
        var str = window.location.href;
        var res;
        res = str.search("maps/") + 5;
        var re = str.substr(res, str.length - 1);
        console.log(re)
        this.interval = window.setInterval(this.moveObject, 1000)
        axios.get(`http://localhost:4000/api/planning/get_address/` + re)
            .then(response => {
                this.setState({get_address: response.data});
                console.log(response.data);
                this.get_address_lat_lng_start.push({lat: response.data[0][0], lng: response.data[0][1]})
                this.get_address_lat_lng_end.push({
                    lat: response.data[response.data.length - 1][0],
                    lng: response.data[response.data.length - 1][1]
                })

                for (var i = 0; i < response.data.length; i++) {
                    this.state.pathFromDatabase.push({lat: response.data[i][0], lng: response.data[i][1]})
                }

                this.polynedatabase = <Polyline path={this.state.pathFromDatabase} options={{strokeColor: "#FF0000"}}/>
                console.log(this.get_address_lat_lng_end);
                console.log(this.get_address_lat_lng_start);

                LocationIQ.init("d2eee4724fae22"); // use a valid API key
                 LocationIQ.reverse(this.get_address_lat_lng_start[0]['lat'], this.get_address_lat_lng_start[0]['lng'])
                     .then(json => {
                         this.start_reverse_address.push(json.address);
                         this.start_address = this.start_reverse_address[0]['county'] +" "+ this.start_reverse_address[0]['state_district']+" "+this.start_reverse_address[0]['state'] +", "+ this.start_reverse_address[0]['country'];
                     })
                     .catch(error => console.warn(error));
                 LocationIQ.reverse(this.get_address_lat_lng_end[0]['lat'], this.get_address_lat_lng_end[0]['lng'])
                     .then(json => {
                         this.end_reverse_address.push(json.address);
                         this.end_address = this.end_reverse_address[0]['county'] +" "+ this.end_reverse_address[0]['state_district']+" "+this.end_reverse_address[0]['state'] +", "+ this.end_reverse_address[0]['country'];

                         console.log(this.end_reverse_address[0]);
                     })
                     .catch(error => console.warn(error));

            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/api/planning/get_planning/' + re)
            .then(res => {
                this.plannig_state = res.data['DriveTest_State'];
                this.process_title = res.data['DriveTest_Title'];

            });
       // lat: 36.822941269910814, lng: 10.198781761953349

    }

    start_rpa_process() {
        var str = window.location.href;
        var res;
        res = str.search("maps/") + 5;
        var re = str.substr(res, str.length - 1);
        console.log(re)
        axios.get('http://localhost:4000/api/rpa/' + re)
            .then(res => console.log(res.data));
    }

    kill_rpa_process() {
        var str = window.location.href;
        var res;
        res = str.search("maps/") + 5;
        var re = str.substr(res, str.length - 1);
        console.log(re)
        axios.get('http://localhost:4000/api/rpa/killProcess/' + re)
            .then(res => console.log(res.data));
    }

    componentWillUnmount = () => {
        window.clearInterval(this.interval)
    }

    moveObject = () => {
        const distance = this.getDistance()
        if (!distance) {
            return
        }
        /*function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }*/
        let progress = this.path.filter(coordinates => coordinates.distance < distance)
        const nextLine = this.path.find(coordinates => coordinates.distance > distance)
        var random = 0;
        var count = 0;
        //var markerGreen;
        if (!nextLine) {
            this.setState({progress});
            return // it's the end!
        }
        const lastLine = progress[progress.length - 1];
        const lastLineLatLng = new window.google.maps.LatLng(
            lastLine.lat,
            lastLine.lng
        );
        const nextLineLatLng = new window.google.maps.LatLng(
            nextLine.lat,
            nextLine.lng
        );
        // distance of this line
        const totalDistance = nextLine.distance - lastLine.distance
        const percentage = (distance - lastLine.distance) / totalDistance
        const position = window.google.maps.geometry.spherical.interpolate(
            lastLineLatLng,
            nextLineLatLng,
            percentage
        );

        if (count % 5 === 0) {
            random = Math.random();
            if (random < 0.5) {
                random = Math.floor(random)
            } else {
                random = Math.ceil(random)
            }
            if (random === 0) {
                console.log("red");
                // this.polylineDrawRed =   <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000"}} />
                //console.log(position.lat()+" , "+ position.lng())
                this.arr.push({lat: position.lat(), lng: position.lng()});
                this.markerRed.push(<Marker position={this.arr[1]}/>);
                progress = progress.concat(position);
                this.setState({progress});
            } else {
                console.log("green")
                this.polylineDrawGreen = <Polyline path={this.state.progress} options={{strokeColor: "#9efd38 "}}/>
                var prg = [];
                var start = this.state.progress[0]
                var end = this.state.progress[this.state.progress.length - 2]
                prg.push(start);
                prg.push(end);
                console.log(this.state.progress[0])
                console.log(this.state.progress[this.state.progress.length - 2])
                console.log(prg)
                this.polylineDrawRed.push({lat: position.lat(), lng: position.lng()});
                // this.polylineDrawRed.push(prg)
                // console.log(this.polylineDrawRed)
                progress = progress.concat(position);
                //  this.setState({progress});
                console.log(!nextLine);

            }
            this.setState({progress});
            console.log(random);
            //sleep(1000)
            // console.log(this.state.progress)
        }
        //this.setState({ progress });
    }

    componentWillMount = () => {
        this.path = this.path.map((coordinates, i, array) => {
                if (i === 0) {
                    return {...coordinates, distance: 0} // it begins here!
                }
                const {lat: lat1, lng: lng1} = coordinates
                const latLong1 = new window.google.maps.LatLng(lat1, lng1)

                const {lat: lat2, lng: lng2} = array[0]
                const latLong2 = new window.google.maps.LatLng(lat2, lng2)

                // in meters:
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    latLong1,
                    latLong2
                );
                return {...coordinates, distance}
            }
        );

    }
    render = () => {
        console.log(this.state.pathFromDatabase)
        console.log(this.plannig_state)
        console.log(this.start_reverse_address[0]);
        return (
            <Container>
                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{
                        lat: 36.822941269910814, lng: 10.198781761953349
                    }}
                >
                    {
                        this.state.progress && (
                            <>
                                <Marker position={this.get_address_lat_lng_start[0]} icon={this.imageFlag}>
                                <InfoWindow
                                    key={`infowindow-${this.get_address_lat_lng_start[0]}`}
                                    visible={true}>
                                    <div>{this.start_address}</div>
                                </InfoWindow>
                                </Marker>

                                <Marker position={this.get_address_lat_lng_end[0]} icon={this.imageFlag}>
                                <InfoWindow
                                    key={`infowindow-${this.get_address_lat_lng_end[0]}`}
                                    visible={true}>
                                    <div>{this.end_address}</div>
                                </InfoWindow>
                                </Marker>
                                {this.polylineDrawGreen}
                                {this.polylineDrawRed}
                                {this.polynedatabase}
                                <Polyline path={this.path} options={{strokeColor: "#fefaff"}}/>
                                <Marker position={this.state.progress[this.state.progress.length - 1]}
                                        icon={this.imageCar}/>
                                {this.arr.map((value, index) => {
                                    return <Marker position={this.arr[index]}
                                                   icon={this.image}
                                    />
                                })}
                                {this.arr.map((valuePin, indexPin) => {
                                    return <Marker position={this.polylineDrawRed[indexPin]}
                                                   icon={this.imagex}
                                    />
                                })}
                            </>
                        )
                    }
                </GoogleMap>

                <div className="row justify-content-md-center">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent row justify-content-md-center">
                        <div className="text-muted text-center mt-2">
                           <big> {this.process_title}</big>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center">
                            <Button
                                className="btn-neutral btn-icon mr-4"
                                color="default"
                                disabled={this.plannig_state}
                                onClick={this.start_rpa_process}>
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src={"https://img.icons8.com/officel/40/000000/start.png"}/>
                  </span>
                                <span className="btn-inner--text">Run</span>
                            </Button>
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                onClick={this.kill_rpa_process} >
                  <span className="btn-inner--icon">
                    <img alt="..."
                        src="https://img.icons8.com/officel/40/000000/cancel.png"/>
                  </span>
                                <span className="btn-inner--text">Cancel</span>
                            </Button>
                        </div>
                    </CardBody>
                </Card></div>

                <Modal show={this.state.show} onHide={()=>this.HandleModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h2>CANCEL CONFIRMATION </h2>
                        </Modal.Title >
                    </Modal.Header>
                    <Modal.Body>
                        <h4> Are You sure You want to cancel this drive test ? </h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="danger" onClick={this.kill_rpa_process} >
                            Confirm
                        </Button>
                        <Button color="default"  onClick={()=>this.HandleModal()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal  show={this.state.showEval} onHide={()=>this.HandleModalEval()}>
                    <Modal.Header closeButton>
                        <Modal.Title >
                            <h2>START CONFIRMATION </h2>
                        </Modal.Title >
                    </Modal.Header>
                    <Modal.Body>
                        <h4> Are You sure You want to start this drive test ? </h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="danger" onClick={this.start_rpa_process} >
                            Confirm
                        </Button>
                        <Button color="default"  onClick={()=>this.HandleModal()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        )
    }
}
const MapComponent = withScriptjs(withGoogleMap(Map))

export default () => (
    <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `500px`, width: '100%'}}/>}
        mapElement={<div style={{height: `120%`}}/>}
    />
)
