const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  promotion_id: {
    type: String, // Esto hace referencia al código de promoción
    required: false, // No es obligatorio
  },
  ride_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  ride_cost: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
