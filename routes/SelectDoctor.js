const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

router.get('/',function(req,res){

  User.find({userType: "doctor"}).then(function(ans){
    console.log(ans);
    return res.render('SelectDoctor');
  });
});

module.exports = router;
