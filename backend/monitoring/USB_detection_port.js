var monitor = require('node-usb-detection');
var notify = require('./notification_alert');
var detection = "true";
var usbDetect = require('usb-detection');
let {PythonShell} = require('python-shell');
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
const usb_detection = function usbDetection() {
    /*monitor.add(function (device) {
        //console.log("added device:\n", device);
    });
    monitor.remove(function (device) {
       // console.log("removed device:\n", device);
    });

    monitor.change(function (device) {
       // console.log("device changed:\n", device);
       // monitor.list()
        console.log("Usb Devices:\n", monitor.list().length);

    });*/
    usbDetect.startMonitoring();
// Detect add/insert
    usbDetect.on('add', function(device) {
        console.log('add', device);
    });
// Detect remove
    usbDetect.on('remove', function(device) {
        title_notification = "Failed";
        message_notification = "Your device is disconnected";
        icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\process_thealert.ico"
        options['args'] = [title_notification,message_notification,icon_notification];
        console.log('remove', device);
            run_python_script('bip.py', options);
    });

// Detect add or remove (change)
  //  usbDetect.on('change', function(device) { console.log('change', device); });


// Get a list of USB devices on your system, optionally filtered by `vid` or `pid`
  //  usbDetect.find(function(err, devices) { console.log('find', devices, err); });

// Promise version of `find`:
  /*  usbDetect.find().then(function(devices) {
        console.log(devices);
    }).catch(function(err) {
        console.log(err);
    });*/

};
module.exports = usb_detection;
