const express = require('express');
let DriveTest = require('../../models/drivetest.model');
const plannig_drive_tests = express.Router();
path = [];
plannig_drive_tests.route('/get_address').get(function (req, res) {
    DriveTest.find(function (err, DriveTest) {
        if (err) {
            console.log(err);
            res.status(404).send('data not found');
        } else {
            res.json(DriveTest[0]['DriveTest_Road']);
            for (var i = 0 ; i < DriveTest[0]['DriveTest_Road'].length; i++) {
                this.path.push({lat: DriveTest[0]['DriveTest_Road'][i][1], lng: DriveTest[0]['DriveTest_Road'][i][0]})
            }
              console.log(this.path);
            console.log(DriveTest);
           // console.log(DriveTest);
        }
    });
});
plannig_drive_tests.route('/get_address/:id').get(function (req, res) {
    let id = req.params.id;
    console.log("req==================",id);
    DriveTest.findById(id, function (err, DriveTest) {
        if (err) {
            //console.log(err);
            res.status(404).send('data not found');
        } else {
            res.json(DriveTest['DriveTest_Road']);
            for (var i = 0 ; i < DriveTest['DriveTest_Road'].length; i++) {
                this.path.push({lat: DriveTest['DriveTest_Road'][i][0], lng: DriveTest['DriveTest_Road'][i][1]})
            }
            //console.log(DriveTest['DriveTest_Road'][1])
            console.log(this.path);
           // console.log(DriveTest);
            // console.log(DriveTest);
        }
    });
});

plannig_drive_tests.route('/get_planning').get(function (req, res) {
    DriveTest.find(function (err, DriveTest) {
        if (err) {
            console.log(err);
            res.status(404).send('data not found');
        } else {
            res.json(DriveTest);
            console.log(DriveTest);
            // console.log(DriveTest);
        }
    });
});
plannig_drive_tests.get('/get_planning/:id', function (req, res) {
    let id = req.params.id;
   // console.log("req==================",id);

        DriveTest.findById(id, function (err, DriveTest) {
            if (err) {
                //console.log(err);
                res.status(404).send('data not found');
            } else {
                res.json(DriveTest);
            }
        });
});
plannig_drive_tests.route('/filter/pending/:id_Driver').get(function (req, res) {
    let id_Driver = req.params.id_Driver;
    var a = { $and: [ { DriveTest_State  : false }
            , { DriveTest_Done_Date  : null },{DriveTest_Driver_id: id_Driver}]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
//filter state done
plannig_drive_tests.route('/filter/done/:id_Driver').get(function (req, res) {
    let id_Driver = req.params.id_Driver;
    var a = { $and: [ { DriveTest_State  : true }
            , { DriveTest_Done_Date  :{ $exists : true } },{DriveTest_Driver_id: id_Driver}]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
//filter state failure
plannig_drive_tests.route('/filter/failure/:id_Driver').get(function (req, res) {
    let id_Driver = req.params.id_Driver;
    var a = { $and: [ { DriveTest_State  : false }
            , { DriveTest_Done_Date  :{ $ne : null } }, {DriveTest_Driver_id: id_Driver}]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
plannig_drive_tests.route('/:id_Driver').get(function (req, res) {
    let id_Driver = req.params.id_Driver;
    console.log(id_Driver)
    DriveTest.find({DriveTest_Driver_id: id_Driver},function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});


module.exports = plannig_drive_tests;
