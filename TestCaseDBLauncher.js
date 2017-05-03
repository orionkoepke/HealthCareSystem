/*
	Dummy Data for testing
		-Sets up Patients, Monhtly Reports, and Daily Reports
*/


const mongoose = require('mongoose');
const moment = require('moment');


// connect to mongodb
mongoose.connect('mongodb://localhost:27017/hospitaldb1');
mongoose.connection.once('open',function(){
		console.log('Connection achieved. Begin operations...');
	}).on('error',function(error){
		console.log('Connection error:',error);
	});
mongoose.Promise = global.Promise;

var User = require('./models/Users.js');
var Patient = require('./models/Patients.js');
var ATRecord = require('./models/Records.js');
var DReports = require('./models/DailyReports');
var MReports = require('./models/MonthlyReports');

var CurrentDate = moment();
var Year = CurrentDate.year();
var Month = CurrentDate.month();
var Day = CurrentDate.date();
var offset = new Date().getTimezoneOffset();
var email = "seprojectreceiver@gmail.com";

// Add new patients.
var dummyPatients = [
    {
    "medicalNotes" : "",
    "doctor" : "WatsonR",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678234",
    "email" : email,
    "phone" : "5671239543",
    "address" : "4719 101st St. Milwaukee, MN 88448",
    "lastname" : "Crocker",
    "firstname" : "Betty"
},
    {
    "medicalNotes" : "",
    "doctor" : "WatsonR",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678242",
    "email" : email,
    "phone" : "5671239543",
    "address" : "4719 101st St. Milwaukee, MN 88448",
    "lastname" : "Stewart",
    "firstname" : "Martha"
},
  {
    "medicalNotes" : "",
    "doctor" : "LopezN",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678235",
    "email" : email,
    "phone" : "5671239543",
    "address" : "4719 101st St. Milwaukee, MN 88448",
    "lastname" : "Smith",
    "firstname" : "Joe"
},
    {
    "medicalNotes" : "",
    "doctor" : "LopezN",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678243",
    "email" : email,
    "phone" : "987678243",
    "address" : "4719 101st St. Milwaukee, MN 88448",
    "lastname" : "de la Vega",
    "firstname" : "Maria de la Santa Cruz Rosalina Agnelia Rodriguez Cuellar Rene"
},
    {
    "medicalNotes" : "",
    "doctor" : "GelfondM",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678236",
    "email" : email,
    "phone" : "",
    "address" : "",
    "lastname" : "Jones",
    "firstname" : "Mike"
},
    {
    "medicalNotes" : "",
    "doctor" : "GelfondM",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678241",
    "email" : email,
    "phone" : "",
    "address" : "",
    "lastname" : "Karkov",
    "firstname" : "Dmitry"
},
    {
    "medicalNotes" : "",
    "doctor" : "ShinM",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678237",
    "email" : email,
    "phone" : "",
    "address" : "",
    "lastname" : "Rogers",
    "firstname" : "Jessica"
},
    {
    "medicalNotes" : "",
    "doctor" : "MengelS",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678238",
    "email" : email,
    "phone" : "",
    "address" : "",
    "lastname" : "Milosevich",
    "firstname" : "Kary"
},
    {
    "medicalNotes" : "",
    "doctor" : "MengelS",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678239",
    "email" : email,
    "phone" : "",
    "address" : "",
    "lastname" : "Corvin",
    "firstname" : "Kyle"
},
    {
    "medicalNotes" : "",
    "doctor" : "ShinM",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678240",
    "email" : email,
    "phone" : "",
    "address" : "",
    "lastname" : "Chun",
    "firstname" : "Gracy"
}
];

dummyPatients.forEach(function(patientRec){
    var newPatient = new Patient();
    newPatient.firstname = patientRec.firstname;
    newPatient.lastname = patientRec.lastname;
    newPatient.address = patientRec.address;
    newPatient.phone = patientRec.phone;
    newPatient.email = patientRec.email;
    newPatient.SSN = patientRec.SSN;
    newPatient.insurance = patientRec.insurance;
    newPatient.onFilePaymentInfo = patientRec.onFilePaymentInfo;
    newPatient.doctor = patientRec.doctor;
    newPatient.medicalNotes = patientRec.medicalNotes;
    newPatient.save();
});

