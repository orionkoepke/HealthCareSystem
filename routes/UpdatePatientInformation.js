// Author : Orion Koepke
// Date   : 4/29/2017
// Title  : UpdatePatientInformation.js

const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/update_patient_information";

// Select a doctor or select a patient if the doctor is already known.
router.get('/', function selectDoctor(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"UPI")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    if(req.session.user.userType == "staff"){
      User.find({userType: "doctor"}).then(function(ans){
        var doctors = [];
        for(var i = 0; i < ans.length; i++)
        {
          var name = "Dr. " + ans[i].lastname;
          var doctorId = ans[i].doctor;
          doctors[i] = {name: name, doctorId: doctorId};
        }
        return res.render('SelectDoctor', {doctors: doctors, goTo: URL + "/select_patient"});
      });
    }
    else{
      Patient.find({doctor: req.session.user.doctor}).then(function(ans){
        var patients = [];
        for(var i = 0; i < ans.length; i++){
          var patient = {name: "", ssn: ""};
          patient.name = ans[i].firstname + " " + ans[i].lastname;
          patient.SSN = ans[i].SSN;
          patients[i] = patient;
        }
        return res.render('SelectPatient', { patients: patients, goTo: URL + "/view_patient_information" });
      });
    }
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
    return res.render('SelectPatient', { patients: patients, goTo: URL + "/edit_patient_information" });
  });
});

var patientRecord;  // The patient record selected.

// Edit patient record.
router.post('/edit_patient_information', function editInformation(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    patientRecord = ans[0];
    return res.render('ViewPatientRecord', { patient: ans[0], button: "Update" , goTo: URL + "/update" });
  });
});

// Update selected patient record.
router.post('/update', function update(req, res){
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

  patientRecord.save();

  patientRecord = null;
  return res.redirect('/users');
});

module.exports = router;
