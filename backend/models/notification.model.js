const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Notifications = new Schema({
    notification_type: {
        type: String
    },
    notification_description: {
        type: String
    },
    notification_created_at: {
        type: String
    }
});

module.exports = mongoose.model('Notification', Notifications);
