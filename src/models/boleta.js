const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
    payment_method: { type: String, required: true },  // Método de pago
    amount: { type: Number, required: true },          // Monto
    fecha_emision: { type: Date, default: Date.now },  // Fecha de emisión
    user_id: { type: Number, required: true },         // ID del usuario que paga
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true } // ID de la transacción asociada
});

module.exports = mongoose.model('Boleta', boletaSchema);
