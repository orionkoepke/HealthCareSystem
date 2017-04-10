const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

router.post('/', fucntion(req, res){
  return res.render('SelectDoctor', { doctors: doctors });
});

router.get('/',function(req,res){
  return res.render('SelectDoctor', { doctors: doctors });
});

module.exports = router;
