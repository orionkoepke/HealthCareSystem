const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');

router.get('/',function(req,res){
  return res.render('SelectAppointmentTreatmentRecord');
});

router.post('/', function(req, res){
  Records.find({PatientSSN: req.body.patients}).then(function(ans){
    var records = [];
    for(var i = 0; i < ans.length; i++){
      var record = {date: "", SSN: ""};
      record.date = ans[i].date;
      record.SSN = ans[i].PatientSSN;
      records[i] = record;
    }
    return res.render('SelectAppointmentTreatmentRecord', { records: records });
  });
});

module.exports = router;