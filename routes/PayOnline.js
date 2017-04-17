const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Records = require('../models/Records.js');


router.get("/:id", function(req,res){
      var Oid = req.params.id

      console.log("find by: " + Oid);

      Records.findById(Oid)
          .then(function(patientRecord){
              //When patientRecord is null send the user to a error page or text popup
              if(!patientRecord){

                  return res.render('OnlinePayment', {
                      firstname: '',
                      lastname: '',
                      billingAmount: '',
                      date: '',
                      _id: Oid,
                      onlineError: "Invoice information can not be accessed."
                  });

              }

              else{
                  return res.render('OnlinePayment', {
                      firstname: patientRecord.firstname,
                      lastname: patientRecord.lastname,
                      billingAmount: patientRecord.billingAmount,
                      date: patientRecord.date,
                      _id: Oid,
                      onlineError: " "
                  });

              }

          })

        .catch(function(e){
            console.log("PayOnline Router issues: ");
            console.log(e);

        });
});

router.post("/Query", function(req, res){
    var Oid = req.body.ObjectId;
    var cardNumber = req.body.cardNumber;
    var cardHolder = req.body.cardHolder;
    var cvn = req.body.cardSecurityCode;
    console.log("Oh baby!");
    //TO DO --- Credit Card Checing by 'Credit Card Company'

    Records.findById(Oid)
        .then(function(patientRecord){
          if(!patientRecord){

              return res.render('OnlinePayment', {
                  firstname: '',
                  lastname: '',
                  billingAmount: '',
                  date: '',
                  _id: Oid,
                  //TO DO --- Time Stamp for when the receipt was processed
                  //TO DO --- Reference number given by 'Credit Card Company'
                  onlineError: "Patient information can't be accessed"
              });

          }

          else{

              return res.render('OnlinePayment_Receipt', {
                  firstname: patientRecord.firstname,
                  lastname: patientRecord.lastname,
                  billingAmount: patientRecord.billingAmount,
                  //TO DO --- Time Stamp for when the receipt was processed
                  //TO DO --- Reference number given by 'Credit Card Company'
                  _id:Oid,
                  onlineError: " "
              });

          }

        })

        .catch(function(e){
            console.log("PayOnline Router issues: ");
            console.log(e);

        });
});

module.exports = router;
