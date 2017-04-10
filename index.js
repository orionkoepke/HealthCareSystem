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
