const express = require('express');
var email = express.Router();
send_email = require('./send_email');
const User = require("../models/user.model");

email.route('/:email/:text').get(function (req, res) {
    let email = req.params.email;
    let text = req.params.text
    send_email(email, "Call request", text);
    res.send();
});
email.route('/').get(function (req, res) {
    User.find(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

module.exports = email;
