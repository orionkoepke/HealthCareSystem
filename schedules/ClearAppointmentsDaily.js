module.exports = function(hour, minute){
    
  const schedule = require('node-schedule');
  const mongoose = require('mongoose');
  var Records = require('../models/Records');
  const ChargeNoShow = require('./RecordHandlers/ChargeNoShow');
  const SendPayOnlineEmail = require('./RecordHandlers/SendPayOnlineEmail');
    
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1,5)];
    rule.hour = hour;
    rule.minute = minute;
    
    var today = new Date();
    var Year = today.getFullYear();
    var Month = today.getMonth();
    var Day = today.getDate();
    var Hour = today.getHours();
    
    var j = schedule.scheduleJob(rule,function(){
        console.log("ClearAppointmentsDaily firing...");
        Records.find({date: { $gte: new Date(Year,Month,Day,0,0,0,0)}},function(err,recordsList){
            recordsList.forEach(function(eachRecord){
                if(eachRecord.status === "Scheduled"){
                    console.log("Run No Show Charge...");
                    ChargeNoShow(eachRecord);
                }else if(eachRecord.status === "InProgress" && eachRecord.payOnline === true){
                    /*console.log(eachRecord);
                    console.log("Send PayOnline Charge Email...");*/
                }else if(eachRecord.status === "InProgress" && eachRecord.payOnline === false){
                    /*console.log(eachRecord);
                    console.log("Do nothing for this record...");*/
                }else if(eachRecord.status === "Finalized"){
                    /*console.log(eachRecord);
                     console.log("Finalized: do nothing...");*/
                }else {
                    /*console.log(eachRecord);
                    console.log("Do nothing...");*/
                }
            });
        });
    });
};
                                 
