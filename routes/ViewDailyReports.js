// Initalize needed connections
const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var DReports = require('../models/DailyReports.js');
const moment = require('moment');

/*http://localhost:3003/dailyreports/date*/
//GET router: Renders web pages based on cookies and user authorization
router.get('/date',function date(req, res){
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

//POST router: Requests information from the broweser to generate Daily Report, iff the user is a CEO
router.post('/getReport',function getReport(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VDR")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
      
    var dateOfRequestedReport = new Date(req.body.rdate);
      //console.log(dateOfRequestedReport);
    var Year = dateOfRequestedReport.getFullYear();
    var Month = dateOfRequestedReport.getMonth();
    var theDay = dateOfRequestedReport.getDate();

      theDay++
    var nextDay = theDay+1;
      //console.log((new Date(Year,Month,theDay,0,0,0,0)).toLocaleString());
      //console.log((new Date(Year,Month,nextDay,0,0,0,0)).toLocaleString());
    
    DReports.findOne({dateOfReport: { $gt: new Date(Year,Month,theDay,0,0,0,0), $lt: new Date(Year,Month,nextDay,0,0,0,0) } }).then(function(DReport){
 
        if(DReport === null){
            return res.status(200).render('DailyReportViewer',{Report: DReport, ReportDate: null });
        }else {
            var dateOfReport = moment(DReport.dateOfReport.toISOString()).format('ddd, MMMM, Do, YYYY');
            return res.status(200).render('DailyReportViewer',{Report: DReport, ReportDate: dateOfReport });
        }

    }).catch(function(e){
        console.log("Rejected Promise Under /getReport: ");
        console.log(e);
    });
  }
});


module.exports = router;
