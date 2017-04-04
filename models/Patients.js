const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
      type: String,
      required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
      type: String  
    },
    SSN: {
      type: String,
      required: true,
      unique: true
    },
    insurance: {
      type: String  
    },
    onFilePaymentInfo: {
      type: String  
    },
    doctor: {
        type: String,
        required: true
    },
    medicalNotes: {
        type: String
    }    
});

const Patients = mongoose.model('patients',patientSchema);

module.exports = Patients;