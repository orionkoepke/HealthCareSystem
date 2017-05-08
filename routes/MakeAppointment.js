// Author : Orion Koepke
// Date   : 4/29/2017
// Title  : MakeAppointment.js

const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/make_appointment";

// Get the doctor to make the appointment with.
router.get('/', function selectDoctor(req, res){
  // If the user is not loged in.
  if(!req.session.user){
    // Redirect the user to the login page.
    return res.render('LoginPage');
  }
  // Else if the user is not authorized to do this option.
  else if(!CheckUserAuthorization(req.session.user.userType,"MA")){
    // Redirect the user to the main page with an error message.
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  // Else the user is loged in and permited to do this operation.
  else{
    // Make a list of all the doctors and put it in ans.
    User.find({userType: "doctor"}).then(function(ans){
      // Make a list of what to display with the doctors on the page.
      var doctors = [];
      for(var i = 0; i < ans.length; i++){
        var doctor = {name: "", doctorId: ""};
        doctor.name = "Dr. " +  ans[i].firstname + " " + ans[i].lastname;
        doctor.doctorId = ans[i].doctor;
        doctors[i] = doctor;
      }
      //Render SelectDoctor.
      return res.render('SelectDoctor', {doctors: doctors, goTo: URL + "/select_patient"});
    });
  }
});

// Select the patient to make the appointment for.
router.post('/select_patient', function selectPatient(req, res){
  // Find all the patients of the selected doctor.
  Patient.find({doctor: req.body.doctors}).then(function(ans){
    // Create a list of patients to display on the page.
    var patients = [];
    for(var i = 0; i < ans.length; i++){
      var patient = {name: "", ssn: ""};
      patient.name = ans[i].firstname + " " + ans[i].lastname;
      patient.SSN = ans[i].SSN;
      patients[i] = patient;
    }

    // Render SelectPatient
    return res.render('SelectPatient', { patients: patients, goTo: URL + "/view_schedule" });
  });
});

var appointments; // All the apointments the selected doctor has from this day until forever.
var patient;      // The patient selected.

// Show the doctor's schedule and select a date and time for the appointment.
router.post('/view_schedule', function makeAppointment(req, res){
  // Find the patient that was selected and store it in ans1[0].
  Patient.find({SSN: req.body.patients}).then(function(ans1){
    // Calculate the prvious day and store it in prevDay.
    var prevDay = new Date((new Date).valueOf() - 86350989);  // The day before today.

    // Store the chosen patient in the global variable patient.
    patient = ans1[0];

    // Find all the appointments scheduled for the doctor of the patient after the previous day.
    Record.find({doctor: ans1[0].doctor, date: {$gte: prevDay}}).then(function getSchedule(ans2){
      // Store all the appointments for the patient's doctor in the global variable appointments.
      appointments = ans2;

      // Render the page ViewSchedule.
      return res.render('ViewSchedule', {appointments: ans2, error: "", goTo: URL + "/add_appointment"});
    });
  });
});

// Add the chosen appointment if there isn't a conflicting appointment already scheduled.
router.post('/add_appointment', function addAppointment(req, res){

  var appointmentTime = new Date(req.body.appointmentTime); // The chosen appointment time.

  //Convert to Central Time.
  appointmentTime.setHours(appointmentTime.getHours() + 5);

  Record.find({doctor: patient.doctor, date: appointmentTime}).then(function(ans){

    // Round the appointment time to the nearest half hour.
    if(appointmentTime.getMinutes() < 15){
      appointmentTime.setMinutes(0);
    }
    else if(appointmentTime.getMinutes() < 45){
      appointmentTime.setMinutes(30);
    }
    else if(appointmentTime.getMinutes() <= 59){
      appointmentTime.setHours(appointmentTime.getHours() + 1);
      appointmentTime.setMinutes(0);
    }

    // If there isn't a conflicting appointment already scheduled or it's not between 9am and 5pm.
    if(ans.length == 0 && appointmentTime.getHours() >= 9 && appointmentTime.getHours() <= 17)
    {
      // Create the record.
      newRecord = new Record();
      newRecord.patientID = patient._id;
      newRecord.date = appointmentTime;
      newRecord.doctor = patient.doctor;
      newRecord.status = "Scheduled";
      newRecord.treatmentInfo = "";
      newRecord.reference = "";
      newRecord.billingAmount = 0;
      newRecord.reasonForVisit = "";
      newRecord.save();

      // Reset appointments and patient to null for next time.
      appointments = null;
      patient = null;

      // Redirect the user to the main page.
      return res.redirect('/users');
    }
    // Else the user selected an appointment time that is already filled.
    else
    {
      // Send the user back to ViewSchedule to select another appointment time with an error message.
      return res.render('ViewSchedule', {appointments: appointments, error: "Invalid Appointment Time", goTo: URL + "/add_appointment"});
    }
  });
});

module.exports = router;
