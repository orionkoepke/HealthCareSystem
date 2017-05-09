// Sets up Scheduled Task Module
module.exports = function(testing, date, hour, minute){

    const schedule = require('node-schedule');
    var Users = require('../models/Users');
    var DailyReport = require('../models/DailyReports');
    var MonthlyReport = require('../models/MonthlyReports');
    const moment = require('moment');

    // Sets up rule for Scheduled Task
    var rule = new schedule.RecurrenceRule();

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();

    if(testing === true){
        rule.date = date;
    }else{
        switch (month) {

        case 0:
            rule.date = 31;
            break;
        case 1:
            if(moment(year).isLeapYear()){
                rule.date = 29;
            }else{
                rule.date = 28;
            }
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
    }
    rule.hour = hour;
    rule.minute = minute;

    // Implementation for Scheduled Task
    var j = schedule.scheduleJob(rule,function job(){
        console.log("MakeMonthlyReport firing...");

        // Find all Doctors in Database to create listOfDoctors
        Users.find({ userType: "doctor" }).then(function makeMonthlyReport(listOfDoctors){

            DailyReport.find({ dateOfReport: { $gte: new Date(year,month,1,0,0,0,0), $lt: new Date(year,month,day+1,0,0,0,0) }}).then(function handleDailyReports(reportList){

                if(reportList.length === 0){
                    console.log("There were no daily reports to collate.");
                }else {
                    console.log("There were daily reports to collate");
                    console.log(reportList);

                    // Initalize a new Monthly Report
                    var newMRep = new MonthlyReport();
                    newMRep.dateOfReport = new Date(year,month,day,hour,0,0,0);
                    newMRep.totalPatientsThisMonth = 0;

                    // Initalize array for eachDoctor based on the listOfDoctors
                    listOfDoctors.forEach(function(eachDoctor){
                        newMRep.doctorStats.push({ doctorName: eachDoctor.doctor, numPatientsThisMonth: 0, totalIncome: 0 });
                    });

                    // Sums up doctor stats from Daily Reports to Monthly Report
                    reportList.forEach(function(eachReport){
                        eachReport.doctorStats.forEach(function(eachDoctor){
                            newMRep.doctorStats.forEach(function(eachDoctorInReport){
                                if(eachDoctorInReport.doctorName === eachDoctor.doctorName){
                                    eachDoctorInReport.numPatientsThisMonth += eachDoctor.numPatientsToday;
                                    eachDoctorInReport.totalIncome += eachDoctor.totalIncome;
                                    newMRep.monthlyTotal += eachDoctor.totalIncome;
                                    newMRep.totalPatientsThisMonth += eachDoctor.numPatientsToday;
                                }
                            });
                        });
                    });
                    newMRep.save();
                }
            }).catch(function(e){
                console.log("Couldn't get the list of reports.");
                console.log(e);
            });
        });
    });
};
