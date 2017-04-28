const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/make_appointment";

router.get('/', function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"MA")){
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
    return res.render('SelectPatient', { patients: patients, goTo: URL + "/view_schedule" });
  });
});

var appointments;
var patient;

router.post('/view_schedule', function(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    // This gets the previous day.
    var prevDay = new Date((new Date).valueOf() - 86350989);

    patient = ans[0];

    Record.find({doctor: ans[0].doctor, date: {$gte: prevDay}}).then(function(ans){
      appointments = ans;
      return res.render('ViewSchedule', {appointments: ans, error: "", goTo: URL + "/add_appointment"});
    });
  });
});

router.post('/add_appointment', function(req, res){
  Record.find({date: new Date(req.body.appointmentTime)}).then(function(ans){
    if(ans.length == 0)
    {
      newRecord = new Record();
      newRecord.firstname = patient.firstname;
      newRecord.lastname = patient.lastname;
      newRecord.date = new Date(req.body.appointmentTime);
      newRecord.PatientSSN = patient.SSN;
      newRecord.doctor = patient.doctor;
      newRecord.status = "scheduled";
      newRecord.save();

      appointments = null;
      patient = null;

      return res.redirect('/users');
    }
    else
    {
      return res.render('ViewSchedule', {appointments: ans, error: "Invalid Appointment Time", goTo: URL + "/add_appointment"});
    }
  });
});

module.exports = router;
