const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

const fileUpload = require('express-fileupload');
const DriverRoutes = require("./routes/driveTestDrivers");
const ClaimRoutes = require("./routes/claim");
const DriveTestRoutes = require("./routes/driveTest");
const UserRoutes = require("./routes/users")

var internetAvailable = require("internet-available");

var notify = require('./monitoring/notification_alert');
const todoRoutes = require("./routes/todo");
var usb_detection = require("./monitoring/USB_detection_port");
var python_rpa_process = require("./monitoring/rpa");
var plannig_drive_tests = require("./monitoring/CRUD/crud_planning_drive_tests")
var send_email = require("./monitoring/chat_room")
var update_rpa_state = require("./monitoring/CRUD/update_driveTest_state_RPA")
var statistics = require("./routes/statistiques")
const twilio = require("twilio");
require("dotenv").config();
const Chance = require('chance')
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant
const chance = new Chance()
app.use(cors());
app.use(bodyParser.json());
let {PythonShell} = require('python-shell');
mongoose.connect('mongodb+srv://pidev:pidev@drivetest-fv0if.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const connection = mongoose.connection;
var title_notification = "Title";
var message_notification = "Description";
var icon_notification = "None";
let options = {
    mode: 'text',
    pythonPath: 'C:\\Windows\\py.exe',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: 'C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\backend\\monitoring\\python_RPA_scripts',
    args: [title_notification,message_notification,icon_notification]
};
const run_python_script = function runPythonScript(path,options) {
    PythonShell.run(path, options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
}


connection.once('open', function () {
    console.log('MongoDb connection estableshed successfully!');
});
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
function sayHi() {

}

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
    usb_detection();
    //console.log(usb_detection());
   // python_rpa();
    internetAvailable({
        domainName: "ourcodeworld.com",
        port: 53,
        host: '8.8.8.8',
    }).then(() => {
        notify("Internet Connexion ","Internet available")
        console.log("Internet available");
    }).catch(() => {
        notify("Internet Connexion ","Internet not available")
        console.log("No internet");
    });
    title_notification = "No Internet Connexion";
    message_notification = "Internet not available";
    icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\process_thealert.ico"
    options['args'] = [title_notification,message_notification,icon_notification];
    run_python_script('check_connexion.py',options);


});
app.get("/token", (req, res) => {
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_SECRET
    );
    token.addGrant(new VideoGrant());
    token.identity = req.query.user;
   /* res.send({ token: token.toJwt() });
    console.log(token);*/
    token.identity = chance.name()
    token.addGrant(new ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    }))
    res.send({
       // identity: token.identity,
       // identity : token.identity,
        token: token.toJwt()
    })
console.log(token);
});

app.use("/api/todo", todoRoutes);
app.use("/api/rpa", python_rpa_process);
app.use("/api/planning", plannig_drive_tests);
app.use("/api/sendEmail", send_email);
app.use("/api/statistics", statistics);
app.use("/api/driveTestDrivers", DriverRoutes);
app.use("/api/claim", ClaimRoutes);
app.use("/api/driveTest",DriveTestRoutes);
app.use("/api/Users",UserRoutes);
module.exports = app;
