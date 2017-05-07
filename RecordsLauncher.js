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


var CurrentDate = new Date();
var Year = CurrentDate.getFullYear();
var Month = CurrentDate.getMonth();
var Day = CurrentDate.getDate();
var offset = CurrentDate.getTimezoneOffset();
offset = 0;
//Day = Day - 1;


// Add new ATRecords
var dummyRecords = [
//////////////////////////WatsonR//////////////
    {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 80,
    "reasonForVisit" : "",    
    "doctor" : "WatsonR",
    "PatientSSN" : "987678242",
    "date" : new Date(Year,Month,Day,9,0-offset,0,0),
    "lastname" : "Stewart",
    "firstname" : "Martha",
    "payOnline" : false
},
    {
    "status" : "InProgress",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 80,
    "reasonForVisit" : "",    
    "doctor" : "WatsonR",
    "PatientSSN" : "987678234",
    "date" : new Date(Year,Month,Day,17,30-offset,0,0),
    "lastname" : "Crocker",
    "firstname" : "Betty",
    "payOnline" : false
},
    ////////////////////////////////LopezN//////////////////////////
    {
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
    "billingAmount" : 90,
    "reasonForVisit" : "",    
    "doctor" : "LopezN",
    "PatientSSN" : "987678243",
    "date" : new Date(Year,Month,Day,11,0-offset,0,0),
    "lastname" : "de la Vega",
    "firstname" : "Maria de la Santa Cruz Rosalina Agnelia Rodriguez Cuellar Alejandra",
    "payOnline" : true
},
    //////////////////////////////////////////GelfondM/////////////////////////////////
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
    "billingAmount" : 110,
    "reasonForVisit" : "",    
    "doctor" : "GelfondM",
    "PatientSSN" : "987678241",
    "date" : new Date(Year,Month,Day,13,0-offset,0,0),
    "lastname" : "Karkov",
    "firstname" : "Dmitry",
    "payOnline" : true
},  
    ///////////////////////////////////////ShinM///////////////////////////////////////////
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
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 120,
    "reasonForVisit" : "",    
    "doctor" : "ShinM",
    "PatientSSN" : "987678240",
    "date" : new Date(Year,Month,Day,15,0-offset,0,0),
    "lastname" : "Chun",
    "firstname" : "Gracy",
    "payOnline" : false
},  
    //////////////////////////////////////////////MengelS////////////////////////////////////////
    {
    "status" : "NoShow",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 130,
    "reasonForVisit" : "",    
    "doctor" : "MengelS",
    "PatientSSN" : "987678238",
    "date" : new Date(Year,Month,Day,13,0-offset,0,0),
    "lastname" : "Milosevich",
    "firstname" : "Kary",
    "payOnline" : false
},
    {
    "status" : "InProgress",
    "treatmentInfo" : "",
    "reference" : "",
    "billingAmount" : 130,
    "reasonForVisit" : "",    
    "doctor" : "MengelS",
    "PatientSSN" : "987678239",
    "date" : new Date(Year,Month,Day,13,30-offset,0,0),
    "lastname" : "Corvin",
    "firstname" : "KYle",
    "payOnline" : false
}
];


dummyRecords.forEach(function(eachRecord){
    Patient.findOne({ SSN: eachRecord.PatientSSN }).then(function(patientsInfo){
        var newRecord = new ATRecord();
        newRecord.patientID = patientsInfo._id;
        newRecord.payOnline = eachRecord.payOnline;
        newRecord.date = eachRecord.date;
        newRecord.reasonForVisit = eachRecord.reasonForVisit;
        newRecord.billingAmount = eachRecord.billingAmount;
        newRecord.reference = eachRecord.reference;
        newRecord.treatmentInfo = eachRecord.treatmentInfo;
        newRecord.status = eachRecord.status;
        newRecord.doctor = eachRecord.doctor;
        newRecord.patientCopay = Math.round(eachRecord.billingAmount * Math.random());
        newRecord.save();
    }).catch(function(e2){
        console.log("Didn't find.");
        console.log(e2);
    });
});

console.log("Program running...");
console.log("Ctrl+C to exit.");
