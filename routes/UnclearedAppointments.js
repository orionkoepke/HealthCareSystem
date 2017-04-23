const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Record = require('../models/Records.js');

router.get('/',function(req,res){
  Record.find({status: "Scheduled"}).then(function(ans){
    return res.render('UnclearedAppointments', {unclearedAppointments: ans});
  });
});

module.exports = router;
