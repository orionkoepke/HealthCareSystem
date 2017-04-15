const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');

router.get('/',function(req,res){
  return res.render('ViewAppointmentTreatmentRecords');
});

router.post('/', function(req, res){
  console.log("ViewAppointmentTreatmentRecord.js post /");
  console.log("req.body.records :: " + req.body.records);
  patient = JSON.parse(req.body.records);
  console.log("patient :: " + patient);
  Records.find({PatientSSN: patient.SSN, date: patient.date}).then(function(ans){
    console.log("\tans :: " + ans);
    console.log("\tans[0] :: " + ans[0]);
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0] });
  });
});

module.exports = router;
