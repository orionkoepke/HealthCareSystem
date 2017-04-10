const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Patients.js');

router.get('/',function(req,res){
  var doctorId = req.body.doctors;
  var patients = [];
  User.find({userType: "doctor", })
  return res.render('SelectPatient');
});

module.exports = router;
