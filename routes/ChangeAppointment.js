// Author : Orion Koepke
// Date   : 4/29/2017
// Title  : ChangeAppointment.js

const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/change_appointment";

// Select a doctor.
router.get('/', function selectDoctor(req, res){
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

// Select a patient.
router.post('/select_patient', function selectPatient(req, res){
  Patient.find({doctor: req.body.doctors}).then(function getPatients(ans){
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

var patient;  // The patient chosen.

// Select an appointment the patient has made to change.
router.post('/select_appointment', function selectAppointment(req, res){
  Patient.find({SSN: req.body.patients}).then(function getPatient(ans1){
    patient = ans1[0];
    Record.find({patientID: ans1[0]._id}).then(function getAppointments(ans2){
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

var patientRecord;  // The appointment record that was chosen to be changed.
var scheduledAppointments;  // The appointments that doctor has.

// Get the day the appointment should be changed to.
router.post('/edit_appointment', function editAppointment(req, res){
  var prevDay = new Date((new Date).valueOf() - 86350989);

  Record.find({patientID: patient._id, date: req.body.records}).then(function(ans1){
    patientRecord = ans1[0];
  });

  Record.find({doctor: patient.doctor, date: {$gte: prevDay}}).then(function(ans2){
    scheuledAppointments = ans2;
    return res.render('ViewSchedule', {appointments: ans2, error: "", goTo: URL + "/update_appointment"});
  });
});

// Change the date of the appointment in the database.
router.post('/update_appointment', function updateAppointment(req, res){
  Record.find({doctor: patient.doctor, date: new Date(req.body.appointmentTime)}).then(function(ans){
    var appointmentTime = new Date(req.body.appointmentTime); // The chosen appointment time.

    //Convert to Central Time.
    appointmentTime.setHours(appointmentTime.getHours() + 5);

    // Round the appointment time to the nearest half hour.
    if(appointmentTime.getMinutes() < 15){
      appointmentTime.setMinutes(0);
    }
    else if(appointmentTime.getMinutes() < 45){
      appointmentTime.setMinutes(30);
    }
    else{
      appointmentTime.setHours(appointmentTime.getHours() + 1);
      appointmentTime.setMinutes(0);
    }

    // If there isn't a conflicting appointment already scheduled or it's not between 9am and 5pm.
    if(ans.length == 0 && appointmentTime.getHours() >= 9 && appointmentTime.getHours() <= 17)
    {
      patientRecord.date = appointmentTime;
      patientRecord.save();

      patient = null;
      patientRecord = null;

      return res.redirect('/users');
    }
    else
    {
      return res.render('ViewSchedule', {appointments: scheuledAppointments, error: "Invalid Appointment Time", goTo: URL + "/update_appointment"});
    }
  });
});




module.exports = router;
