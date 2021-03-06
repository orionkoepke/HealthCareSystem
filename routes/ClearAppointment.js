// Author : Orion Koepke
// Date   : 4/29/2017
// Title  : ClearAppointment.js

const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/clear_appointment";

// Select an Uncleared appointment.
router.get('/',function selectAppointment(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"ClrA")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    Record.find({status: {$ne: "Finalized"}, reference: {$ne: ""}}).populate('patientID').then(function(ans){
      return res.render('UnclearedAppointments', {unclearedAppointments: ans, goTo: URL + "/edit_status"});
    });
  }
});

var patientRecord; // The selected uncleared appointment.

// Clear the appointment and send the user to view the updated appointment.
router.post('/edit_status', function editStatus(req, res){
  console.log(req.body.records);
  record = JSON.parse(req.body.records);
  Patient.find({_id: record.patientID}).then(function(ans1){
    Record.find({patientID: ans1[0]._id, date: record.date}).then(function(ans2){
      patientRecord = ans2[0];
      patientRecord.status = "Finalized";
      patientRecord.save();

      fullRecord = {patient: ans1[0], appointment: ans2[0]};
      return res.render('ViewAppointmentTreatmentRecord', { record: fullRecord, button: "Go To Main Page", goTo: URL + "/go_to_main"});
    });
  });
});

// Redirect the user to the main page.
router.post('/go_to_main', function goToMain(req, res){
  patientRecord = null;
  return res.redirect('/users');
});

module.exports = router;
