const express = require('express');
//const notification_route = express.Router();
let Notifications = require('../../models/notification.model');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pidev:pidev@drivetest-fv0if.mongodb.net/test?retryWrites=true&w=majority";
/*notification_route.route('/rpa').post(function (req, res) {
    let notificationRoute = new Notifications(req.body);
    notificationRoute.save().then(notificationRoute => {
        res.status(200).json({'notificationRoute': 'notificationRoute added successfully'});
    })
        .catch(err => {
            res.status(400).json({'notificationRoute': 'notificationRoute added failed'});
        })
});
*/

const add_notification = function addNotification(title,description,id_drive_test) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        let dateTime = Date.now();
        var myobj = {
            notification_type: title,
            notification_description: description,
            notification_created_at: dateTime,
            id_drive_test : id_drive_test
        };
        dbo.collection("notifications").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("notification document inserted");
            db.close();
        });
    });
}
module.exports = add_notification;
