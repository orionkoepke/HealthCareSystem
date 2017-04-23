const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
var router = express.Router();
var Records = require('../models/Records.js');
const creditCompany = require('../modules/CCCInteraction.js');

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
                  if(patientRecord.status === 'Finalized'){
                      return res.render('OnlinePayment', {
                          firstname: patientRecord.firstname,
                          lastname: patientRecord.lastname,
                          billingAmount: 0,
                          date: patientRecord.date,
                          _id: Oid,
                          onlineError: "You have already paid your bill."
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

          }})

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
    var creditReference;
    var timeStamp;

    Records.findById(Oid)
        .then(function(patientRecord){
          if(!patientRecord){

              return res.render('OnlinePayment', {
                  firstname: '',
                  lastname: '',
                  billingAmount: '',
                  date: '',
                  _id: Oid,
                  onlineError: "Patient information can't be accessed"
              });

          }

          else{

              creditReference = creditCompany({
                  cardNumber: cardNumber,
                  cvn: cvn
              }, true);
              if(creditReference === '0000000000'){

                  return res.render('OnlinePayment', {
                    firstname: patientRecord.firstname,
                    lastname: patientRecord.lastname,
                    billingAmount: patientRecord.billingAmount,
                    date: patientRecord.date,
                    _id: Oid,
                    onlineError: "Payment not accepted. Please try again."
                  });
              }
              else{

                  Records.findByIdAndUpdate(Oid, {
                      status: 'Finalized',
                      reference: creditReference
                  }).then(function(patient){
                      return res.render('OnlinePayment_Receipt', {
                          firstname: patientRecord.firstname,
                          lastname: patientRecord.lastname,
                          billingAmount: patientRecord.billingAmount,
                          timeStamp: moment().format('h:mma, ddd, MMM, Do, YYYY'),
                          creditReference: creditReference,
                          _id:Oid,
                          onlineError: " "
                      });
                  });
              }
          }

        })

        .catch(function(e){
            console.log("PayOnline Router issues: ");
            console.log(e);

        });
});

module.exports = router;