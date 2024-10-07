const Promotion = require("../models/promotion.model");

// Crear una nueva promoción
exports.createPromotion = async (req, res) => {
  try {
    const { codigo, porcentaje, start_date, end_date } = req.body;

    const newPromotion = new Promotion({
      codigo,
      porcentaje,
      start_date,
      end_date,
    });

    await newPromotion.save();
    res.status(201).json({
      message: "Promoción creada exitosamente",
      promotion: newPromotion,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la promoción" });
  }
};

// Obtener todas las promociones
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las promociones" });
  }
};

// Obtener una promoción por código
exports.getPromotionByCodigo = async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ codigo: req.params.codigo });
    if (!promotion) {
      return res.status(404).json({ error: "Promoción no encontrada" });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la promoción" });
  }
};

// Actualizar una promoción por código
exports.updatePromotion = async (req, res) => {
  try {
    const { porcentaje, start_date, end_date } = req.body;
    const updatedPromotion = await Promotion.findOneAndUpdate(
      { codigo: req.params.codigo },
      { porcentaje, start_date, end_date },
      { new: true }
    );

    if (!updatedPromotion) {
      return res.status(404).json({ error: "Promoción no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Promoción actualizada", promotion: updatedPromotion });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la promoción" });
  }
};

// Eliminar una promoción por código
exports.deletePromotion = async (req, res) => {
  try {
    const deletedPromotion = await Promotion.findOneAndDelete({
      codigo: req.params.codigo,
    });
    if (!deletedPromotion) {
      return res.status(404).json({ error: "Promoción no encontrada" });
    }

    res.status(200).json({ message: "Promoción eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la promoción" });
  }
};
