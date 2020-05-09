import React, { Component } from 'react';
import './App_chat.css';
import Messages from "./Messages";
import Input from "./Input";
import {Container} from "reactstrap";
import Header from "../Headers/Header_RPA";
import $ from "jquery";
import jwt_decode from "jwt-decode";
const Scaledrone = require('scaledrone-react-native');

function randomName() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
  /*  const adjectives = [
        "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
        "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
        "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
        "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
        "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
        "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
        "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
        "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
        "ancient", "purple", "lively", "nameless"
    ];
    const nouns = [
        "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
        "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
        "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
        "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
        "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
        "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
        "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
        "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
        "smoke", "star"
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;*/
  return decoded.first_name;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App_chat extends Component {
     time = 0 ;

    convertDate() {
        var today = new Date(Date.now());
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return  date+' '+time;
    }

    state = {
        messages: [],
        member: {
            username: randomName(),
            color: randomColor(),
        }
    }

    constructor() {
        super();

       this.drone = new Scaledrone("eiAjk0Vv7MzXdvGN", {
            data: this.state.member
        });
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = {...this.state.member};
           // console.log(member)
            member.id = this.drone.clientId;
            this.setState({member});
        });
        const room = this.drone.subscribe("observable-room");
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data, time:this.convertDate()});
            this.setState({messages});
            this.time = messages[messages.length-1]['time']
            console.log(messages)
        });
       /* const drone = new Scaledrone('eiAjk0Vv7MzXdvGN');
        drone.on('error', error => {
            console.error('Error with connection:', error);
        });
        drone.on('close', event => {
            console.log('Connection closed:', event);
        });

        const room = drone.subscribe('my-room');
        room.on('message', message => console.log('Received data:', message.data));*/
    }
    componentDidMount() {
        $(function(){
            $(".c_h").click(function(e) {
                if ($(".chat_container").is(":visible")) {
                    $(".c_h .right_c .mini").text("+");
                } else {
                    $(".c_h .right_c .mini").text("-");

                }
                $(".chat_container").slideToggle("slow");

                return false;
            });
        });
    }

    render() {
        return (
            <div className="App">
                < div className = "l_c_h" >
                    < div className = "c_h" >
                        < div className = "left_c" >
                            < div className = "left right_c left_icons" >
                                < a href = "#" className = "mini"> +</a>
                            </div>
                            <div className="left center_icons">
                                Chat
                            </div>
                        </div>
                        <div className="right right_c" >

                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="chat_container displaydiv ex3">
                        <Messages
                            messages={this.state.messages}
                            currentMember={this.state.member}
                            time={this.time}
                        />

                    </div>
                    <div className="set_bottom">
                        <Input className="footer_c "
                               onSendMessage={this.onSendMessage}
                        />
                    </div>
                </div>
            </div>
        );
    }

    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message
        });
    }

}

export default App_chat;
