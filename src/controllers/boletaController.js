const Boleta = require('../models/boleta');
const Transaction = require('../models/transaction'); // Importamos el modelo de transacción

// Crear boleta
exports.createBoleta = async (req, res) => {
    try {
        const { transaction_id } = req.body;

        // Buscar la transacción relacionada
        const transaction = await Transaction.findById(transaction_id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        // Copiar los datos de la transacción a la boleta
        const newBoleta = new Boleta({
            payment_method: transaction.payment_method,
            amount: transaction.amount,
            user_id: transaction.user_id,
            transaction_id: transaction._id  // Guardamos la relación con la transacción
        });

        // Guardar la boleta
        await newBoleta.save();
        res.status(201).json(newBoleta);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear boleta', error });
    }
};

// Obtener todas las boletas
exports.getBoletas = async (req, res) => {
    try {
        // Usamos populate para obtener los detalles de la transacción relacionada
        const boletas = await Boleta.find().populate('transaction_id');
        res.status(200).json(boletas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener boletas', error });
    }
};

// Actualizar boleta
exports.patchBoletas = async (req, res) => {
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
