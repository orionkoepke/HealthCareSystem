//Sets up module for scheduled task to create monthly report
module.exports = function(testing, date, hour, minute){

    const schedule = require('node-schedule');
    var DailyReport = require('../models/DailyReports');
    var MonthlyReport = require('../models/MonthlyReports');
    const moment = require('moment');

    //Create rule for schedule task
    var rule = new schedule.RecurrenceRule();
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();


    if(testing === true){
        rule.date = date;
    }else{
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
    }
    rule.hour = hour;
    rule.minute = minute;

    var year = moment().year();
    var month = moment().month();
    var day = moment().date();
    var hour = moment().hour();
    var offset = new Date().getTimezoneOffset();

    //schedule Task Implementation
    var j = schedule.scheduleJob(rule,function job(){
        console.log("MakeMonthlyReport firing...");
        //Get daily reports for this month
        DailyReport.find({ dateOfReport: { $gte: new Date(year,month,0,0,0,0,0) }}).then(function handleDailyReports(reportList){

            if(reportList.length === 0){
                console.log("There were no daily reports to collate.");
            }else {
                console.log("There were daily reports to collate");

                //Create new Monthly Report
                var newMRep = new MonthlyReport();
                newMRep.dateOfReport = new Date(year,month,day,hour,0-offset,0,0);
                newMRep.totalPatientsThisMonth = 0;

                reportList[0].doctorStats.forEach(function(eachDoctor){
                    newMRep.doctorStats.push({ doctorName: eachDoctor.doctorName, numPatientsThisMonth: 0, totalIncome: 0 });
                });


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
};
