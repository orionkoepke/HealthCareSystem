const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InvoiceCounter = new Schema({
    counter: {
        type: Number,
        required: true
    }
});

var Counter = mongoose.model('invoiceNumberCounter', InvoiceCounter);

module.exports = Counter;