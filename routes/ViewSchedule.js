const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

router.get('/',function(req,res){
  return res.render('ViewSchedule', { loginerror: "" });
});

module.exports = router;
