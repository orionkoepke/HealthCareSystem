const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/view_patient_treatment_records";

router.get('/', function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VPTR")){
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

var patient;

router.post('/select_appointment', function(req, res){
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

router.post('/edit_appointment', function(req, res){
  Record.find({patientID: patient._id, date: req.body.records}).then(function(ans){
    fullRecord = {patient: patient, appointment: ans[0]};
    return res.render('ViewAppointmentTreatmentRecord', { record: fullRecord, button: "Go To Main Page", goTo: URL + "/change_to_main"});
  });
});

router.post('/change_to_main', function(req, res){
  patient = null;
  return res.redirect('/users');
});



module.exports = router;
