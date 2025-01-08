const express = require('express');
const router = express.Router();
const dataJemaatController = require('../controllers/data-jemaat-controller');

// Routing CRUD Jemaat
router.get('/', dataJemaatController.getAll);
router.get('/:id_jemaat', dataJemaatController.getById);
router.post('/', dataJemaatController.create);
router.put('/:id_jemaat', dataJemaatController.update);
router.delete('/:id_jemaat', dataJemaatController.delete);

module.exports = router;
