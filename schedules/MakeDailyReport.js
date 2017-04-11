module.exports = function(hour, minute){
    
  var schedule = require('node-schedule');
    var Records = require('../models/Records');
    var Users = require('../models/Users');
    var DailyReport = require('../models/DailyReports');
    
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1,5)];
    rule.hour = hour;
    rule.minute = minute;
    
    var today = new Date();
    var Year = today.getFullYear();
    var Month = today.getMonth();
    var Day = today.getDate();
    var Hour = today.getHours();
    
    var listOfDoctors = [];        
    
    var j = schedule.scheduleJob(rule,function(){
        console.log("MakeDailyReport firing...");
        
        // Get list of doctors
        Users.find({userType: "doctor"}).then(function(theList){
            theList.forEach(function(user){
                listOfDoctors.push(user.doctor);
            });
        }).then(function(){
            // Get today's list of records
            Records.find({date: { $gte: new Date(Year,Month,Day,0,0,0,0)}},function(err,recordsList){
                var newDRep = new DailyReport();
                newDRep.dateOfReport = new Date(Year,Month,Day,Hour,0,0,0);
                // Initialize each entry under doctorStats
                listOfDoctors.forEach(function(eachDoctor){
                    newDRep.doctorStats.push({ doctorName: eachDoctor, numPatientsToday: 0, totalIncome: 0 });
                });
                // Update the entries with figures from the records
                recordsList.forEach(function(eachRecord){
                    newDRep.doctorStats.forEach(function(thisEntry){
                        if(eachRecord.doctor === thisEntry.doctorName){
                            thisEntry.numPatientsToday += 1;
                            thisEntry.totalIncome = thisEntry.totalIncome + eachRecord.billingAmount;
                        }
                    });
                    newDRep.dailyTotal = newDRep.dailyTotal + eachRecord.billingAmount;
                });
                newDRep.save();
                console.log(newDRep);
            }).catch(function(e){
                console.log("Caught a promise: ");
                console.log(e);
            });
        }).catch(function(e){
            console.log("Couldn't get the list of users.");
            console.log(e);
        });
    });
};