const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/update_patient_treatment_record";

router.get('/', function(req, res){
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
      for(var i = 0; i < ans.length; i++){
        var record = {date: "", SSN: ""};
        record.date = ans2[i].date;
        record.SSN = ans2[i].PatientSSN;
        records[i] = record;
      }
      return res.render('SelectAppointmentTreatmentRecord', { records: records, goTo: URL + "/edit_appointment" });
    });
  });
});

var patientRecord;

router.post('/edit_appointment', function(req, res){
  Record.find({date: record.date}).then(function(ans){
    ans[0].patientID = patient;
    return res.render('ViewAppointmentTreatmentRecord', { record: ans[0], button: "Update", goTo: URL + "/update_appointment"});
  });
});

router.post('/update_appointment', function(req, res){
  if(req.body.date != ""){
    patientRecord.date = req.body.date;
  }
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

  patient = null;
  patientRecord = null;
  return res.redirect('/users');
});



module.exports = router;
