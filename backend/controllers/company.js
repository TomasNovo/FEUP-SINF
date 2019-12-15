'use strict';

const Company = require('../database/models/company');
const jasmin = require('./jasmin');

function read(req, res) {
  const  company_id  = req.params.id;
  Company.find( { 'id': company_id} )
  .then(company => {
    res.status(200).json(company);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function readAll(req, res) {
  Company.find()
  .then(companies => {
    res.status(200).json(companies);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function update(req, res) {
  const company_id = req.params.id;
  let query = {'id' : company_id};
  Company.findOneAndUpdate(query, req.body, { new: true })
  .then(updated => {

    jasmin.initializeSettings();

    res.status(200).send(updated);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

function getCompanyIndex(req, res) {
  let query = {'name' : req.params.name};
  Company.findOne(query)
  .then(company => {
    res.status(200).send(company);
  })
  .catch(err => {
    res.status(404).send(err);
  })
}

module.exports = {
  read,
  readAll,
  update,
  getCompanyIndex
};