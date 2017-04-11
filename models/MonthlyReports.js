const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*The monthly report is a summary of daily reports for a month.*/
var MReportSchema = new Schema({
  monthlyTotal: {
    type: Number,
      default: 0
  },
    dateOfReport: {
        type: Date
    },
    doctorStats: [{
        doctorName: String,
        numPatientsToday: Number,
        totalIncome: Number
    }]
});

var MReport = mongoose.model('mreport', MReportSchema);

module.exports = MReport;
