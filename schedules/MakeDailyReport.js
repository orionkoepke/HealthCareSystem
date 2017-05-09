// Sets up Scheduled Task Module
module.exports = function(testing, hour, minute){

    const schedule = require('node-schedule');
    var Records = require('../models/Records');
    var Users = require('../models/Users');
    var DailyReport = require('../models/DailyReports');

    // Creates rule for Scheduled Task
    var rule = new schedule.RecurrenceRule();
    if(testing){
        rule.dayOfWeek = [new schedule.Range(0,6)];
    }else{
        rule.dayOfWeek = [new schedule.Range(1,5)];
    }
    rule.hour = hour;
    rule.minute = minute;

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();

    var listOfDoctors = [];

    // Implements the scheduled Task
    var j = schedule.scheduleJob(rule,function job(){
        console.log("MakeDailyReport firing...");

        // Get list of doctors
        Users.find({userType: "doctor"}).then(function getDoctorList(theList){
            theList.forEach(function(user){
                listOfDoctors.push(user.doctor);
            });
        }).then(function collateData(){

            // Get today's list of records

            Records.find({date: { $gte: new Date(year,month,day,9,0,0,0), $lt: new Date(year,month,day,18,0,0,0) }}).populate('patientID').then(function handleRecords(recordsList){
                

                console.log(recordsList);

                var newDRep = new DailyReport();
                newDRep.dateOfReport = new Date(year,month,day,hour,0,0,0);
                newDRep.totalPatientsToday = 0;

                // Initialize each entry under doctorStats
                listOfDoctors.forEach(function(eachDoctor){
                    newDRep.doctorStats.push({ doctorName: eachDoctor, numPatientsToday: 0, totalIncome: 0 });
                });

                // Update the entries with figures from the records
                recordsList.forEach(function(eachRecord){
                    newDRep.doctorStats.forEach(function(thisEntry){
                        if(eachRecord.patientID.doctor === thisEntry.doctorName){
                            thisEntry.numPatientsToday += 1;
                            thisEntry.totalIncome = thisEntry.totalIncome + eachRecord.billingAmount;
                        }
                    });
                    newDRep.dailyTotal = newDRep.dailyTotal + eachRecord.billingAmount;
                    newDRep.totalPatientsToday = newDRep.totalPatientsToday + 1;
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
