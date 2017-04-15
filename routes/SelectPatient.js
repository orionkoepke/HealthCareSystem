const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');

router.get('/',function(req,res){
  return res.render('SelectPatient');
});

router.post('/', function(req, res){
  console.log("SelectPatient.js post /");
  Patient.find({doctor: req.body.doctors}).then(function(ans){
    console.log("\tans :: " + ans);
    var patients = [];
    for(var i = 0; i < ans.length; i++){
      var patient = {name: "", ssn: ""};
      patient.name = ans[i].firstname + " " + ans[i].lastname;
      patient.SSN = ans[i].SSN;
      patients[i] = patient;
    }
    console.log("\tpatients :: " + patients);
    return res.render('SelectPatient', { patients: patients });
  });
});

module.exports = router;
