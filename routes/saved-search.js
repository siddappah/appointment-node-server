var express = require('express');
var router = express.Router();
var cors = require('cors');
var savedSearchJson = require('../json/saved-search.json');

router.get('/', cors(), function (req, res, next) {
    res.send(savedSearchJson);
});

module.exports = router;
