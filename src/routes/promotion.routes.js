const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotion.controller");

// Ruta para crear una promoción
router.post("/", promotionController.createPromotion);

// Ruta para obtener todas las promociones
router.get("/", promotionController.getAllPromotions);

// Ruta para obtener una promoción por código
router.get("/:codigo", promotionController.getPromotionByCodigo);

// Ruta para actualizar una promoción por código
router.put("/:codigo", promotionController.updatePromotion);

// Ruta para eliminar una promoción por código
router.delete("/:codigo", promotionController.deletePromotion);

module.exports = router;
