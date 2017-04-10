const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*The monthly report is a summary of daily reports for a month.*/
var MReportSchema = new Schema({
  doctor:{
      type: String,
      required: true
  },

  patients:{
      type: Number,
      required: true
  },

  income:{
      type: Number,
      required: true
  }

});

var MReport = mongoose.model('mreport', MReportSchema);

module.exports = MReport;
