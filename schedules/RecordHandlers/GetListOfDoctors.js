module.exports = function(thisRecord){
    const mongoose = require('mongoose');
    var Users = require('../../models/Users');
    
    var listOfDoctors = [];
    
    Users.find({userType: "doctor"}).then(function(theList){        
        theList.forEach(function(user){
            listOfDoctors.push(user.doctor);
        });
    }).catch(function(e){
        console.log("Couldn't get the list of users." + e);
    });
    return listOfDoctors;
};