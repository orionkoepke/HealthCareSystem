// Author : Orion Koepke
// Date   : 4/29/2017
// Title  : UpdatePatientTreatmentRecords.js

const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/update_patient_treatment_record";

// Select a doctor or Select a patient if the doctor is already known.
router.get('/', function selectDoctor(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"UPTR")){
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
        return res.render('SelectPatient', { patients: patients, goTo: URL + "/select_appointment" });
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
    return res.render('SelectPatient', { patients: patients, goTo: URL + "/select_appointment" });
  });
});

var patient; // The patient selected.

// Select an appointment to update for the selected patient.
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
      return res.render('SelectAppointmentTreatmentRecord', { records: records, goTo: URL + "/edit_appointment" });
    });
  });
});

var patientRecord; // The appointment record selected.

// Editing the selected record.
router.post('/edit_appointment', function editAppointment(req, res){
  Record.find({patientID: patient._id, date: req.body.records}).then(function(ans){
    patientRecord = ans[0];
    fullRecord = {patient: patient, appointment: ans[0]};
    return res.render('ViewAppointmentTreatmentRecord', { record: fullRecord, button: "Update", goTo: URL + "/update_appointment"});
  });
});

// Changing the edited record in the database.
router.post('/update_appointment', function update(req, res){
  patientRecord.billingAmount = req.body.billingAmount;
  patientRecord.patientCopay = req.body.patientCopay;
  patientRecord.reference = req.body.reference;
  console.log(patientRecord.payOnline);
  if(patientRecord.payOnline == "True" || patientRecord.payOnline == "true"){
    patientRecord.payOnline = true;
  }
  else if(patientRecord.payOnline == "False" || patientRecord.payOnline == "false"){
    patientRecord.payOnline = false;
  }
  patientRecord.status = req.body.status;
  if(req.session.user.userType == "nurse" || req.session.user.userType == "doctor")
  {
    patientRecord.age = req.body.age;
    patientRecord.weight = req.body.weight;
    patientRecord.height = req.body.height;
    patientRecord.bloodPressure = req.body.bloodPressure;
    patientRecord.reasonForVisit = req.body.reasonForVisit;
    if(req.session.user.userType == "doctor")
    {
      patientRecord.treatmentInfo = req.body.treatmentInfo;
    }
  }

  patientRecord.save();

  patient = null;
  patientRecord = null;

  return res.redirect('/users');
});



module.exports = router;
