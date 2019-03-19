var express = require('express');
var router = express.Router();
var subsJson = require('../json/subsidiaries.json');
var companyJson = require('../json/company.json');
var companyaJson = require('../json/company-a.json');
var companybJson = require('../json/company-b.json');
var languageJson = require('../json/languages.json');
var enJson = require('../json/en.json');
var frJson = require('../json/fr.json');
var jaJson = require('../json/ja.json');
var cors = require('cors');
//router.param('id', 1337);

router.get('/subsidiaries', function (req, res, next) {
    res.send(subsJson);
});

router.get('/en', function (req, res, next) {
  res.send(enJson);
});
router.get('/fr',  function (req, res, next) {
  res.send(frJson);
});
router.get('/ja',  function (req, res, next) {
  res.send(jaJson);
});


router.param(function(param, option) {
    return function (req, res, next, val) {
      if (val == option) {
        next();
      }
      else {
        next('route');
      }
    }
  });
  


router.get('/', cors(), function (req, res, next) {
    console.log(req.originalUrl);
    res.send(companyJson);
  });

  router.get('/:id', cors(), function (req, res, next) {
    console.log(req.originalUrl);
    res.send(companyaJson);
  });

  router.get('/languages', cors(), function (req, res, next) {
    console.log(req.originalUrl);
    res.send(languageJson);
  });

  router.put('/', cors(), function (req, res, next) {
    //db = db.connect(path.join(__dirname, '../public/json'), ['favourite']);
    //db.favourite.save(req.body);
    
    res.send();
  });

  
  


module.exports = router;
