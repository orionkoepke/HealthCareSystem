const CCCInteraction = require('./modules/CCCInteraction');

var clientPaymentInfo = {
  cardNumber: "1234567890123444444444",
    cvn: "123"
};

console.log(CCCInteraction(clientPaymentInfo,true));

