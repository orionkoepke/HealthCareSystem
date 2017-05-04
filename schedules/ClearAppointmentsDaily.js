// Sets up Scheduled Task Module
module.exports = function(testing, hour, minute){

  const schedule = require('node-schedule');
  const mongoose = require('mongoose');
  var Records = require('../models/Records');
  const chargeNoShow = require('./RecordHandlers/ChargeNoShow');
  const sendPayOnlineEmail = require('./RecordHandlers/SendPayOnlineEmail');

    // Creates rule for Scheduled Task
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
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var offset = today.getTimezoneOffset();

    // Implements Schedule Task
    var j = schedule.scheduleJob(rule,function job(){
        console.log("ClearAppointmentsDaily firing...");
        Records.find({date: { $gte: new Date(year,month,day,0,0,0,0), $lt: new Date(year,month,day+1,0,0-offset,0,0) }}).populate('patientID').then(function handleRecords(recordsList){
            console.log(recordsList);

            // Looks for Records status
            recordsList.forEach(function(eachRecord){
                if(eachRecord.status === "Scheduled" || eachRecord.status === "NoShow"){
                    console.log("Run No Show Charge...");
                    chargeNoShow(eachRecord);
                }else if(eachRecord.status === "InProgress" && eachRecord.payOnline === true && eachRecord.patientCopay > 0){
                    console.log("Send PayOnline Charge Email...");
                    sendPayOnlineEmail(eachRecord);
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
