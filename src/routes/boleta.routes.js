const express = require("express");
const router = express.Router();
const boletaController = require("../controllers/boleta.controller");

// Ruta para crear una boleta
router.post("/", boletaController.createBoleta);

// Ruta para obtener todas las boletas
router.get("/", boletaController.getAllBoletas);

// Ruta para obtener una boleta por `_id`
router.get("/:id", boletaController.getBoletaById);

// Ruta para actualizar una boleta por `_id`
router.put("/:id", boletaController.updateBoleta);

// Ruta para eliminar una boleta por `_id`
router.delete("/:id", boletaController.deleteBoleta);

module.exports = router;
