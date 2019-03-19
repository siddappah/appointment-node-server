var express = require('express');
var router = express.Router();
var cors = require('cors');

var usersJson = require('../json/users.json');
var appointmentJson = require('../json/appointments.json');
var path = require('path');
var fs = require('fs');
var db = require('diskdb');
var uuidv1 = require('uuid/v1');
var _ = require('lodash');


router.get('/users', cors(), function (req, res, next) {
  res.send(usersJson);
});

router.get('/allAppointments', cors(), function (req, res, next) {
  res.send(appointmentJson);
});

router.get('/users/:id', cors(), function (req, res) {
  var empId = req.params.id;
  db = db.connect(path.join(__dirname, '../json'), ['users']);
  var optinData = db.users.findOne({ id: empId });
  res.send(optinData);
});

router.get('/selectedAppointment/:currentDate', cors(), function (req, res) {
  var selectedDate = req.params.currentDate;
  db = db.connect(path.join(__dirname, '../json'), ['bookedappointments']);
  var optinData = db.bookedappointments.findOne({ date: selectedDate });
  res.send(optinData);
});


router.put('/users/update-employee/:id', cors(), function (req, res, next) {
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

router.post('/users/add-employee', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../json'), ['users']);
  db.users.save(req.body);
  res.send({ message: 'User added' });
});

router.delete('/users/delete-employee/:id', cors(), function (req, res, next) {
  db = db.connect(path.join(__dirname, '../json'), ['users']);
  db.users.remove({ id: req.params.id }, true);
  res.send({ message: 'User removed' });
});
module.exports = router;
