const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');

router.get('/',function(req,res){
  return res.render('ViewPatientRecord');
});

var patientRecord;

router.post('/', function(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    patientRecord = ans[0];
    return res.render('ViewPatientRecord', { patient: ans[0] });
  });
});

router.post('/update', function(req, res){

  patientRecord.firstname = req.body.firstname;
  patientRecord.lastname = req.body.lastname;
  patientRecord.address = req.body.address;
  patientRecord.phone = req.body.phone;
  patientRecord.email = req.body.email;
  patientRecord.SSN = req.body.SSN;
  patientRecord.insurance = req.body.insurance;
  patientRecord.onFilePaymentInfo = req.body.onFilePaymentInfo;
  patientRecord.doctor = req.body.doctor;
  patientRecord.medicalNotes = req.body.medicalNotes;

  Patient.findByIdAndUpdate(patientRecord._id, { $set: patientRecord}, function(err, numAffected){});

  patientRecord = null;
  return res.redirect('/users');
});

module.exports = router;
