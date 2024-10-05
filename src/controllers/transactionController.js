const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { user_id, ride_id, amount, payment_method } = req.body;

        // Validación de campos requeridos
        if (!user_id || !ride_id || !amount || !payment_method) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear transacción', error });
    }
};

// Obtener todas las transacciones
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones', error });
    }
};

exports.patchTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar transacción', error });
    }
};

// Eliminar transacción
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });
        res.status(200).json({ message: 'Transacción eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar transacción', error });
    }
};