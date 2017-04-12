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
var viewPatientRecord = require('./routes/ViewPatientRecord');
var selectPatient = require('./routes/SelectPatient');
var selectDoctor = require('./routes/SelectDoctor');
var selectAppointmentTreatmentRecord = require('./routes/SelectAppointmentTreatmentRecord');
var unclearedAppointments = require('./routes/UnclearedAppointments');
var viewAppointmentTreatmentRecord = require('./routes/ViewAppointmentTreatmentRecord');
var viewSchedule = require('./routes/ViewSchedule');
var loginAccess = require('./routes/LoginAccess.js');
var viewDReports = require('./routes/ViewDailyReports.js');
var viewMReports = require('./routes/ViewMonthlyReports.js');


app.use('/users',loginAccess);
app.use('/view_patient_record', viewPatientRecord);
app.use('/select_patient', selectPatient);
app.use('/select_doctor', selectDoctor);
app.use('/select_appointment_treatment_record', selectAppointmentTreatmentRecord);
app.use('/uncleared_appointments', unclearedAppointments);
app.use('/view_appointment_treatment_record', viewAppointmentTreatmentRecord);
app.use('/view_schedule', viewSchedule);
app.use('/users', loginAccess);
app.use('/dailyreports', viewDReports);
app.use('/monthlyreports', viewMReports);

// call scheduled task functions here

var ClearAppointmentsDaily = require('./schedules/ClearAppointmentsDaily');
var MakeDailyReport = require('./schedules/MakeDailyReport');
var MakeMonthlyReport = require('./schedules/MakeMonthlyReport');

//ClearAppointmentsDaily(14,15);
//MakeDailyReport(16,31);
MakeMonthlyReport(true,11,16,51);


app.listen(port,function(req,res){
    console.log("Listening on localhost:" + port);
});
