const mongoose = require('mongoose');

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



var dummyPatients = [
    {
    "medicalNotes" : "",
    "doctor" : "WatsonR",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678234",
    "email" : "seprojectreceiver@gmail.com",
    "phone" : "5671239543",
    "address" : "4719 101st St. Milwaukee, MN 88448",
    "lastname" : "Crocker",
    "firstname" : "Betty"
},
  {
    "medicalNotes" : "",
    "doctor" : "LopezN",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678235",
    "email" : "seprojectreceiver@gmail.com",
    "phone" : "5671239543",
    "address" : "4719 101st St. Milwaukee, MN 88448",
    "lastname" : "Smith",
    "firstname" : "Joe"
},  
    {
    "medicalNotes" : "",
    "doctor" : "GelfondM",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678236",
    "email" : "seprojectreceiver@gmail.com",
    "phone" : "",
    "address" : "",
    "lastname" : "Jones",
    "firstname" : "Mike"
},  
    {
    "medicalNotes" : "",
    "doctor" : "ShinM",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678237",
    "email" : "seprojectreceiver@gmail.com",
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
    "email" : "seprojectreceiver@gmail.com",
    "phone" : "",
    "address" : "",
    "lastname" : "Milosevich",
    "firstname" : "Kary"
}   
];
/*

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
*/




var CurrentDate = new Date();
var Year = CurrentDate.getFullYear();
var Month = CurrentDate.getMonth();
var Day = CurrentDate.getDate();
var offset = CurrentDate.getTimezoneOffset();


var dummyRecords = [
    {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 80,
    "reasonForVisit" : "",    
    "doctor" : "WatsonR",
    "PatientSSN" : "987678234",
    "date" : new Date(Year,Month,Day,9,0-offset,0,0),
    "lastname" : "Crocker",
    "firstname" : "Betty",
    "payOnline" : false
}
   ,{
    "status" : "Finalized",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 90,
    "reasonForVisit" : "",    
    "doctor" : "LopezN",
    "PatientSSN" : "987678235",
    "date" : new Date(Year,Month,Day,10,0-offset,0,0),
    "lastname" : "Smith",
    "firstname" : "Joe",
    "payOnline" : false
},
  {
    "status" : "InProgress",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 110,
    "reasonForVisit" : "",    
    "doctor" : "GelfondM",
    "PatientSSN" : "987678236",
    "date" : new Date(Year,Month,Day,11,0-offset,0,0),
    "lastname" : "Jones",
    "firstname" : "Mike",
    "payOnline" : true
},  
    {
    "status" : "InProgress",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 120,
    "reasonForVisit" : "",    
    "doctor" : "ShinM",
    "PatientSSN" : "987678237",
    "date" : new Date(Year,Month,Day,12,0-offset,0,0),
    "lastname" : "Rogers",
    "firstname" : "Jessica",
    "payOnline" : false
},  
   {
    "status" : "NoShow",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 130,
    "reasonForVisit" : "",    
    "doctor" : "ShinM",
    "PatientSSN" : "987678238",
    "date" : new Date(Year,Month,Day,13,0-offset,0,0),
    "lastname" : "Milosevich",
    "firstname" : "Kary",
    "payOnline" : false
}
];

dummyRecords.forEach(function(eachRecord){
    var newRecord = new ATRecord();
    newRecord.payOnline = eachRecord.payOnline;
    newRecord.firstname = eachRecord.firstname;
    newRecord.lastname = eachRecord.lastname;
    newRecord.date = eachRecord.date;
    newRecord.PatientSSN = eachRecord.PatientSSN;
    newRecord.doctor = eachRecord.doctor;
    newRecord.reasonForVisit = eachRecord.reasonForVisit;
    newRecord.billingAmount = eachRecord.billingAmount;
    newRecord.reference = eachRecord.reference;
    newRecord.treatmentInfo = eachRecord.treatmentInfo;
    newRecord.status = eachRecord.status;
    newRecord.save();
});






 






console.log("Program running...");
mongoose.connection.close();