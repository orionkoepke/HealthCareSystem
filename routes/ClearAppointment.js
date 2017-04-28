const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/clear_appointment";

router.get('/',function(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"ClrA")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    Record.find({status: "Scheduled"}).then(function(ans){
      return res.render('UnclearedAppointments', {unclearedAppointments: ans, goTo: URL + "/edit_status"});
    });
  }
});

var patientRecord;

router.post('/edit_status', function(req, res){
  record = JSON.parse(req.body.records);
  Patient.find({_id: record.patientID}).then(function(ans1){
    Record.find({patientID: ans1[0]._id, date: record.date}).then(function(ans2){
      patientRecord = ans2[0];
      patientRecord.status = "Cleared";
      patientRecord.update();

      fullRecord = {patient: ans1[0], appointment: ans2[0]};
      return res.render('ViewAppointmentTreatmentRecord', { record: fullRecord, button: "Go To Main Page", goTo: URL + "/go_to_main"});
    });
  });
});

router.post('/go_to_main', function(req, res){
  patientRecord = null;
  return res.redirect('/users');
});



module.exports = router;
