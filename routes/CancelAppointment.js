// Author : Orion Koepke
// Date   : 4/29/2017
// Title  : CancelAppointment.js

const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/cancel_appointment";

// Select a doctor.
router.get('/', function selectDoctor(req, res){
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

// Select a patient.
router.post('/select_patient', function selectPatient(req, res){
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

var patient;  // The patient selected.

// Select an appointment that the patient has scheduled.
router.post('/select_appointment', function selectAppointment(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans1){
    patient = ans1[0];
    Record.find({patientID: ans1[0]._id}).then(function(ans2){
      var records = [];
      for(var i = 0; i < ans2.length; i++){
        var record = {date: ""};
        record.date = ans2[i].date;
        records[i] = record;
      }
      return res.render('SelectAppointmentTreatmentRecord', { records: records, goTo: URL + "/delete_appointment" });
    });
  });
});

// Delete the selected appointment form the database.
router.post('/delete_appointment', function deleteAppointment(req, res){
  Record.find({patientID: patient._id, date: req.body.records}).then(function(ans){
    ans[0].remove();
  });

  patient = null;

  return res.redirect('/users');
});


module.exports = router;
