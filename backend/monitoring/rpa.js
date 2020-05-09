var express = require('express');
var python_rpa_process = express.Router();
let {PythonShell} = require('python-shell');
var usb_detection = require("./USB_detection_port.js");
var monitor = require('node-usb-detection');
var notify = require('./notification_alert');
var add_notification = require('./CRUD/crud_notification')
var title_notification = "Title";
var message_notification = "Description";
var icon_notification = "None";
var send_email = require("./send_email");
const { spawn } = require('child_process');
var update_driveTest_state = require('./CRUD/update_driveTest_state_RPA')

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

const python_rpa = function rpaProcess(id_drive_test) {
    title_notification = "RPA_success";
    message_notification = "Your RPA process was finished successfully and data was uploaded in Dropbox ";
    icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\businessapplication_database.ico"
    options['args'] = [title_notification,message_notification,icon_notification];
    run_python_script('rpa.py',options);
    monitor.add(function (device) {
        console.log("added device:\n", device);
        title_notification = "Success";
        message_notification = "Your device is reconnected";
        icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\process_accepting.ico"
        options['args'] = [title_notification,message_notification,icon_notification];
        run_python_script('notification.py',options);
        notify("Success", "Your device is connected");
       // run_python_script('rpa.py',options);
    });

    monitor.remove(function (device) {
        console.log("removed device:\n", device);
        title_notification = "Warring";
        message_notification = "Your device is disconnected";
        icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\process_thealert.ico"
        options['args'] = [title_notification,message_notification,icon_notification];
        run_python_script('notification.py',options);
        notify("Warring", "Your device is disconnected");
        run_python_script('stopRpa.py',options);
        add_notification(title_notification,message_notification,id_drive_test);
        update_driveTest_state(false,''+id_drive_test);

    });
    add_notification(title_notification,message_notification,id_drive_test);
    update_driveTest_state(true,''+id_drive_test);

    //update_driveTest_state(true,id_drive_test);
    //run_python_script('rpa.py',options);
};
var pid ;
python_rpa_process.route('/:id').get(function (req, res) {
    let id = req.params.id;
    console.log("----------------------------------"+id);
    const child = spawn('py',python_rpa(id));
    pid = child.pid ;
    child.on('close', (code, signal) => {
        console.log(
            `child process terminated due to receipt of signal ${signal}`);
    });
// Send SIGTERM to process
    console.log(pid);
    child.kill('SIGTERM');
    res.json('RPA is a started');
});
python_rpa_process.route('/killProcess/:id').get(function (req, res) {
    //console.log(pid);
    let id = req.params.id;
    title_notification = "RPA_stopped_manually";
    message_notification = "Your RPA process is stopped manually";
    icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\process-info.ico"
    options['args'] = [title_notification,message_notification,icon_notification];
    run_python_script('stopRpa.py',options);
    add_notification(title_notification,message_notification,id);
    update_driveTest_state(false,''+id);
    res.send('RPA is stopped manually');
});
//module.exports = python_rpa;
module.exports = python_rpa_process;


