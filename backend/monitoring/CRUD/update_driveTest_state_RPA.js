const express = require('express');
let DriveTest = require('../../models/drivetest.model');
const update_rpa_state = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pidev:pidev@drivetest-fv0if.mongodb.net/test?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;

//Update state (management)

var update_driveTest_state = function updateDriveTestState(rpa_state,id_drive_test) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        //var myquery = { _id: id_drive_test }
        var date = new Date(Date.now());
        console.log(date);
        var newvalues = { $set:{"DriveTest_State": rpa_state, "DriveTest_Done_Date": date}};

        dbo.collection("drivetests").update({"_id": ObjectId(id_drive_test)}, newvalues, function(err, res) {
            if (err) throw err;
            console.log(id_drive_test);
            console.log("1 document updated");
            db.close();
        });
      /*  dbo.collection("drivetests").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });*/
    });
}

module.exports = update_driveTest_state
