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
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0], goTo: URL + "/update_status"});
  });
});

router.post('/update_status', function(req, res){

  patientRecord.firstname = req.body.firstname;
  patientRecord.lastname = req.body.lastname;
  if(req.body.date != ""){
    patientRecord.date = req.body.date;
  }
  patientRecord.PatientSSN = req.body.PatientSSN;
  patientRecord.doctor = req.body.doctor;
  patientRecord.age = req.body.age;
  patientRecord.weight = req.body.weight;
  patientRecord.height = req.body.height;
  patientRecord.bloodPressure = req.body.bloodPressure;
  patientRecord.reasonForVisit = req.body.reasonForVisit;
  patientRecord.billingAmount = req.body.billingAmount;
  patientRecord.patientCopay = req.body.patientCopay;
  patientRecord.reference = req.body.reference;
  patientRecord.treatmentInfo = req.body.treatmentInfo;
  patientRecord.status = req.body.status;
  patientRecord.payOnline = req.body.payOnline;

  Record.findByIdAndUpdate(patientRecord._id, { $set: patientRecord}, function(err, numAffected){});

  patientRecord = null;
  return res.redirect('/users');
});



module.exports = router;
