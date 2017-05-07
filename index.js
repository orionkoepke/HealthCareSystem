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

var loginAccess = require('./routes/LoginAccess');
var viewDailyReports = require('./routes/ViewDailyReports.js');
var viewMonthlyReports = require('./routes/ViewMonthlyReports.js');
var payOnline = require('./routes/PayOnline.js');
var processPayment = require('./routes/ProcessPayment');
var makeAppointment = require('./routes/MakeAppointment');
var changeAppointment = require('./routes/ChangeAppointment');
var cancelAppointment = require('./routes/CancelAppointment');
var createNewPatientRecord = require('./routes/CreateNewPatientRecord');
var clearAppointment = require('./routes/ClearAppointment');
var viewPatientTreatmentRecords = require('./routes/ViewPatientTreatmentRecords');
var updatePatientTreatmentRecord = require('./routes/UpdatePatientTreatmentRecord');
var viewPatientInformation = require('./routes/ViewPatientInformation');
var updatePatientInformation = require('./routes/UpdatePatientInformation');


app.use('/users',loginAccess);
app.use('/dailyreports', viewDailyReports);
app.use('/monthlyreports', viewMonthlyReports);
app.use('/payMyBill', payOnline);
app.use('/pay',processPayment);
app.use('/make_appointment', makeAppointment);
app.use('/change_appointment', changeAppointment);
app.use('/cancel_appointment', cancelAppointment);
app.use('/create_new_patient_record', createNewPatientRecord);
app.use('/clear_appointment', clearAppointment);
app.use('/view_patient_treatment_records', viewPatientTreatmentRecords);
app.use('/update_patient_treatment_record', updatePatientTreatmentRecord);
app.use('/view_patient_information', viewPatientInformation);
app.use('/update_patient_information', updatePatientInformation);

// call scheduled task functions here

var clearAppointmentsDaily = require('./schedules/ClearAppointmentsDaily');
var makeDailyReport = require('./schedules/MakeDailyReport');
var makeMonthlyReport = require('./schedules/MakeMonthlyReport');

//(bool value for built in switch statement, hh, mm) Time is in Military Time
//clearAppointmentsDaily(true,16,39);
//makeDailyReport(true,18,11);
//(bool value, dd, hh, mm)
//makeMonthlyReport(true,6,18,59);


app.listen(port,function(req,res){
    console.log("Listening on localhost:" + port);
});
