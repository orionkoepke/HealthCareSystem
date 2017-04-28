const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var User = require('../models/Users.js');
var Patient = require('../models/Patients.js');
var Record = require('../models/Records.js');

var URL = "http://localhost:3003/view_patient_information";

router.get('/', function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VPI")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    if(req.session.user.userType == "staff"){
      User.find({userType: "doctor"}).then(function(ans){
        var doctors = [];
        for(var i = 0; i < ans.length; i++)
        {
          var name = "Dr. " + ans[i].lastname;
          var doctorID = ans[i].doctor;
          doctors[i] = {name: name, doctorID: doctorID};
        }
        return res.render('CreateNewPatient', {doctors: doctors, goTo: URL + "/view_patient_information"});
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

router.post('/view_patient_information', function(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    patientRecord = ans[0];
    return res.render('ViewPatientRecord', { patient: ans[0], button: "Go To Main Page" , goTo: URL + "/go_to_main_page" });
  });
});

router.post('/go_to_main_page', function(req, res){
  return res.redirect('/users');
});

module.exports = router;
