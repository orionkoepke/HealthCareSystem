const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');

router.get('/',function(req,res){
  return res.render('ViewPatientRecord');
});

router.post('/', function(req, res){
  Patient.find({SSN: req.body.patients}).then(function(ans){
    console.log(ans)
    return res.render('ViewPatientRecord', { patient: ans[0] });
  });
});

module.exports = router;
