const express = require('express');
let DriveTest = require('../models/drivetest.model');
const statistics = express.Router();
path = [];
statistics.route('/failed_drive_test').get(function (req, res) {
    var a = { $and: [ { DriveTest_State  : false }
            , { DriveTest_Done_Date  :{ $ne : null } }]}  ;
    DriveTest.count(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
            console.log(DriveTest)
        }
    });
});
statistics.route('/done_drive_test').get(function (req, res) {
    var a = { $and: [ { DriveTest_State  : true }
            , { DriveTest_Done_Date  :{ $exists : true } }]}  ;
    DriveTest.count(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
statistics.route('/pending_drive_test').get(function (req, res) {
    var a = { $and: [ { DriveTest_State  : false }
            , { DriveTest_Done_Date  : null }]}  ;
    DriveTest.count(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
statistics.route('/done_drive_test_by_date').get(function (req, res) {
    var a = { $and: [ { DriveTest_State  : true }
            , { DriveTest_Done_Date  :{ $exists : true } }]
            }  ;
   var b =
       [
           {
               $group: {
                   _id: {
                       month: { $month: "$DriveTest_Done_Date" },
                       day: { $dayOfMonth: "$DriveTest_Done_Date" },
                       year: { $year: "$DriveTest_Done_Date" },
                       DriveTest_State  : "$DriveTest_State"
                   },
                   count: { $sum: 1 },



               }
           }
       ]

    DriveTest.aggregate(b,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
module.exports = statistics;
