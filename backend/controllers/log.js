'use strict';

const Log = require('../database/models/log');

function addLog(type, processId, stepId, message) {
  
  if (processId === "")
    processId = undefined;

  if (stepId === "")
    stepId = undefined;

  const newLog = new Log({
    type,
    processId,
    stepId,
    message,
  });
  newLog.save()
    .then(log => {
     return true;
    })
    .catch(err => {
      return false;
    });
}

function create(req, res) {
  const { type, processId, stepId, message } = req.body;
  const newLog = new Log({
    type,
    processId,
    stepId,
    message,
  });
  newLog.save()
  .then(log => {
    res.status(201).json(log);
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function read(req, res) {
  const { _id } = req.params;

  Log.findById(_id)
  .then(log => {
    res.status(200).json(log);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function readAll(req, res) {
  Log.find()
  .then(logs => {
    res.status(200).json(logs);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function update(req, res) {
  const { _id } = req.params;
  
  Log.findByIdAndUpdate(_id, req.body, { new: true })
  .then(updated => {
    res.status(200).send(updated);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function remove(req, res) {
  const { _id } = req.params;

  Log.findByIdAndDelete(_id)
  .then(deleted => {
    res.status(200).send(deleted);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

module.exports = {
  addLog,
  create,
  read,
  readAll,
  update,
  remove,
};