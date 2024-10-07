const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// Ruta para crear una transacción
router.post("/", transactionController.createTransaction);

// Ruta para obtener todas las transacciones
router.get("/", transactionController.getAllTransactions);

// Ruta para obtener una transacción por `_id`
router.get("/:id", transactionController.getTransactionById);

// Ruta para actualizar una transacción por `_id`
router.put("/:id", transactionController.updateTransaction);

// Ruta para eliminar una transacción por `_id`
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
