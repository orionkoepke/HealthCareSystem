module.exports = function(thisRecord){
    const mongoose = require('mongoose');
    var Patients = require('../../models/Patients');
    var Records = require('../../models/Records');
    const nodemailer = require('nodemailer');
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'HospitalComm.NOREPLY@gmail.com',
            pass: 'SchmoogleMoogle43!'
        }
    });
    
    // get the customer's email from the database
    var findSSN = thisRecord.PatientSSN;
    var targetEmail;
    console.log(findSSN);
    Patients.findOne({ SSN: findSSN }).then(function(patientRecord){
        targetEmail = patientRecord.email;
        clientName = patientRecord.firstname + " " + patientRecord.lastname;
        
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Austin Eubank" <HospitalComm.NOREPLY@gmail.com>', // sender address
            to: targetEmail, // list of receivers
            subject: 'Your medical bill for today\'s appointment', // Subject line
            text: 'Your medical bill for today\'s appointment', // plain text body
            html: '<p>To: ' + clientName + ' </p><p> You were marked as \"No Show\" for today\'s appointment.  <a href="http://localhost:3003/payMyBill/' + thisRecord._id + '">View and pay your bill at this link.</a></p>'// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            console.log(info.pending);
        });        
    }).catch(function(e){
        console.log(e);
    });
    var recordUpdate = new Records(thisRecord);
    recordUpdate.billingAmount = 25;
    recordUpdate.status = "NoShow";
    Records.findOneAndUpdate({_id: thisRecord._id},recordUpdate).catch(function(e){
        console.log(e);
    });
};