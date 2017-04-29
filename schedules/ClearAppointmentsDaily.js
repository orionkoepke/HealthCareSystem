module.exports = function(testing, hour, minute){
    
  const schedule = require('node-schedule');
  const mongoose = require('mongoose');
  var Records = require('../models/Records');
  const ChargeNoShow = require('./RecordHandlers/ChargeNoShow');
  const SendPayOnlineEmail = require('./RecordHandlers/SendPayOnlineEmail');
    
    var rule = new schedule.RecurrenceRule();
    if(testing){
        rule.dayOfWeek = [new schedule.Range(0,6)];        
    }else{
        rule.dayOfWeek = [new schedule.Range(1,5)]; 
    }
    rule.dayOfWeek = [new schedule.Range(1,5)];
    rule.hour = hour;
    rule.minute = minute;
    
    var today = new Date();
    var Year = today.getFullYear();
    var Month = today.getMonth();
    var Day = today.getDate();
    
    var j = schedule.scheduleJob(rule,function(){
        console.log("ClearAppointmentsDaily firing...");
        Records.find({date: { $gte: new Date(Year,Month,Day,0,0,0,0)}}).populate('patientID').then(function(recordsList){
            console.log(recordsList);
            recordsList.forEach(function(eachRecord){
                if(eachRecord.status === "Scheduled"){
                    console.log("Run No Show Charge...");
                    ChargeNoShow(eachRecord);
                }else if(eachRecord.status === "InProgress" && eachRecord.payOnline === true && eachRecord.patientCopay > 0){
                    console.log("Send PayOnline Charge Email...");
                    SendPayOnlineEmail(eachRecord);                
                }else {
                    /*console.log(eachRecord);
                    console.log("Do nothing...");*/
                }
            });
        }).catch(function(e){
            console.log("Caught a promise: " + e);
        });
    });
};
                                 
