'use strict';

const MasterData = require('../database/models/masterData');

function create(req, res) {
  res.send('Hello from create');
}

function read(req, res) {
  res.send('Hello from read');
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