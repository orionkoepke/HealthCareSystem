// Initalize needed connections
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var MReports = require('../models/MonthlyReports.js');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
const moment = require('moment');

/*http://localhost:3003/monthlyreports/date*/
//GET router: Renders web pages based on cookies and user authorization
router.get('/date',function date(req, res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VMR")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    return res.render('ViewMonthlyReports_PickDate');
  }
});

//POST router: Requests information from the broweser to generate Monthly Report, iff the user is a CEO
router.post('/getReport',function getReport(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VMR")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    var dateOfRequestedReport = new Date(req.body.rdate);
      //console.log(dateOfRequestedReport);
    var Year = dateOfRequestedReport.getFullYear();
    var Month = dateOfRequestedReport.getMonth();

    Month++;
    var nextMonth = Month+1;
      //console.log((new Date(Year,Month,1,0,0,0)).toLocaleString());
      //console.log((new Date(Year,nextMonth,1,0,0,0)).toLocaleString());
    
    MReports.findOne({dateOfReport: { $gte: new Date(Year,Month,1,0,0,0), $lt: new Date(Year,nextMonth,1,0,0,0,0) } }).then(function(MReport){
 
        if(MReport === null){
            return res.status(200).render('MonthlyReportViewer',{Report: MReport, ReportDate: null });
        }else {
            var dateOfReport = moment(MReport.dateOfReport.toISOString()).format(' MMMM, YYYY');
            return res.status(200).render('MonthlyReportViewer',{Report: MReport, ReportDate: dateOfReport });
        }
    }).catch(function(e){
        console.log("Rejected Promise Under /getReport: ");
        console.log(e);
    });
  }
});

module.exports = router;
