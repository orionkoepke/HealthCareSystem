// Initalize needed connections
const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
var router = express.Router();
var Records = require('../models/Records.js');
const creditCompany = require('../modules/CCCInteraction.js');

//GET router: Renders web pages based on user id
router.get("/:id", function getRecord(req,res){
      var Oid = req.params.id

      console.log("find by: " + Oid);

      //Find by the patient based on their _id
      Records.findById(Oid).populate('patientID')
          .then(function(patientRecord){

              //When patientRecord is null send the user to a error page or text popup
              if(!patientRecord){

                  return res.render('OnlinePayment', {
                      firstname: '',
                      lastname: '',
                      patientCopay: '',
                      date: '',
                      _id: Oid,
                      onlineError: "Invoice information can not be accessed."
                  });

              }

              else{
                  if(patientRecord.status === 'Finalized'){
                      return res.render('OnlinePayment', {
                          firstname: patientRecord.patientID.firstname,
                          lastname: patientRecord.patientID.lastname,
                          patientCopay: patientRecord.patientCopay,
                          date: patientRecord.date,
                          _id: Oid,
                          onlineError: "You have already paid your bill."
                      });
                  }
                  else{
                      return res.render('OnlinePayment', {
                          firstname: patientRecord.patientID.firstname,
                          lastname: patientRecord.patientID.lastname,
                          patientCopay: patientRecord.patientCopay,
                          date: moment(patientRecord.date.toISOString()).add(300,'m').format('h:mma, ddd, MMM, Do, YYYY'),
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

//POST router: Requests information from the broweser to pull up patient information from Database to allow user to pay online.
router.post("/Query", function update(req, res){
    var Oid = req.body.ObjectId;
    var cardNumber = req.body.cardNumber;
    var cardHolder = req.body.cardHolder;
    var cvn = req.body.cardSecurityCode;
    console.log("Payment Sent");
    var creditReference;
    var timeStamp;

    Records.findById(Oid).populate('patientID')
        .then(function(patientRecord){
          if(!patientRecord){

              return res.render('OnlinePayment', {
                  firstname: '',
                  lastname: '',
                  patientCopay: '',
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

                  console.log(moment(patientRecord.date.toISOString()).add(300,'m').format('h:mma, ddd, MMM, Do, YYYY'));

                  return res.render('OnlinePayment', {
                    firstname: patientRecord.patientID.firstname,
                    lastname: patientRecord.patientID.lastname,
                    patientCopay: patientRecord.patientCopay,
                    date: moment(patientRecord.date.toISOString()).add(300,'m').format('h:mma, ddd, MMM, Do, YYYY'),
                    _id: Oid,
                    onlineError: "Payment not accepted. Please try again."
                  });
              }
              else{

                  Records.findByIdAndUpdate(Oid, {
                      status: 'Finalized',
                      reference: creditReference
                  }).populate('patientID').then(function(patient){
                      return res.render('OnlinePayment_Receipt', {
                          firstname: patientRecord.patientID.firstname,
                          lastname: patientRecord.patientID.lastname,
                          patientCopay: patientRecord.patientCopay,
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
