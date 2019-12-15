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
    res.status(201).json(mapping);
  })
  .catch(err => {
    res.status(400).send(err);
  });
}

function read(req, res) {
  const { id } = req.params;

  MasterData.findOne({$or:[{ idA: id }, { idB: id }]}).orFail()
  .then(mapping => {
    res.status(200).json(mapping);
  })
  .catch(err => {
    res.status(404).send(err);
  })
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
  const { id } = req.params;
  const {idA, idB} = req.body;

  MasterData.deleteMany({ $or: [{ idA: idA }, { idB: idB }] })
  .then(info => {
  })
  .catch(err => {
  })
  
  const newMapping = new MasterData({
    idA,
    idB,
  });
  newMapping.save()
    .then(mapping => {
      res.status(200).json(mapping);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

function remove(req, res) {
  const { id } = req.params;

  MasterData.deleteOne({$or:[{ idA: id }, { idB: id }]}).orFail()
  .then(info => {
    res.status(200).send(info);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function getMappedId(req, res) {
  const { id } = req.params;

  MasterData.find({idA: id})
  .then(mapping => {
    res.status(200).send(mapping.idB);
  })

  MasterData.find({idB: id}) 
  .then(mapping => {
    res.status(200).send(mapping.idA);
  })
  .catch(err => {
    res.status(404).send(err);
  });
}

module.exports = {
  create,
  read,
  readAll,
  update,
  remove,
  getMappedId,
};