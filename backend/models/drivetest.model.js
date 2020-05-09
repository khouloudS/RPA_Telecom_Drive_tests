const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DriveTest = new Schema({
    DriveTest_Title:{
        type: String
    },
    DriveTest_Description: {
        type: String
    },
    DriveTest_State: {
        type: Boolean, default: false
    },
    DriveTest_Set_Date: {
        type: Date, default: Date.now
    },

    DriveTest_Done_Date: {
        type: Date, default: null
    },
    DriveTest_Start_Time: {
        type: Date
    },

    DriveTest_File: {
        type: String
    },
    DriveTest_Road: {
        type: Array

    },
    DriveTest_Driver_id: {
        type: String
    },
    DriveTest_Enginner_id: {
        type: String

    }

});

module.exports = mongoose.model('DriveTest', DriveTest);
