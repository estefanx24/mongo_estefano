const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    porcentaje: { type: Number, required: true },      // Porcentaje de la promoción
    start_date: { type: Date, required: true },        // Fecha de inicio
    end_date: { type: Date, required: true },          // Fecha de finalización
    valid_for: { type: Number, required: true }        // Usuario válido para la promoción
});

module.exports = mongoose.model('Promotion', promotionSchema);
