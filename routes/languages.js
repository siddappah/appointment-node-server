var express = require('express');
var router = express.Router();
var cors = require('cors');
var subsJson = require('../json/languages.json');


router.get('/', cors(), function (req, res, next) {
    res.send(subsJson);
});


module.exports = router;
