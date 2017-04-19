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

var Now = new Date();
var year = Now.getFullYear();
var month = Now.getMonth();
var day = Now.getDate();
var hour = Now.getHours();
var minutes = Now.getMinutes();
var seconds = Now.getSeconds();
var milliseconds = Now.getMilliseconds();
var offset = Now.getTimezoneOffset();

var thisMoment = new Date(year,month,day,hour,minutes-offset,seconds,milliseconds);
var offset = new Date().getTimezoneOffset();

console.log(offset);



/*console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());*/

// new Date().toLocaleDateString("en-US", {timeZone: "America/Chicago"})