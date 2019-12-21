'use strict';

const ActiveProcess = require('../database/models/activeProcess');
const Company = require('../database/models/company');
const Log = require('../database/models/log');
const MasterData = require('../database/models/masterData');
const Process = require('../database/models/process');

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
  const { id } = req.params;
  const { appId, appSecret, tenant, organization, name } = req.body;

  Company.findOneAndUpdate({ 'id': id }, { appId, appSecret, tenant, organization, name }, { new: true })
  .then(updated => {

    jasmin.initializeSettings();

    deleteDatabase();

    res.status(200).send(updated);
  })
  .catch(err => {
    console.log(err);
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

function deleteDatabase() {

  ActiveProcess.deleteMany({})
  .then(info => {
  })
  .catch(err => {
    console.log(err);
  });

  Log.deleteMany({})
  .then(info => {
  })
  .catch(err => {
    console.log(err);
  });

  MasterData.deleteMany({})
  .then(info => {
  })
  .catch(err => {
    console.log(err);
  });

  Process.deleteMany({})
  .then(info => {
  })
  .catch(err => {
    console.log(err);
  });

  console.log("Deleted database for new company");
}

module.exports = {
  read,
  readAll,
  update,
  getCompanyIndex
};