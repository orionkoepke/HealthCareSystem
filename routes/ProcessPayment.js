const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');

router.post('/',function(req,res){
    if(!req.session.user){
        return res.status(400).render('LoginPage');
    }else if(!CheckUserAuthorization(req.session.user.userType,"PP")){
        return res.status(400).render('MainPage',{ permissionError: "You do not have permission to do that." });
    }else{
        var invoice = req.body.id;
        console.log(invoice);
        return res.status(200).send('Render Page Here.');
    }
});




module.exports = router;