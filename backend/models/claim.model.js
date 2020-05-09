const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Claim = new Schema({
    subject_claim: {
        type: String
    },
    description_claim: {
        type: String
    },
    date_claim: {
        type: Date, default: Date.now

    },
    status_claim: {
        type: Boolean ,default: false
    }
});

module.exports = mongoose.model('Claim', Claim);