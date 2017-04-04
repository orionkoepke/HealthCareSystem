const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    SSN: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        required: true
    },
    doctor: {
        type: String  // Which doctor does this nurse work with?  Only applicable for nurses.
    }    
});


const Users = mongoose.model('users',UserSchema);

module.exports = Users;