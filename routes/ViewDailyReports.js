const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Report = require('../models/DailyReports.js');

/*http://localhost:3003/dailyreports/date*/
router.get('/date',function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  /*else if(False){
    return res.render('MainPage');
  }*/
  else{
    return res.render('ViewDailyReport_PickDate');
  }
});

module.exports = router;
