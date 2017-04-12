module.exports = function(testing, date, hour, minute){
    
  var schedule = require('node-schedule');
    var DailyReport = require('../models/DailyReports');    
    var MonthlyReport = require('../models/MonthlyReports');
    
    var rule = new schedule.RecurrenceRule();
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    
    switch (currentMonth) {
                
        case 0:  
            rule.date = 31;
            break;
        case 1: 
            rule.date = 28;
            break;
        case 2: 
            rule.date = 31;     
            break;
        case 3: 
            rule.date = 30;     
            break;
        case 4: 
            rule.date = 31;     
            break;
        case 5: 
            rule.date = 30;     
            break;
        case 6: 
            rule.date = 31;     
            break;
        case 7: 
            rule.date = 31;     
            break;
        case 8: 
            rule.date = 30;     
            break;
        case 9: 
            rule.date = 31;     
            break;
        case 10: 
            rule.date = 31;     
            break;
        case 11: 
            rule.date = 31;     
            break;
    }
    
    if(testing === true){
        rule.date = date;
    }
    rule.hour = hour;
    rule.minute = minute;
    
    var today = new Date();
    var Year = today.getFullYear();
    var Month = today.getMonth();
    var Day = today.getDate();
    var Hour = today.getHours();
    
    var j = schedule.scheduleJob(rule,function(){
        console.log("MakeMonthlyReport firing...");
        
        DailyReport.find({}).then(function(reportList){
            console.log(reportList);
            /* Stopped here.  The reports have been extracted from the database. */
        }).catch(function(e){
            console.log("Couldn't get the list of reports.");
            console.log(e);
        });
    });
};