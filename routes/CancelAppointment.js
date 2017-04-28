const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/cancel_appointment";

router.get('/', function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"XA")){
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
    return res.render('SelectAppointmentTreatmentRecord', { records: records, goTo: URL + "/delete_appointment" });
  });
});

router.post('/delete_appointment', function(req, res){
  patient = JSON.parse(req.body.records);
  Record.find({PatientSSN: patient.SSN, date: patient.date}).then(function(ans){
    patientRecord = ans[0];
    patientRecord.remove();
  });
  return res.redirect('/users');
});

module.exports = router;
