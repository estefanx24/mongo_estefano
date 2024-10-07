const Boleta = require("../models/boleta.model");
const Transaction = require("../models/transaction.model");

// Crear una nueva boleta
exports.createBoleta = async (req, res) => {
  try {
    const { transaction_id, payment_method } = req.body;

    // Buscar la transacción para obtener el monto
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    const newBoleta = new Boleta({
      payment_method,
      amount: transaction.amount, // Usamos el amount calculado de la transacción
    });

    await newBoleta.save();
    res
      .status(201)
      .json({ message: "Boleta creada exitosamente", boleta: newBoleta });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la boleta" });
  }
};

// Obtener todas las boletas
exports.getAllBoletas = async (req, res) => {
  try {
    const boletas = await Boleta.find();
    res.status(200).json(boletas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las boletas" });
  }
};

// Obtener una boleta por `_id`
exports.getBoletaById = async (req, res) => {
  try {
    const boleta = await Boleta.findById(req.params.id);
    if (!boleta) {
      return res.status(404).json({ error: "Boleta no encontrada" });
    }
    res.status(200).json(boleta);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la boleta" });
  }
};

// Actualizar una boleta por `_id`
exports.updateBoleta = async (req, res) => {
  try {
    const { payment_method } = req.body;

    const updatedBoleta = await Boleta.findByIdAndUpdate(
      req.params.id,
      { payment_method },
      { new: true }
    );

    if (!updatedBoleta) {
      return res.status(404).json({ error: "Boleta no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Boleta actualizada", boleta: updatedBoleta });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la boleta" });
  }
};

// Eliminar una boleta por `_id`
exports.deleteBoleta = async (req, res) => {
  try {
    const deletedBoleta = await Boleta.findByIdAndDelete(req.params.id);
    if (!deletedBoleta) {
      return res.status(404).json({ error: "Boleta no encontrada" });
    }

    res.status(200).json({ message: "Boleta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la boleta" });
  }
};
