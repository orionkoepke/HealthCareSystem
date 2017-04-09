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
var InvoiceCounter = require('./models/InvoiceCounter.js');

/*

var dummyPatients = [
    {
    "medicalNotes" : "",
    "doctor" : "WatsonR",
    "onFilePaymentInfo" : "8900988900",
    "insurance" : "Borden Insurance",
    "SSN" : "987678234",
    "email" : "Bcrocker@gmail.com",
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
    "email" : "Bcrocker@gmail.com",
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
    "email" : "Bcrocker@gmail.com",
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
    "email" : "Bcrocker@gmail.com",
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
    "email" : "Bcrocker@gmail.com",
    "phone" : "",
    "address" : "",
    "lastname" : "Milosevich",
    "firstname" : "Kary"
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

*/



var CurrentDate = new Date();
var Year = CurrentDate.getFullYear();
var Month = CurrentDate.getMonth();
var Day = CurrentDate.getDay();

var dummyRecords = [
    {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "invoice" : getInvoiceNumber(),
    "reference" : "",
    "billingAmount" : 80,
    "reasonForVisit" : "",    
    "doctor" : "WatsonR",
    "SSN" : "987678234",
    "date" : new Date(Year,Month,Day,9,0,0,0),
    "lastname" : "Crocker",
    "firstname" : "Betty",
    "payOnline" : false
},
   {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "invoice" : getInvoiceNumber(),
    "reference" : "",
    "billingAmount" : 90,
    "reasonForVisit" : "",    
    "doctor" : "LopezN",
    "SSN" : "987678235",
    "date" : new Date(Year,Month,Day,10,0,0,0),
    "lastname" : "Smith",
    "firstname" : "Joe",
    "payOnline" : false
},
  {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "invoice" : getInvoiceNumber(),
    "reference" : "",
    "billingAmount" : 110,
    "reasonForVisit" : "",    
    "doctor" : "GelfondM",
    "SSN" : "987678236",
    "date" : new Date(Year,Month,Day,11,0,0,0),
    "lastname" : "Jones",
    "firstname" : "Mike",
    "payOnline" : false
},  
    {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "invoice" : getInvoiceNumber(),
    "reference" : "",
    "billingAmount" : 120,
    "reasonForVisit" : "",    
    "doctor" : "ShinM",
    "SSN" : "987678237",
    "date" : new Date(Year,Month,Day,12,0,0,0),
    "lastname" : "Rogers",
    "firstname" : "Jessica",
    "payOnline" : false
},  
   {
    "status" : "Scheduled",
    "treatmentInfo" : "",
    "invoice" : getInvoiceNumber(),
    "reference" : "",
    "billingAmount" : 130,
    "reasonForVisit" : "",    
    "doctor" : "ShinM",
    "SSN" : "987678237",
    "date" : new Date(Year,Month,Day,13,0,0,0),
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
    newRecord.SSN = eachRecord.SSN;
    newRecord.doctor = eachRecord.doctor;
    newRecord.reasonForVisit = eachRecord.reasonForVisit;
    newRecord.billingAmount = eachRecord.billingAmount;
    newRecord.reference = eachRecord.reference;
    newRecord.invoice = eachRecord.invoice;
    newRecord.treatmentInfo = eachRecord.treatmentInfo;
    newRecord.status = eachRecord.status;
});

function getInvoiceNumber(){
    var invoice;
    var updateInvoice;
    var counter = InvoiceCounter.findOne({ ident: "finder" }).then(function(counter){
        console.log(counter);
    }); 
    invoice = counter.counter;
    updateInvoice = invoice + 1;
    InvoiceCounter.findOneAndUpdate({_id: counter._id},{counter: updateInvoice}).then(function(updated){
        console.log(updated);
    });
    return invoice;
};




 






console.log("Program running...");
mongoose.connection.close();