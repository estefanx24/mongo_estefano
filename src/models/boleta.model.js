const mongoose = require("mongoose");

// Esquema del modelo de boleta
const boletaSchema = new mongoose.Schema({
  fecha_emision: {
    type: Date,
    default: Date.now, // Fecha de emisión autogenerada al momento de crear la boleta
  },
  payment_method: {
    type: String,
    enum: ["VISA", "MASTERCARD", "AMERICAN EXPRESS"], // Métodos de pago permitidos
    required: true,
  },
  amount: {
    type: Number,
    required: true, // Este valor será calculado previamente en transaction
  },
});

// Crear el modelo basado en el esquema
const Boleta = mongoose.model("Boleta", boletaSchema);

module.exports = Boleta;
