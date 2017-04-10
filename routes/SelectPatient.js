const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');

router.get('/',function(req,res){
  return res.render('SelectPatient');
});

router.post('/', function(req, res){
  return res.render('SelectPatient');
});

module.exports = router;
