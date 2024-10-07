const mongoose = require("mongoose");

// Esquema del modelo de promoción
const promotionSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true, // Asegura que no se repita el código promocional
  },
  porcentaje: {
    type: Number,
    required: true,
    min: 0, // Evita porcentajes negativos
    max: 100, // Evita que el descuento supere el 100%
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.start_date < value; // Valida que la fecha de fin sea después de la de inicio
      },
      message: "La fecha de fin debe ser posterior a la fecha de inicio.",
    },
  },
});

// Crear el modelo basado en el esquema
const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
