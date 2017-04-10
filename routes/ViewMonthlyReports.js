const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Report = require('../models/MonthlyReports.js');

/*http://localhost:3003/monthlyreports/date*/
router.get('/date',function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  /*else if(False){
    return res.render('MainPage');
  }*/
  else{
    return res.render('ViewMonthlyReports_PickDate');
  }
});

module.exports = router;
