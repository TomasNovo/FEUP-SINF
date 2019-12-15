'use strict';

const ActiveProcess = require('../database/models/activeProcess');

function create(req, res) {
  const newActiveProcess = new ActiveProcess(req.body);
  newActiveProcess.save()
  .then(activeProcess => {
    res.status(201).json(activeProcess);
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function read(req, res) {
  const { _id } = req.params;

  ActiveProcess.findById(_id)
  .then(activeProcess => {
    res.status(200).json(activeProcess);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function readAll(req, res) {
  ActiveProcess.find()
  .then(activeProcesses => {
    res.status(200).json(activeProcesses);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function update(req, res) {
  const { _id } = req.params;

  ActiveProcess.findByIdAndUpdate(_id, req.body, { new: true })
  .then(updated => {
    res.status(200).send(updated);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function remove(req, res) {
  const { _id } = req.params;

  ActiveProcess.findByIdAndDelete(_id)
  .then(deleted => {
    res.status(200).send(deleted);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function removeAll(req, res) {
  ActiveProcess.deleteMany({})
  .then(aps => {
    res.status(200).send(aps);
  })
  .catch(err => {
    res.status(401).send(err);
  });
}

module.exports = {
  create,
  read,
  readAll,
  update,
  remove,
  removeAll,
};