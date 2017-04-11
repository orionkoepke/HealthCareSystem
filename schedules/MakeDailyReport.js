module.exports = function(hour, minute){
    
  var schedule = require('node-schedule');
    
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1,5)];
    rule.hour = hour;
    rule.minute = minute;
    
    var j = schedule.scheduleJob(rule,function(){
        console.log("MakeDailyReport firing...");
    });
};