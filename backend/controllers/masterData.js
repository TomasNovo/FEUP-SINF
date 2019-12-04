'use strict';

const MasterData = require('../database/models/masterData');

function create(req, res) {
  const { idA, idB } = req.body;
  const newMapping = new MasterData({
    idA,
    idB,
  });
  newMapping.save()
  .then(mapping => {
    res.status(201).json({mapping});
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function read(req, res) {
  const { id } = req.params;

  MasterData.find().or([{idA: id}, {idB: id}]).orFail()
  .then(mapping => {
    res.status(200).json({mapping});
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function readAll(req, res) {
  res.send('Hello from readAll');
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
  readAll,
  update,
  remove,
};