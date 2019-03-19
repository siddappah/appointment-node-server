var express = require('express');
var router = express.Router();
var cors = require('cors');
var optinJson = require('../public/json/optin');
var file = './public/json/optin.json';
var path = require('path');
var fs = require('fs');
var db = require('diskdb');
var uuidv1 = require('uuid/v1');
var _ = require('lodash');

router.get('/optinstatus', cors(), function (req, res) {
    db = db.connect(path.join(__dirname, '../public/json'), ['optin']);
    var optinData = db.optin.findOne({ code: "ZC05019998" });
    res.send(optinData);
});

router.put('/optin', cors(), function (req, res, next) {
    db = db.connect(path.join(__dirname, '../public/json'), ['optin']);

    var query = {
        code: "ZC05019998"
    };
    var options = {
        multi: false,
        upsert: false
    };

    var updated = db.optin.update(query, req.body, options);
    res.send({ message: 'successfully updated' });
});

module.exports = router;
