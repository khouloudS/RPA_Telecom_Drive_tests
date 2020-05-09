const express = require('express');
const app = express();
const { spawn } = require('child_process');
const DriverRoutes = express.Router();
let DriveTest = require('../models/drivetest.model');
const User = require('../models/user.model')
DriverRoutes.route('/').get(function (req, res) {
    var a = {  role  : "Driver" }
    User.find(a,function (err, User) {
        if (err) {
            console.log(err);
        } else {

            res.json(User);
        }
    });
});
DriverRoutes.route('/CheckAvibility/:Date/:id_Driver').get(function (req, res) {
    let date = req.params.Date;
    let id_Driver = req.params.id_Driver;
    console.log(date)
    var a = { $and: [ {  DriveTest_Start_Time  : date } ,{DriveTest_Driver_id: id_Driver}]}
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {

            res.json(DriveTest);
        }
    });
});
DriverRoutes.route('/driver/:idDriver').get(function (req, res) {

    let id_Driver = req.params.idDriver;
    var a = { _id : id_Driver}
    User.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {

            res.json(DriveTest);
        }
    });
});

module.exports = DriverRoutes;
