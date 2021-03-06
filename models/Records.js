const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ATRecordSchema = new Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients'
    },    
    date: {
        type: Date,
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
    doctor: {
        type: String
    },
    billingAmount: {
        type: Number
    },
    patientCopay: {
        type: Number,
        default: 0
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
