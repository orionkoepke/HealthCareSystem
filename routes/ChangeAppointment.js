const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/change_appointment";

router.get('/select_doctor', function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"CA")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    User.find({userType: "doctor"}).then(function(ans){
      var doctors = [];
      for(var i = 0; i < ans.length; i++){
        var doctor = {name: "", doctorId: ""};
        doctor.name = "Dr. " +  ans[i].firstname + " " + ans[i].lastname;
        doctor.doctorId = ans[i].doctor;
        doctors[i] = doctor;
      }
      return res.render('SelectDoctor', {doctors: doctors, goTo: URL + "/select_patient"});
    });
  }
});

router.post('/select_patient', function(req, res){
  Patient.find({doctor: req.body.doctors}).then(function(ans){
    var patients = [];
    for(var i = 0; i < ans.length; i++){
      var patient = {name: "", ssn: ""};
      patient.name = ans[i].firstname + " " + ans[i].lastname;
      patient.SSN = ans[i].SSN;
      patients[i] = patient;
    }
    return res.render('SelectPatient', { patients: patients, goTo: URL + "/select_appointment" });
  });
});

router.post('/select_appointment', function(req, res){
  Record.find({PatientSSN: req.body.patients}).then(function(ans){
    var records = [];
    for(var i = 0; i < ans.length; i++){
      var record = {date: "", SSN: ""};
      record.date = ans[i].date;
      record.SSN = ans[i].PatientSSN;
      records[i] = record;
    }
    return res.render('SelectAppointmentTreatmentRecord', { records: records, goTo: URL + "/edit_appointment" });
  });
});

var patientRecord;

router.post('/edit_appointment', function(req, res){
  patient = JSON.parse(req.body.records);
  Record.find({PatientSSN: patient.SSN, date: patient.date}).then(function(ans){
    patientRecord = ans[0];
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0], goTo: URL + "/update_appointment"});
  });
});

router.post('/update_appointment', function(req, res){

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
