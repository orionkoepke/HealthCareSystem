const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');

router.get('/',function(req,res){
  return res.render('ViewAppointmentTreatmentRecords');
});

var patientRecord;

router.post('/', function(req, res){
  patient = JSON.parse(req.body.records);
  Records.find({PatientSSN: patient.SSN, date: patient.date}).then(function(ans){
    patientRecord = ans[0];
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0] });
  });
});

router.post('/update_appointment_treatment_record', function(req, res){
  patientRecord.firstname = req.body.firstname;
  patientRecord.lastname = req.body.lastname;
  patientRecord.date = req.body.date;
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
  patientRecord = null;
  return res.redirect('MainPage');
});

module.exports = router;
