'use strict';

const Company = require('../database/models/company');

function create(req, res){
	const {id, appId, appSecret, tenant, organization} = req.body;
	const newCompany = new Company({
		id,
		appId,
		appSecret,
		tenant,
		organization,
	});
	newCompany.save()
	.then(log => {
      res.status(201).json(log);
  	})
  	.catch(err => {
      res.status(400).send(err);
  	});
}

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
    res.status(200).send(updated);
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
};