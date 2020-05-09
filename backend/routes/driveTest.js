const express = require('express');
const app = express();
let DriveTest = require('../models/drivetest.model');
let User = require('../models/user.model');
const DriveTestRoutes = express.Router();
const fs = require('fs');
const csv = require('csv-parser');
process.env.SECRET_KEY = 'secret'
DriveTestRoutes.route('/AddDriveTest').post(async (req, res) => {
    let arr=[];
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let DriveTestFile = req.files.DriveTestFile;
            let DriveTestRoad = req.files.DriveTestRoad;
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            DriveTestFile.mv('./DriveTestRPAFile/' +  dateTime+" -- "+DriveTestFile.name);
            DriveTestRoad.mv('./DriveTestRoadFile/' +  dateTime+" -- "+DriveTestRoad.name);
            let driveTest = new DriveTest();
            driveTest.DriveTest_Driver_id = req.body.DriveTest_Driver_id;
            driveTest.DriveTest_Enginner_id = req.body.DriveTest_Enginner_id;
            driveTest.DriveTest_Title = req.body.DriveTest_Title;
            driveTest.DriveTest_Description = req.body.DriveTest_Description;
            driveTest.DriveTest_Start_Time = req.body.DriveTest_Start_Time;
            driveTest.DriveTest_File = dateTime+" -- "+DriveTestFile.name;
            fs.createReadStream('./DriveTestRoadFile/'+dateTime+" -- "+DriveTestRoad.name)
                .on('error', () => {
                    // handle error
                })
                .pipe(csv({delimiter:','}))
                .on('data', function (row) {
                    var a =row["Longitude;Latitude"].split(';').slice(0,2).reverse();
                    a = a.map(function(e) {return  parseFloat(e);});
                    arr.push(a);
                    //console.log("a",arr);
                })
                .on('end',function () {
                        driveTest.DriveTest_Road=arr
                        console.log("a",arr);
                        driveTest.save();
                    }
                )}
    } catch (err) {
        res.status(500).send(err);
    }
    res.end();
});

