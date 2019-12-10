'use strict';

const Process = require('../database/models/process');
const Step = require('../database/models/step');

function create(req, res) {
  const { name, steps } = req.body;
  const newProcess = new Process({ name, steps });
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
    ActiveProcess.deleteMany({ processId: _id })
      .then(() => {
        res.status(200).send(deleted);
      })
      .catch(() => {
        res.status(200).send(deleted);      
      })
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function createStep(req, res) {
  const { processId } = req.params;

  Process.findByIdAndUpdate(processId, { "$push": { "steps": req.body } })
  .then(() => {
    res.status(201).json(step);
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function readStep(req, res) {
  const { processId, stepNumber } = req.params;

  Process.findById(processId)
  .then(process => {
    let step = null;
    process.steps.forEach(element => {
      if(element.number == stepNumber) {
        step = element;
      }
    });
    if(step != null) {
      res.status(200).json(step);
    }
    else {
      res.status(404).send(err);
    }
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

module.exports = {
  create,
  read,
  readAll,
  update,
  remove,
  readStep,
  createStep,
  readAllSteps
};