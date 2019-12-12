'use strict';

const router = require('express').Router();
const controller = require('../controllers/jasmin');

router.get('/materialItems/:company', controller.getMaterialItems);

router.get('/salesItems/:company', controller.getSalesItems);

router.get('/businessItems/:company', controller.getBusinessItems);

router.get('/warehouses/:company', controller.getWarehouses);

module.exports = router;