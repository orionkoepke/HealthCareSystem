const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');


var ATRecordSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        required: true
    },
    PatientSSN: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    bloodPressure: {
        type: [Number]
    },
    reasonForVisit: {
        type: String
    },
    billingAmount: {
        type: Number
    },
    reference: {
        type: String
    },
    treatmentInfo: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    payOnline: {
        type: Boolean,
        default: false
    }
});

var ATRecords = mongoose.model('atrecords',ATRecordSchema);
ATRecords.collection.dropIndexes(function (err, results) {
    // Handle errors
});

module.exports = ATRecords;
