const Boleta = require('../models/boleta');

// Crear boleta
exports.createBoleta = async (req, res) => {
    try {
        const boleta = new Boleta(req.body);
        await boleta.save();
        res.status(201).json(boleta);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear boleta', error });
    }
};

// Obtener todas las boletas
exports.getBoletas = async (req, res) => {
    try {
        const boletas = await Boleta.find();
        res.status(200).json(boletas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener boletas', error });
    }
};

// Actualizar boleta
exports.updateBoleta = async (req, res) => {
    try {
        const boleta = await Boleta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!boleta) return res.status(404).json({ message: 'Boleta no encontrada' });
        res.status(200).json(boleta);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar boleta', error });
    }
};

// Eliminar boleta
exports.deleteBoleta = async (req, res) => {
    try {
        const boleta = await Boleta.findByIdAndDelete(req.params.id);
        if (!boleta) return res.status(404).json({ message: 'Boleta no encontrada' });
        res.status(200).json({ message: 'Boleta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar boleta', error });
    }
};
