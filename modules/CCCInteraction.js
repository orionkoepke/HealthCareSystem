module.exports = function(paymentInfo,accept){
    
    if(accept){
        if(paymentInfo.cardNumber.length === 16 && paymentInfo.cvn.length === 3){
            var i;
            for(i=0;i<paymentInfo.cardNumber.length;i++){
                if(isNaN(paymentInfo.cardNumber[i],10)){
                    return ("0000000000");
                }
            }
            var j;
            for(j=0;j<paymentInfo.cvn.length;j++){
                if(isNaN(paymentInfo.cardNumber[j],10)){
                    return ("0000000000");
                }
            }
        }else {
            return ("0000000000");
        }      
        var ref = Math.round(Math.random()*10000000000);
        return ref;
    }else {
        return ("0000000000");
    }
};