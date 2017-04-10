const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/hospitaldb1');
mongoose.connection.once('open',function(){
		console.log('Connection achieved. Begin operations...');
	}).on('error',function(error){
		console.log('Connection error:',error);
	});
mongoose.Promise = global.Promise;

// ensure invoice counter is setup
var InvoiceNumberCounter = require('./models/InvoiceCounter');
InvoiceNumberCounter.find({},function(err,counter){
    if(counter.length === 0){
        var Counter = new InvoiceNumberCounter();
        Counter.counter = 10000;
        Counter.save();
    }else if (counter.length > 1) {
        console.log("Too many records in InvoiceNumberCounter.");
    }else {
        console.log("InvoiceNumberCounter set up correctly.");
    }
});

/*var User = require('./models/Users.js');
var newUser = new User();
newUser.firstname = "Dave";
newUser.lastname = "Post";
newUser.username = "DPost2";
newUser.password = "HJKL";
newUser.SSN = "098765433";
newUser.userType = "staff";
newUser.doctor = "";

newUser.save();*/

/*var Patient = require('./models/Patients.js');
var newPatient = new Patient();
newPatient.firstname = "Betty";
newPatient.lastname = "Crocker";
newPatient.address = "4719 101st St. Milwaukee, MN 88448";
newPatient.phone = "5671239543";
newPatient.email = "Bcrocker@gmail.com";
newPatient.SSN = "987678234";
newPatient.insurance = "Borden Insurance";
newPatient.onFilePaymentInfo = "8900988900";
newPatient.doctor = "WatsonDM";
newPatient.medicalNotes = "";

newPatient.save();*/

/*var ATRecord = require('./models/Records.js');
var newATRecord = new ATRecord();
newATRecord.firstname = "Betty";
newATRecord.lastname = "Crocker";
newATRecord.date = new Date(2017,5,4,16,0,0);
newATRecord.SSN = "172490912";
newATRecord.doctor = "WatsonDM";
newATRecord.age = 47;
newATRecord.weight = 153;
newATRecord.height = 66;
newATRecord.bloodPressure = [130,85];
newATRecord.reasonForVisit = "";
newATRecord.billingAmount = 97.50;
newATRecord.reference = "1029384756";
newATRecord.invoice = "1425364758";
newATRecord.treatmentInfo = "";
newATRecord.status = "Scheduled";

newATRecord.save();*/





const app = express();
var port = 3003;



// set up views and view engine
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('public'));

// set-up body-parser and session before routes
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:"lwqfhaodhgkskj173iegkj_",resave:false, saveUninitialized:true}));

// initialize routes here

var loginAccess = require('./routes/LoginAccess.js');

var viewDReports = require('./routes/ViewDailyReports.js');

var viewMReports = require('./routes/ViewMonthlyReports.js');



app.use('/users', loginAccess);
app.use('/dailyreports', viewDReports);
app.use('/monthlyreports', viewMReports);

// call scheduled task functions here








app.listen(port,function(req,res){
    console.log("Listening on localhost:" + port);
});
