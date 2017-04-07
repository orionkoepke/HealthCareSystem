const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');


router.get('/',function(req,res){
    if(!req.session.user){
        return res.render('LoginPage',{ loginerror: "" });
    }else {
        return res.render('MainPage');
    }
});

router.get('/home',function(req,res){
    if(!req.session.user){
        return res.render('LoginPage',{ loginerror: "" });
    }else {
        return res.render('MainPage');
    }
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({ username:username, password: password },function(err, user){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        
        if(!user) {
            console.log("Invalid login...");
            return res.status(400).render('LoginPage',{ loginerror: "Invalid username or password" });
        }else {
            req.session.user = user;
            return res.status(200).render('MainPage');
        }
    });
});

router.get('/logout', function(req,res){
    req.session.destroy();
    return res.status(200).render('LogoutPage');   
});





module.exports = router;
