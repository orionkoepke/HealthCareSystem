const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

router.get('/',function(req,res){
  User.find({userType: "doctor"}).then(function(ans){
    var doctorNames = [];
    for(var i = 0; i < ans.length; i++){
      doctorNames[i] = "Dr. " +  ans[i].firstname + " " + ans[i].lastname;
    }
    console.log(doctorNames);
    return res.render('SelectDoctor', { docNames: doctorNames });
  });
});

module.exports = router;
