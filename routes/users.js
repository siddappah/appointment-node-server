var express = require('express');
var cors = require('cors');
var router = express.Router();
var userJson = require('../json/user.json');

/* GET users listing. */
// router.get('/',  cors(),function(req, res, next) {
//   res.send('ronald');
// });

router.get('/', cors(), function (req, res, next) { 
  res.send(userJson);
});

router.get('/authenticate', cors(), function (req, res, next) {  
  res.send("testuser");
  
});




module.exports = router;
