'use strict';

const Log = require('../database/models/log');

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

function update(req, res) {
  res.send('Hello from update');
}

function remove(req, res) {
  res.send('Hello from remove');
}

module.exports = {
  create,
  read,
  update,
  remove,
};