// Add new daily reports.  Note: There will not be corresponding atrecords for these reports.
var dummyReports = [
    {
  dailyTotal: 0,
    dateOfReport: new Date(Year,Month,3,21,0-offset,0,0),
    totalPatientsToday: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsToday: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsToday: 0,
        totalIncome: 0
    }]
},
    {
  dailyTotal: 0,
    dateOfReport: new Date(Year,Month,4,21,0-offset,0,0),
    totalPatientsToday: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsToday: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsToday: 0,
        totalIncome: 0
    }]
},
    {
  dailyTotal: 0,
    dateOfReport: new Date(Year,Month,5,21,0-offset,0,0),
    totalPatientsToday: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsToday: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsToday: 0,
        totalIncome: 0
    }]
},
    {
  dailyTotal: 0,
    dateOfReport: new Date(Year,Month,6,21,0-offset,0,0),
    totalPatientsToday: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsToday: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsToday: 0,
        totalIncome: 0
    }]
},
    {
  dailyTotal: 0,
    dateOfReport: new Date(Year,Month,7,21,0-offset,0,0),
    totalPatientsToday: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsToday: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsToday: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsToday: 0,
        totalIncome: 0
    }]
}
];

dummyReports.forEach(function(eachReport){
    var newDReport = new DReports();
    newDReport.dateOfReport = eachReport.dateOfReport;
    newDReport.doctorStats = [];
    newDReport.dailyTotal = 0;
    newDReport.totalPatientsToday = 0;
    eachReport.doctorStats.forEach(function(eachDoctorStat){
        eachDoctorStat.numPatientsToday = Math.round(Math.random()*16);
        eachDoctorStat.totalIncome = Math.round(Math.random()*2000);
        newDReport.doctorStats.push(eachDoctorStat);
        newDReport.dailyTotal += eachDoctorStat.totalIncome;
        newDReport.totalPatientsToday += eachDoctorStat.numPatientsToday;
    });
    newDReport.save();
});

// Add new monthly reports.  Note: These are just for testing the view functions.
var dummyMReports = [
    {
  monthlyTotal: 0,
    dateOfReport: new Date(Year,Month-1,31,0,0,0,0),
    totalPatientsThisMonth: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsThisMonth: 0,
        totalIncome: 0
    }]
},
    {
  monthlyTotal: 0,
    dateOfReport: new Date(Year,Month-2,28,0,0,0,0),
    totalPatientsThisMonth: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsThisMonth: 0,
        totalIncome: 0
    }]
},
    {
  monthlyTotal: 0,
    dateOfReport: new Date(Year,Month-3,31,0,0,0,0),
    totalPatientsThisMonth: 0,
    doctorStats: [{
        doctorName: "WatsonR",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },
    {
        doctorName: "LopezN",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "GelfondM",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "ShinM",
        numPatientsThisMonth: 0,
        totalIncome: 0
    },{
        doctorName: "MengelS",
        numPatientsThisMonth: 0,
        totalIncome: 0
    }]
}
];

dummyMReports.forEach(function(eachReport){
    var newMReport = new MReports();
    newMReport.dateOfReport = eachReport.dateOfReport;
    newMReport.doctorStats = [];
    newMReport.monthlyTotal = 0;
    newMReport.totalPatientsThisMonth = 0;
    eachReport.doctorStats.forEach(function(eachDoctorStat){
        eachDoctorStat.numPatientsThisMonth = Math.round(Math.random()*320);
        eachDoctorStat.totalIncome = Math.round(Math.random()*40000);
        newMReport.doctorStats.push(eachDoctorStat);
        newMReport.monthlyTotal += eachDoctorStat.totalIncome;
        newMReport.totalPatientsThisMonth += eachDoctorStat.numPatientsThisMonth;
    });
    newMReport.save();
});


console.log("Program running...");
console.log("Ctrl+C to exit.")
