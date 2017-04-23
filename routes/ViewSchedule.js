const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Record = require('../models/Records.js');
var Patient = require('../models/Patients.js');

router.get('/',function(req,res){
  return res.render('ViewSchedule');
});

router.post('/', function(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    // This gets the previous day.
    var prevDay = new Date((new Date).valueOf() - 86350989);

      Record.find({doctor: ans[0].doctor, date: {$gte: prevDay}}).then(function(ans){
        return res.render('ViewSchedule', {appointments: ans});
      });
  });

  router.post('/add_appointment', function(req, res){
    return res.render('ViewSchedule', {appointments: []]});
  });

});

module.exports = router;
