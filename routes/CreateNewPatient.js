const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');
var User = require('../models/Users.js');

router.get('/',function(req,res){
  User.find({userType: "doctor"}).then(function(ans){
    var doctors = [];
    for(var i = 0; i < ans.length; i++)
    {
      var name = "Dr. " + ans.lastname;
      var doctorID = ans.doctor;
      doctors[i] = {name: name, doctorID: doctorID};
    }
    return res.render('CreateNewPatient', {doctors: doctors});
  });
});

module.exports = router;
