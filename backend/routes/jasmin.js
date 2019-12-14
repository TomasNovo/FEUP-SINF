'use strict';

const router = require('express').Router();
const controller = require('../controllers/jasmin');

router.get('/materialItems/:company', controller.getMaterialItems);
router.get('/salesItems/:company', controller.getSalesItems);
router.get('/businessItems/:company', controller.getBusinessItems);
router.get('/warehouses/:company', controller.getWarehouses);
router.get('/getSalesOrder/:company', controller.getSalesOrders);
router.get('/deliveries/:company', controller.getDeliveries);
router.get('/purchaseInvoice/:company', controller.getPurchaseInvoice);
router.get('/receivable/:company', controller.getReceivable);
router.get('/purchaseOrder/:company', controller.getPurchaseOrder);
router.get('/goodsReceipt/:company/:name', controller.getGoodsReceipt);
router.get('/getSalesInvoice/:company/:name', controller.getSalesInvoice);
router.get('/getPayment/:company/:name', controller.getPayment);

module.exports = router;