const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DReportSchema = new Schema({
  dailyTotal: {
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

var DReport = mongoose.model('dreport', DReportSchema);

module.exports = DReport;
