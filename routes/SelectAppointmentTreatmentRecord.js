const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');

router.get('/',function(req,res){
  return res.render('SelectAppointmentTreatmentRecord');
});

router.post('/', function(req, res){
  Records.find({PatientSSN: req.body.patients}).then(function(ans){
    console.log(req.body.patients);
    var records = [];
    for(var i = 0; i < ans.length; i++){
      var record = {date: "", doctor: ""};
      record.date = "DATE: " + ans[i].date;
      record.ssn = ans[i].PatientSSN;
      records[i] = record;
    }
    console.log(records);
    return res.render('SelectAppointmentTreatmentRecord', { records: records });
  });
});

module.exports = router;
