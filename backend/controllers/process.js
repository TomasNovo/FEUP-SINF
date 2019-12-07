'use strict';

const Process = require('../database/models/process');
const Step = require('../database/models/step');

function create(req, res) {
  const { steps } = req.body;
  const newProcess = new Process({ steps });
  newProcess.save()
  .then(process => {
    res.status(201).json(process);
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function read(req, res) {
  const { _id } = req.params;

  Process.findById(_id)
  .then(process => {
    res.status(200).json(process);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function readAll(req, res) {
  Process.find()
  .then(processes => {
    res.status(200).json(processes);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function update(req, res) {
  const { _id } = req.params;
  
  Process.findByIdAndUpdate({_id}, req.body, { new: true })
  .then(updated => {
    res.status(200).send(updated);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function remove(req, res) {
  const { _id } = req.params;

  Process.findByIdAndDelete(_id)
  .then(deleted => {
    res.status(200).send(deleted);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function createStep(req, res) {
  const { processId } = req.params;
  const { number, company, fromJasmin, document } = req.body;
  const newStep = new Step({
    number,
    company,
    fromJasmin,
    document,
  });
  newStep.save()
  .then(step => {
    Process.findByIdAndUpdate(processId, { "$push": { "steps": step._id } })
    .then(() => {
      res.status(201).json(step);
    })
    .catch(err => {
      res.status(400).send(err);
    });
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function readStep(req, res) {
  const { stepId } = req.params;

  Step.findById(stepId)
  .then(step => {
    res.status(200).json(step);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function readAllSteps(req, res) {
  const { processId } = req.params;
  Process.findById(processId)
  .then(process => {
    res.status(200).json(process.steps);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function updateStep(req, res) {
  const { stepId } = req.params;
  
  Step.findByIdAndUpdate(stepId, req.body, { new: true })
  .then(updated => {
    res.status(200).send(updated);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function removeStep(req, res) {
  const { processId, stepId } = req.params;

  Step.findByIdAndDelete(stepId)
  .then(deleted => {
    Process.findByIdAndUpdate(processId, { $pull: { steps: deleted._id } })
    .then(() => {
      res.status(200).send(deleted);
    })
    .catch(err => {
      res.status(404).send(err);  
    })
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

module.exports = {
  create,
  read,
  readAll,
  update,
  remove,
  readStep,
  createStep,
  readAllSteps,
  updateStep,
  removeStep,
};