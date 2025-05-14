const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');

router.get('/getAll', graphController.getAll);
router.post('/add-node', graphController.addNode);
router.post('/add-relationship', graphController.addRelationship);
module.exports = router;