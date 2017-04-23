const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Patient = require('../models/Patients.js');
var User = require('../models/Users.js');

router.get('/',function(req,res){
  User.find({userType: "doctor"}).then(function(ans){
    return res.render('CreateNewPatient', {doctors: ans});
  });
});

module.exports = router;
