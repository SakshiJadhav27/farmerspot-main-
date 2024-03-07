const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    }, 
    products:{
        type: Array,
        required: true
    }, 
    amount: {
        type: Number,
        required: true
    }, 
    quantity: {
        type: Array,
        required: true
    }, 
    recipt:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model("transaction", paymentSchema);

module.exports = Transaction;