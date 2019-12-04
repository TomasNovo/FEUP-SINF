'use strict';

const MasterData = require('../database/models/masterData');

// Helper method
function findMapping(id, thenCallback, catchCallback) {
  MasterData.find().or([{idA: id}, {idB: id}]).orFail()
  .limit(1)
  .then(thenCallback)
  .catch(catchCallback)
}

function create(req, res) {
  const { idA, idB } = req.body;
  const newMapping = new MasterData({
    idA,
    idB,
  });
  newMapping.save()
  .then(mapping => {
    res.status(201).json(mapping);
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function read(req, res) {
  const { id } = req.params;

  findMapping(id, mapping => {
    res.status(200).json(mapping[0]);
  }, err => {
    res.status(404).send(err);
  });
}

function readAll(req, res) {
  MasterData.find()
  .then(mappings => {
    res.status(200).json(mappings);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function update(req, res) {
  const { idA, idB } = req.body;
  const { id } = req.params;
  
  findMapping(id, mapping => {
    mapping[0].updateOne({ idA, idB })
    .then(updated => {
      res.status(200).send(updated);
    })
    .catch(err => {
      res.status(404).send(err);
    })
  }, err => {
    res.status(404).send(err);
  });
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