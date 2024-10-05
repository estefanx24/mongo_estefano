const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.patch('/:id', transactionController.patchTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;