//get All drive tests for admin
DriveTestRoutes.route('/').get(function (req, res) {
    DriveTest.find(function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
//Search data 2 fields
DriveTestRoutes.route('/search/:query').get(function (req, res) {
    var a = { $or: [ { DriveTest_Title  :{'$regex' : req.params.query, '$options' : 'i'} }
            , { DriveTest_Description  :{'$regex' : req.params.query, '$options' : 'i'} }]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
//filter state pending
DriveTestRoutes.route('/filter/pending').get(function (req, res) {
    var today = new Date();
    var a = { $and: [ { DriveTest_State  : false }
            , { DriveTest_Done_Date  : null },
            { DriveTest_Start_Time:  { $gte: today }}]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
//filter missed state
DriveTestRoutes.route('/filter/missed').get(function (req, res) {
    var today = new Date();
    var a = { $and: [ { DriveTest_State  : false }
            , { DriveTest_Start_Time:  { $lte: today }}, { DriveTest_Done_Date  : null }]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
// filter interrupted state
DriveTestRoutes.route('/filter/interrupted').get(function (req, res) {

    var a = { $and: [ { DriveTest_State  : false },
            { DriveTest_Done_Date  :   { $exists : true ,$ne : null }   }
        ]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);

        }

    })

});
//filter state done
DriveTestRoutes.route('/filter/done').get(function (req, res) {
    var a = { $and: [ { DriveTest_State  : true }
            , { DriveTest_Done_Date  :{ $exists : true } }]}  ;
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
DriveTestRoutes.route('/engineer/drivetests/:idEng').get(function (req, res) {
    let id = req.params.idEng;
    var a = { DriveTest_Enginner_id  :  id  }
    DriveTest.find(a,function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);

        }

    })

});
// get just one drive test 7asb id
DriveTestRoutes.get('/:id/', function (req, res) {
    let id = req.params.id;
    console.log("req==================",id);
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        DriveTest.findById(id, function (err, DriveTest) {
            if (err) {
                console.log(err);
            } else {
                res.json(DriveTest);
            }
        });
    }

});
// delete il drive test
DriveTestRoutes.route('/DeleteDriveTest/:id').delete(function (req, res) {
    DriveTest.findById(req.params.id, function (err, DriveTest) {
        if (!DriveTest)
            res.status(400).send('data not found');
        else
            DriveTest.delete().then(DriveTest => {
                res.json('DriveTest deleted successfully');
            })
                .catch(err => {
                    res.status(400).json('no DriveTest deleted');
                }); });
});
//Update just 3 fields
DriveTestRoutes.route('/UpdateDriveTest/:id').post(function (req, res) {
    console.log(req.body.content);
    console.log("req=" ,req.body);
    console.log("req params=" ,req.params.id);
    console.log("req=" ,req.body.DriveTest_Title);
    DriveTest.findById(req.params.id, function (err, DriveTest) {
        console.log(DriveTest);
        if (!DriveTest)
            res.status(400).send('data not found');
        else
            DriveTest.DriveTest_Title = req.body.DriveTest_Title;
        DriveTest.DriveTest_Description = req.body.DriveTest_Description;
        DriveTest.DriveTest_Start_Time = req.body.DriveTest_Start_Time;
        DriveTest.DriveTest_Driver_id = req.body.DriveTest_Driver_id;
        DriveTest.save().then(DriveTest => {
            res.json('DriveTest updated successfully');
        })
            .catch(err => {
                res.status(400).json('No DriveTest updated ');
            });
    });

});
//update road
DriveTestRoutes.route('/UpdateDriveTestRoad/:id').post(async function (req, res) {
    let arr=[];
    DriveTest.findById(req.params.id, function (err, DriveTest) {
        if (!DriveTest)
            res.status(400).send('data not found');
        else
            try {
                if(!req.files) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    let DriveTestRoad = req.files.DriveTestRoad;
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
                    DriveTestRoad.mv('./DriveTestRoadFile/' +  dateTime+" -- "+DriveTestRoad.name);
                    fs.createReadStream('./DriveTestRoadFile/'+dateTime+" -- "+DriveTestRoad.name)
                        .on('error', () => {
                            // handle error
                        })
                        .pipe(csv({delimiter:','}))
                        .on('data', function (row) {
                            var a =row["Longitude;Latitude"].split(';').slice(0,2);
                            a = a.map(function(e) {return  parseFloat(e);});
                            arr.push(a);
                        })
                        .on('end',function () {
                                DriveTest.DriveTest_Road=arr
                                DriveTest.save();
                            }
                        )}


            } catch (err) {
                res.status(500).send(err);
            }
        res.end();
    });

});
//update file
DriveTestRoutes.route('/UpdateDriveTestfile/:id').post(function (req, res) {
    DriveTest.findById(req.params.id, function (err, DriveTest) {
        console.log(DriveTest);
        if (!DriveTest)
            res.status(400).send('data not found');
        else
            try {
                if(!req.files) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    let DriveTestFile = req.files.DriveTestFile;
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
                    DriveTest.DriveTest_File = dateTime+" -- "+DriveTestFile.name;
                    DriveTestFile.mv('./DriveTestRPAFile/' +  dateTime+" -- "+DriveTestFile.name);
                    DriveTest.save().then(DriveTest => {
                        res.send({
                            status: true,
                            message: 'File is uploaded / DriveTest\': \'DriveTest  updated successfully',
                            data: {
                                name: DriveTestFile.name,
                                mimetype: DriveTestFile.mimetype,
                                size: DriveTestFile.size
                            }
                        })
                    });
                }
            } catch (err) {
                res.status(500).send(err);
            }
    });

});


//Update state (management)
DriveTestRoutes.route('/UpdateStateDriveTest/:id').post(function (req, res) {
    console.log("req=" ,req.params);
    DriveTest.findById(req.params.id, function (err, DriveTest) {
        if (!DriveTest)
            res.status(400).send('data not found');
        else
            DriveTest.DriveTest_State = req.body.DriveTest_State;
        DriveTest.DriveTest_Done_Date = Date.now();
        DriveTest.save().then(DriveTest => {
            res.json('State updated successfully');
        })
            .catch(err => {
                res.status(400).json('No State updated ');
            });
    });


});
DriveTestRoutes.route('/').get(function (req, res) {

    DriveTest.find(null,{ DriveTest_Road  :0},function (err, DriveTest) {
        if (err) {
            console.log(err);
        } else {
            res.json(DriveTest);
        }
    });
});
module.exports = DriveTestRoutes;
