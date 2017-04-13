const moment = require('moment');
moment().format();

var rightNow = moment().toString();

var Year = moment().year();
var Month = moment().month();
var Day = moment().date();
var Hour = moment().hour();
var Minutes = moment().minute();
var Seconds = moment().second();
var Milliseconds = moment().millisecond();

var localRightNow = new Date(Year,Month,Day,Hour-5,Minutes,Seconds,Milliseconds);



console.log(rightNow);
console.log(localRightNow);
console.log(new Date(Year,Month,1,-5,0,0,0));
console.log(new Date(moment().toString()));

// new Date().toLocaleDateString("en-US", {timeZone: "America/Chicago"})