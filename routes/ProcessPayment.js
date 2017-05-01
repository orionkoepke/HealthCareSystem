const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');
const CheckUserAuthorization = require('../modules/CheckUserAuthorization');
const CCCInteraction = require('../modules/CCCInteraction');
var moment = require('moment');

router.post('/',function getRecord(req,res){
    if(!req.session.user){
        return res.status(400).render('LoginPage');
    }else if(!CheckUserAuthorization(req.session.user.userType,"PP")){
        return res.status(400).render('MainPage',{ permissionError: "You do not have permission to do that." });
    }else{
        var invoice = req.body.id;
        
        Records.findById(invoice).populate('patientID').then(function(theRecord){
            if(!theRecord){
                res.render('MainPage',{ permissionError: "Record not found."});
            }else{
                var Year = theRecord.date.getFullYear();
                var Month = theRecord.date.getMonth();
                var Day = theRecord.date.getDate();
                var Hour = theRecord.date.getHours();
                var Minutes = theRecord.date.getMinutes();
                var offset = theRecord.date.getTimezoneOffset();
                
                var returnDate = new Date(Year,Month,Day,Hour,Minutes-offset,0,0);
                
                return res.status(200).render('ProcessPayment',{ firstname: theRecord.patientID.firstname, 
                                                                lastname: theRecord.patientID.lastname,
                                                                patientCopay: theRecord.patientCopay,
                                                                _id: theRecord._id,
                                                                date: moment(returnDate.toISOString()).format('h:mma, ddd, MMM, Do, YYYY'),
                                                                onlineError: ""});
            }
        }).catch(function(e){
            console.log("Problem finding the requested record: ");
            console.log(e);
        });
    }
});

router.post('/pay_attempt',function update(req,res){
    if(!req.session.user){
        return res.status(400).render('LoginPage');
    }else if(!CheckUserAuthorization(req.session.user.userType,"PP")){
        return res.status(400).render('MainPage',{ permissionError: "You do not have permission to do that." });
    }else{
        var Oid = req.body.ObjectId;
        var ref = CCCInteraction({cardNumber: req.body.cardNumber,cvn: req.body.cardSecurityCode},true);
        if(ref === "0000000000"){
            Records.findById(Oid).populate('patientID').then(function(theRecord){                
                return res.render('ProcessPayment',{ firstname: theRecord.patientID.firstname, 
                                                 lastname: theRecord.patientID.lastname,
                                                 patientCopay: theRecord.patientCopay,
                                                 _id: theRecord._id,
                                                 date: theRecord.date,
                                                 onlineError: "Payment rejected. Please try again."});
            }).catch(function(e){
                console.log("On failed payment attempt: ");
                console.log(e);
            });
        }else{
            
            Records.findByIdAndUpdate(Oid,{ status:"Finalized", reference: ref }).then(function(theRecord){
                return res.status(200).render('ProcessPayment_Receipt',{ firstname: theRecord.patientID.firstname, 
                                                 lastname: theRecord.patientID.lastname,
                                                 patientCopay: theRecord.patientCopay,
                                                 _id: theRecord._id,
                                                 creditReference: ref,
                                                 timeStamp: moment().format('h:mma, ddd, MMM, Do, YYYY'),
                                                 staff_firstname: req.session.user.firstname,
                                                 staff_lastname: req.session.user.lastname,
                                                 onlineError: ""});
            }).catch(function(e){
                console.log("Problem updating the record: ");
                console.log(e);
            });
        }
    }
});


module.exports = router;