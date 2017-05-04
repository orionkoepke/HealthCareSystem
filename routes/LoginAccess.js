// Initalize needed connections
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');

//GET router: Renders web pages based on cookies
router.get('/',function choosePage(req,res){
    if(!req.session.user){
        return res.render('LoginPage',{ loginerror: "" });
    }else {
        return res.render('MainPage');
    }
});

//GET router: Renders web pages based on cookies
router.get('/home',function home(req,res){
    if(!req.session.user){
        return res.render('LoginPage',{ loginerror: "" });
    }else {
        return res.render('MainPage');
    }
});

//POST router: Requests user name and password inputed into browser to then create user cookie and send to main page, iff vaild.
router.post('/login',function login(req,res){
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

//GET router: Renders the logout screen
router.get('/logout', function logout(req,res){
    req.session.destroy();
    return res.status(200).render('LogoutPage');
});

module.exports = router;
