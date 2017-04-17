const express = require('express');
const mongoose = require('mongoose');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
var router = express.Router();
var DReports = require('../models/DailyReports.js');
const moment = require('moment');


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

router.post('/getReport',function(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VDR")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    var dateOfRequestedReport = new Date(req.body.rdate);
    var Year = dateOfRequestedReport.getFullYear();
    var Month = dateOfRequestedReport.getMonth();
    var theDay = dateOfRequestedReport.getDate();
    theDay++;theDay++;
    
    DReports.findOne({dateOfReport: { $gte: dateOfRequestedReport, $lte: new Date(Year,Month,theDay,-5,0,0,0) } }).then(function(DReport){
        if(DReport === null){
            return res.status(200).render('DailyReportViewer',{Report: DReport, ReportDate: null });
        }else {
            var dateOfReport = moment(DReport.dateOfReport.toISOString()).format('ddd, MMMM, Do, YYYY');
            console.log(dateOfReport);        
            return res.status(200).render('DailyReportViewer',{Report: DReport, ReportDate: dateOfReport });
        }
        
    }).catch(function(e){
        console.log("Rejected Promise Under /getReport: ");
        console.log(e);
    });
  }
});


module.exports = router;
