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


var Userdata = [
    //Staff //////////////////////////////////////
    {
    doctor : "",
    userType : "staff",
    SSN : "098765434",
    password : "HJKL",
    username : "DPost",
    lastname : "Post",
    firstname : "Dave"
},
    {
    doctor : "",
    userType : "staff",
    SSN : "098765435",
    password : "HJKL",
    username : "SMaclaine",
    lastname : "Maclaine",
    firstname : "Shirley"
},
    {
    doctor : "",
    userType : "staff",
    SSN : "098765436",
    password : "HJKL",
    username : "LSherbet",
    lastname : "Sherbet",
    firstname : "Liz"
},
    //CEO ///////////////////////////////////////////////
    {
    doctor : "",
    userType : "ceo",
    SSN : "098765437",
    password : "HJKL",
    username : "CKent",
    lastname : "Kent",
    firstname : "Clark"
},
    //Doctors /////////////////////////////////////////////
    {
    doctor : "WatsonR",
    userType : "doctor",
    SSN : "135792468",
    password : "HJKL",
    username : "RWatson",
    lastname : "Watson",
    firstname : "Richard"
},
    {
    doctor : "LopezN",
    userType : "doctor",
    SSN : "135792467",
    password : "HJKL",
    username : "NLopez",
    lastname : "Lopez-Benitez",
    firstname : "Noe"
},
    {
    doctor : "GelfondM",
    userType : "doctor",
    SSN : "135792466",
    password : "HJKL",
    username : "MGelfond",
    lastname : "Gelfond",
    firstname : "Michael"
},
    {
    doctor : "ShinM",
    userType : "doctor",
    SSN : "135792465",
    password : "HJKL",
    username : "MShin",
    lastname : "Shin",
    firstname : "Michael"
},
    {
    doctor : "MengelS",
    userType : "doctor",
    SSN : "135792464",
    password : "HJKL",
    username : "SMengel",
    lastname : "Mengel",
    firstname : "Susan"
},
    //Nurses //////////////////////////////////////////////////////////////////////////
    {
    doctor : "WatsonR",
    userType : "nurse",
    SSN : "102938475",
    password : "HJKL",
    username : "CBurnett",
    lastname : "Burnett",
    firstname : "Carol"
},
    {
    doctor : "LopezN",
    userType : "nurse",
    SSN : "102938474",
    password : "HJKL",
    username : "DeGeneresE",
    lastname : "DeGeneres",
    firstname : "Ellen"
},
    {
    doctor : "GelfondM",
    userType : "nurse",
    SSN : "102938473",
    password : "HJKL",
    username : "LBall",
    lastname : "Lucille",
    firstname : "Ball"
},
    {
    doctor : "ShinM",
    userType : "nurse",
    SSN : "102938472",
    password : "HJKL",
    username : "WGoldberg",
    lastname : "Goldberg",
    firstname : "Whoopi"
},
    {
    doctor : "MengelS",
    userType : "nurse",
    SSN : "102938471",
    password : "HJKL",
    username : "KGriffin",
    lastname : "Griffin",
    firstname : "Kathy"
}
];


Userdata.forEach(function(AUser){
   var newUser = new User();
    newUser.firstname = AUser.firstname;
    newUser.lastname = AUser.lastname;
    newUser.username = AUser.username;
    newUser.password = AUser.password;
    newUser.SSN = AUser.SSN;
    newUser.userType = AUser.userType;
    newUser.doctor = AUser.doctor;
    newUser.save();
});










console.log("Program running...");
mongoose.connection.close();
