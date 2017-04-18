module.exports = function(userType,useCase){
    var staffPermissions = [false,true,true,true,true,true,true,false,false,true,true,true,true];
    var ceoPermissions = [false,false,false,false,false,false,false,true,true,false,false,false,false];
    var doctorPermissions = [false,false,false,false,false,false,false,false,false,true,true,true,true];
    var nursePermissions = [false,false,false,false,false,false,false,false,false,true,true,true,true];
    var useCaseIndex;
    
    switch(useCase){
        
        case "MA": useCaseIndex = 1;
            break;
            
        case "CA": useCaseIndex = 2;
            break;
            
        case "XA": useCaseIndex = 3;
            break;
            
        case "CNPR": useCaseIndex = 4;
            break;
            
        case "ClrA": useCaseIndex = 5;
            break;
            
        case "PP": useCaseIndex = 6;
            break;
            
        case "VDR": useCaseIndex = 7;
            break;
            
        case "VMR": useCaseIndex = 8;
            break;
            
        case "VPTR": useCaseIndex = 9;
            break;
            
        case "UPTR": useCaseIndex = 10;
            break;
            
        case "VPI": useCaseIndex = 11;
            break;
            
        case "UPI": useCaseIndex = 12;
            break;
            
        default: useCaseIndex = 0;
        
    };
    
    if(userType === "staff"){
        return staffPermissions[useCaseIndex];
    }else if (userType === "ceo"){
        return ceoPermissions[useCaseIndex];
    }else if(userType === "doctor"){
        return doctorPermissions[useCaseIndex];
    }else if(userType === "nurse"){
        return nursePermissions[useCaseIndex];
    }else {
        return false;
    }
};