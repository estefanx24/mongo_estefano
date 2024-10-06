const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.post('/', promotionController.createPromotion);
router.get('/', promotionController.getPromotions);
router.patch('/:id', promotionController.updatePromotion);
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;
