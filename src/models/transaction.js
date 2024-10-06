const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_id: { type: Number, required: true },   // ID de la transacción
    user_id: { type: Number, required: true },          // ID del usuario
    ride_id: { type: Number, required: true },          // ID del viaje
    amount: { type: Number, required: true },           // Monto
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
