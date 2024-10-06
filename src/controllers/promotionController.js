const Promotion = require('../models/promotion');

// Crear promoción
exports.createPromotion = async (req, res) => {
    try {
        const promotion = new Promotion(req.body);
        await promotion.save();
        res.status(201).json(promotion);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear promoción', error });
    }
};

// Obtener todas las promociones
exports.getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener promociones', error });
    }
};

// Actualizar promoción
exports.patchPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!promotion) return res.status(404).json({ message: 'Promoción no encontrada' });
        res.status(200).json(promotion);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar promoción', error });
    }
};

// Eliminar promoción
exports.deletePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findByIdAndDelete(req.params.id);
        if (!promotion) return res.status(404).json({ message: 'Promoción no encontrada' });
        res.status(200).json({ message: 'Promoción eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar promoción', error });
    }
};
