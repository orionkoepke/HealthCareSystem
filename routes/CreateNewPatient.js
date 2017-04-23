const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');
var User = require('../models/Users.js');

router.get('/', function(req, res){
  User.find({userType: "doctor"}).then(function(ans){
    var doctors = [];
    for(var i = 0; i < ans.length; i++)
    {
      var name = "Dr. " + ans[i].lastname;
      var doctorID = ans.doctor;
      doctors[i] = {name: name, doctorID: doctorID};
    }
    return res.render('CreateNewPatient', {doctors: doctors});
  });
});

router.post('/', function(req, res){
  newPatient = new Patient();
  newPatient.firstname = req.body.firstname;
  newPatient.lastname = req.body.lastname;
  newPatient.address = req.body.address;
  newPatient.phone = req.body.phone;
  newPatient.email = req.body.email;
  newPatient.SSN = req.body.SSN;
  newPatient.insurance = req.body.insurance;
  newPatient.onFilePaymentInfo = req.body.onFilePaymentInfo;
  newPatient.doctor = req.body.doctor;
  newPatient.medicalNotes = req.body.medicalNotes;
  newPatient.save();
  return res.render('MainPage');
});

module.exports = router;
