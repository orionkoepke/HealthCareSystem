module.exports = function(paymentInfo,accept){
    
    if(accept){
        if(paymentInfo.cardNumber.length === 16 && paymentInfo.cvn.length === 3){
            if(Number(paymentInfo.cardNumber)){
                
            }
        }
        
        var ref = Math.round(Math.random()*10000000000);
        return ref;
    }else {
        return ("0000000000");
    }
};