const express = require('express');
const app = express();
let Claim = require('../models/claim.model');
const ClaimRoutes = express.Router();

ClaimRoutes.route('/').get(function (req, res) {
    Claim.find(function (err, Claim) {
        if (err) {
            console.log(err);
        } else {
            res.json(Claim);
        }
    });
});
ClaimRoutes.route('/AddClaim').post(function (req, res) {
    let claim = new Claim(req.body);
    claim.save().then(claim => {
        res.status(200).json({'claim': 'claim added successfully'});
    })
        .catch(err => {
            res.status(400).json({'claim': 'no claim added'});
        })
});
ClaimRoutes.route('/DeleteClaim/:id').delete(function (req, res) {
    Claim.findById(req.params.id, function (err, claim) {
        if (!claim)
            res.status(400).send('data not found');
        else
            claim.delete().then(claim => {
                res.json('claim deleted successfully');
            })
                .catch(err => {
                    res.status(400).json('no claim deleted');
                }); });
});

module.exports = ClaimRoutes;