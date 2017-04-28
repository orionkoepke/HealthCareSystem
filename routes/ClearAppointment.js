const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/clear_appointment";

router.get('/',function(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"ClrA")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    Record.find({status: "Scheduled"}).then(function(ans){
      return res.render('UnclearedAppointments', {unclearedAppointments: ans, goTo: URL + "/edit_status"});
    });
  }
});

var patientRecord;

router.post('/edit_status', function(req, res){
  patient = JSON.parse(req.body.records);
  Record.find({PatientSSN: patient.SSN, date: patient.date}).then(function(ans){
    patientRecord = ans[0];

    patientRecord.status = "Cleared";
    Record.findByIdAndUpdate(patientRecord._id, { $set: patientRecord}, function(err, numAffected){});

    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0], button:"Go To Main", goTo: URL + "/go_to_main"});
  });
});

router.post('/go_to_main', function(req, res){
  patientRecord = null;
  return res.redirect('/users');
});



module.exports = router;
