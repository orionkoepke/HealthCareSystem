const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Record = require('../models/Records.js');
var Patient = require('../models/Patients.js');

router.get('/',function(req,res){
  return res.render('ViewSchedule', {appointments: [], error: "No Patient Selected"});
});

var appointments;
var patient;

router.post('/', function(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    // This gets the previous day.
    var prevDay = new Date((new Date).valueOf() - 86350989);

    patient = ans[0];

    Record.find({doctor: ans[0].doctor, date: {$gte: prevDay}}).then(function(ans){
      appointments = ans;
      return res.render('ViewSchedule', {appointments: ans, error: ""});
    });
  });
});

router.post('/add_appointment', function(req, res){
  Record.find({date: new Date(req.body.appointmentTime)}).then(function(ans){
    console.log(ans);
    if(ans.length == 0)
    {
      newRecord = new Record();
      newRecord.firstname = patient.firstname;
      newRecord.lastname = patient.lastname;
      newRecord.date = new Date(req.body.appointmentTime);
      newRecord.PatientSSN = patient.SSN;
      newRecord.doctor = patient.doctor;
      newRecord.status = "scheduled";
      newRecord.save();
      return res.render('MainPage');
    }
    else
    {
      return res.render('ViewSchedule', {appointments: ans, error: "Invalid Appointment Time"});
    }
  });
});



module.exports = router;
