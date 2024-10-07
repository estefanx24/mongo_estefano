const axios = require("axios");
const Transaction = require("../models/transaction.model");
const Promotion = require("../models/promotion.model");

const USUARIO_URL = "http://gestion-usuario:8000";

// Crear una nueva transacción
exports.createTransaction = async (req, res) => {
  try {
    const { promotion_id, ride_id, user_id, ride_cost } = req.body;
    let amount = ride_cost;

    // Verificar si el usuario tiene una suscripción activa
    try {
      const response = await axios.get(
        `${USUARIO_URL}/users/${user_id}/subscription`
      );

      if (response.status === 200) {
        amount = 0; // Si la suscripción está activa, el monto es 0
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(
          "Usuario no tiene suscripción activa, continuando con el proceso normal."
        );
      } else {
        console.error("Error al verificar suscripción:", err);
        return res
          .status(500)
          .json({ error: "Error al verificar la suscripción del usuario" });
      }
    }

    // Si el amount aún es mayor que 0, aplica el descuento de la promoción
    if (promotion_id && amount > 0) {
      const promotion = await Promotion.findOne({ codigo: promotion_id });
      if (promotion) {
        const discount = promotion.porcentaje / 100;
        amount = ride_cost - ride_cost * discount;
      }
    }

    const newTransaction = new Transaction({
      promotion_id,
      ride_id,
      user_id,
      ride_cost,
      amount,
    });

    await newTransaction.save();
    res.status(201).json({
      message: "Transacción creada exitosamente",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la transacción" });
  }
};

// Obtener todas las transacciones
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};

// Obtener una transacción por `_id`
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la transacción" });
  }
};

// Actualizar una transacción por `_id`
exports.updateTransaction = async (req, res) => {
  try {
    const { promotion_id, ride_id, user_id, ride_cost } = req.body;
    let amount = ride_cost;

    // Si se proporciona un código de promoción, intenta aplicarlo
    if (promotion_id) {
      const promotion = await Promotion.findOne({ codigo: promotion_id });
      if (promotion) {
        const discount = promotion.porcentaje / 100;
        amount = ride_cost - ride_cost * discount;
      }
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { promotion_id, ride_id, user_id, ride_cost, amount },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    res.status(200).json({
      message: "Transacción actualizada",
      transaction: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la transacción" });
  }
};

// Eliminar una transacción por `_id`
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    res.status(200).json({ message: "Transacción eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la transacción" });
  }
};
