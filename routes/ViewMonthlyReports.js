const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var MReports = require('../models/MonthlyReports.js');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
const moment = require('moment');

/*http://localhost:3003/monthlyreports/date*/
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

router.post('/getReport',function getReport(req,res){
  if(!req.session.user){
    return res.render('LoginPage');
  }
  else if(!CheckUserAuthorization(req.session.user.userType,"VMR")){
    return res.render('MainPage',{ permissionError: "You do not have permission to do this."});
  }
  else{
    var dateOfRequestedReport = new Date(req.body.rdate);
    var Year = dateOfRequestedReport.getFullYear();
    var Month = dateOfRequestedReport.getMonth();
    Month++;Month++;
    
    MReports.findOne({dateOfReport: { $gte: dateOfRequestedReport, $lt: new Date(Year,Month,1,0,0,0,0) } }).then(function(MReport){
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
