const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },           // ID del usuario que realiza la transacción
    ride_id: { type: Number, required: true },           // ID del viaje asociado
    amount: { type: Number, required: true },            // Monto de la transacción
    payment_method: { type: String, required: true },    // Método de pago utilizado (ej. 'tarjeta', 'efectivo')
    promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' }, // Relación con una promoción
    date: { type: Date, default: Date.now }              // Fecha de la transacción, por defecto la actual
});

module.exports = mongoose.model('Transaction', transactionSchema);
