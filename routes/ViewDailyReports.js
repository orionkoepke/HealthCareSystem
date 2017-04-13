const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var Report = require('../models/DailyReports.js');


/*http://localhost:3003/dailyreports/date*/
router.get('/date',function(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VDR")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    return res.render('ViewDailyReports_PickDate');
  }
});



module.exports = router;
