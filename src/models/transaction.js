const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    ride_id: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);