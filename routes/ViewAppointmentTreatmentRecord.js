const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

router.get('/',function(req,res){
  return res.render('SelectPatient');
});

router.post('/', function(req, res){
  Records.find({PatientSSN: req.body.records.SSN, date: rew.body.records.date}).then(function(ans){
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0] });
  });
});

module.exports = router;
