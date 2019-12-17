'use strict';

const router = require('express').Router();
const controller = require('../controllers/jasmin');

router.get('/materialItems/:company', controller.getMaterialItems);
router.get('/salesItems/:company', controller.getSalesItems);
router.get('/businessItems/:company', controller.getBusinessItems);
router.get('/warehouses/:company', controller.getWarehouses);
router.get('/sales-order/:company', controller.getSalesOrders);
router.get('/sales-order/:company/:id', controller.getSalesOrder);
router.get('/deliveries/:company', controller.getDeliveries);
router.get('/purchase-invoice/:company', controller.getPurchaseInvoice);
router.get('/receivable/:company', controller.getReceivable);
router.get('/purchase-order/:company', controller.getPurchaseOrder);
router.get('/goods-receipt/:company/:name', controller.getGoodsReceipt);
router.get('/sales-invoice/:company', controller.getSalesInvoice);
router.get('/payments/:company', controller.getPayment);

router.post('/purchase-invoice/:company', controller.createPurchaseInvoice);
router.post('/sales-invoice/:company', controller.createSalesInvoice);
router.post('/payment/:company/:name', controller.createPayment);
router.post('/goods-receipt/:company/:name', controller.createGoodsReceipt);
router.post('/purchase-order/:company', controller.createPurchaseOrder);
router.post('/receivable/:company/:name', controller.createReceivable);
router.post('/delivery/:company', controller.createDelivery);
router.post('/sales-order/:company', controller.createSalesOrder);

module.exports = router;