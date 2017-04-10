const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DReportSchema = new Schema({
  doctor:{
      type: String,
      required: true
  },
  /*Count the number of patient records for that day0
  Not Fully Finished*/
  patients:{
      type: Number,
      required: true
  },

  income:{
      type: Number,
      required: true
  }

});

var DReport = mongoose.model('dreport', DReportSchema);

module.exports = DReport;
