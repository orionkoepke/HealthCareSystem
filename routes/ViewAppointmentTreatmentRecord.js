const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');

router.get('/',function(req,res){
  return res.render('ViewAppointmentTreatmentRecords');
});

router.post('/', function(req, res){
    patient = JSON.parse(req.body.records);
    Records.find({PatientSSN: patient.SSN, date: patient.date}).then(function(ans){
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0] });
  });
});

module.exports = router;
