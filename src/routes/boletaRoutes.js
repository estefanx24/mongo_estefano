const express = require('express');
const router = express.Router();
const boletaController = require('../controllers/boletaController');

router.post('/', boletaController.createBoleta);
router.get('/', boletaController.getBoletas);
router.patch('/:id', boletaController.patchBoletas);
router.delete('/:id', boletaController.deleteBoleta);

module.exports = router;
