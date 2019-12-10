'use strict';

const router = require('express').Router();
const controller = require('../controllers/process');

router.post('/', controller.create);

router.get('/:_id', controller.read);

router.get('/', controller.readAll);

router.put('/:_id', controller.update);

router.delete('/:_id', controller.remove);

// routes involving steps

router.post('/:processId/step', controller.createStep);

router.get('/:processId/step/:stepNumber', controller.readStep);

router.get('/:processId/step', controller.readAllSteps);

module.exports = router;