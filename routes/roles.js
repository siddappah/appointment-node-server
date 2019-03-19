var express = require('express');
var router = express.Router();
var cors = require('cors');

var rolesList = require('../json/roleslist.json');
var path = require('path');
var fs = require('fs');
var db = require('diskdb');
var uuidv1 = require('uuid/v1');
var _ = require('lodash');


router.get('/roleslist', cors(), function (req, res, next) {
  res.send(rolesList);
});

router.get('/roleslist/:id', cors(), function (req, res) {
  var id = req.params.id;
  db = db.connect(path.join(__dirname, '../json'), ['roleslist']);
  var optinData = db.roleslist.findOne({ roleId: id });
  res.send(optinData);
});

router.put('/update-user/:id', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../json'), ['users']);

  var query = {
    id: req.params.id
  };
  var options = {
    multi: false,
    upsert: false
  };

  var updated = db.users.update(query, req.body, options);
  res.send({ message: 'successfully updated' });
});

router.post('/save-user', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../json'), ['users']);
  db.users.save(req.body);
  res.send({ message: 'User added' });
});

router.delete('/delete-user/:id', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../json'), ['users']);
  db.users.remove({ id: req.params.id }, true);
  res.send({ message: 'User removed' });
});
module.exports = router;
