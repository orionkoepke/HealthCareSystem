const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/Users.js');


router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({ username:username, password: password },function(err, user){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        
        if(!user) {
            return res.status(404).send();
        }else {
            req.session.user = user;
            console.log(req.session);
            return res.status(200).render('MainPage');
        }
    });
});

router.delete('/logout', function(req,res){
    //req.session
    
    
    
    
});





module.exports = router;
