var express = require('express');
var router = express.Router();
var cors = require('cors');
var viewSavedcriteriaJson = require('../public/json/viewsavecriterias');
var file = './public/json/viewsavecriterias.json';
var searchresultsJson = require('../public/json/searchresults');
var resultsFile = './public/json/searchresults.json';
var favouritesJson = require('../public/json/favourites');
var favsFile = './public/json/favourites.json';
var favouriteJson = require('../public/json/favourite');
var favFile = './public/json/favourite.json';
var path = require('path');
var fs = require('fs');
var db = require('diskdb');
var uuidv1 = require('uuid/v1');
var _ = require('lodash');

router.get('/', cors(), function (req, res, next) {
  res.send(viewSavedcriteriaJson);
});

router.post('/save-search-criteria', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../public/json'), ['viewsavecriterias']);
  db.viewsavecriterias.save(req.body);
  res.send({ message: 'success' });
});

router.put('/save-search-criteria', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../public/json'), ['viewsavecriterias']);

  var query = {
    savedSearchName: req.body.name
  };
  var options = {
    multi: false,
    upsert: false
  };

  var updated = db.viewsavecriterias.update(query, req.body, options);
  res.send({ message: 'successfully updated' });
});

router.get('/search-results', cors(), function (req, res, next) {
  res.send(searchresultsJson);
});

// Get all favourites list
router.get('/favourites', cors(), function (req, res, next) {
  res.send(favouritesJson);
});

// Post favourite
router.post('/favourite', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../public/json'), ['favourite']);
  db.favourite.save(req.body);
  res.send({ message: 'Added supplier favourite successfully' });
});

// Get all favourite for checking fav status
router.get('/allfavourites', cors(), function (req, res, next) {
  res.send(favouriteJson);
});

// Delete favourite
router.delete('/deletefavourite', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../public/json'), ['favourite']);
  db.favourite.remove({supplierOrgCode: "ZC1032191"}, true);
  res.send({ message: 'Removed supplier favourite successfully' });
});


module.exports = router;
