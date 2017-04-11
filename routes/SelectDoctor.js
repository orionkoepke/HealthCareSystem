const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

router.get('/',function(req,res){

  if(!req.session.user){
      return res.render('LoginPage',{ loginerror: "" });
  }else {
    User.find({userType: "doctor"}).then(function(ans){
      var doctors = [];
      for(var i = 0; i < ans.length; i++){
        var doctor = {name: "", doctorId: ""};
        doctor.name = "Dr. " +  ans[i].firstname + " " + ans[i].lastname;
        doctor.doctorId = ans[i].doctor;
        doctors[i] = doctor;
      }
      return res.render('SelectDoctor', { doctors: doctors });
    });
  }
});

module.exports = router;
