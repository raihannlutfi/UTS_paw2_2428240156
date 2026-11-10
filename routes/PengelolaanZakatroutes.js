const express = require('express');
const router = express.Router();
const pengelolaanZakatController = require('../controllers/PengelolaanZakatController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', pengelolaanZakatController.getAll);
router.get('/:id', pengelolaanZakatController.getById);
router.post('/', cekApiKey, pengelolaanZakatController.create);
router.put('/:id', cekApiKey, pengelolaanZakatController.update);
router.delete('/:id', cekApiKey, pengelolaanZakatController.remove);

module.exports = router;