const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceCounter = new Schema({
    counter: {
        type: Number,
        required: true
    },
    ident: {
        type: String,
        default: "finder"
    }
});

var Counter = mongoose.model('invoiceNumberCounter', InvoiceCounter);

module.exports = Counter;