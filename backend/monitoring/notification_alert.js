const notifier = require('node-notifier');
const path = require('path');
const notify = function notification(title, message) {
    notifier.notify(
        {
            title: title,
            message: message,
            icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait
        },
        function (err, response) {
            // Response is response from notification
        }
    );
    notifier.on('click', function (notifierObject, options, event) {
        // Triggers if `wait: true` and user clicks notification
    });
    notifier.on('timeout', function (notifierObject, options) {
        // Triggers if `wait: true` and notification closes
    });
};

module.exports = notify;
