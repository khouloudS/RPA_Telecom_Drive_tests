const dropboxV2Api = require('dropbox-v2-api');
var fs = require('fs');
const dropbox = dropboxV2Api.authenticate({
    token: 'LUlrU5NROtAAAAAAAAAAFgAVVPS11Hu-zXq6H5uTIcAmENayUUwtC7aMuvWh6sMN'
});

// use session ref to call API, i.e.:
dropbox({
    resource: 'users/get_account',
    parameters: {
        'account_id': 'dbid:AABxxLXGlvPtVgcwL6LCq0a0QoYziQwU02A',
    },

}, (err, result, response) => {
    if (err) { return console.log(err); }
    console.log(result);
});
let date_ob = new Date();
const dropboxUploadStream = dropbox({
    resource: 'files/upload',
    parameters: {
        path: '/dropbox/path/to/'+date_ob+'/log_file.log'
    },
}, (err, result, response) => {
    //upload completed
    console.log(result);
});
fs.createReadStream('C:\\Users\\khouloud\\Desktop\\testProject\\speed_evaluator\\speedtest.log').pipe(dropboxUploadStream);
