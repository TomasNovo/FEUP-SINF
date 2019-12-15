'use strict'

require('dotenv').config();
const Company = require('../database/models/company');

const axios = require('axios');
const querystring = require('querystring');

const tokenLink = 'https://identity.primaverabss.com/core/connect/token';
const apiLink = 'http://my.jasminsoftware.com/api/';
let tokens = ['', ''];
let appIds = [];
let appSecrets = [];
let companyIds = [];

// Company is either 0 or 1
function getToken(callback, company)
{
	// Needs to use use x-www-form-urlencoded so we use querystring as seen in the documentation of axios
	axios.post(tokenLink, querystring.stringify({
		grant_type: 'client_credentials',
		scope: 'application'
	}), {
			auth: {
				username: appIds[company],
				password: appSecrets[company]
			}
		}
	)
	.then((res) => {

		console.log("Created new token!");
		console.log(res.data.access_token);
		tokens[company] = res.data.token_type + ' ' + res.data.access_token;

		if (callback !== undefined)
			callback();
	})
	.catch((error) => {
		console.log(error);
		tokens[company] = undefined;
	});
}

function getMaterialItems(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}


	axios.get(apiLink + companyIds[company] + '/materialscore/materialsitems', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getMaterialItems(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getSalesItems(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}


	axios.get(apiLink + companyIds[company] + '/salescore/salesitems', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getSalesItems(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getBusinessItems(req, res) {
	const { company } = req.params;

	if (company === undefined) {
		res.status(400).json({ success: false, error: 'company parameter is required!' });
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({ success: false, error: 'company is either 0 or 1' });
		return;
	}

	axios.get(apiLink + companyIds[company] + '/businesscore/items', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({ success: true, result: data });
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getBusinessItems(req, res), company);
		} else {
			res.status(400).json({ success: false, error: error.statusText });
		}
	});
}

function getWarehouses(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}


	axios.get(apiLink + companyIds[company] + '/materialscore/warehouses', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getWarehouses(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getSalesOrders(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + '/sales/orders', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getSalesOrders(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getDeliveries(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + '/shipping/deliveries', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getDeliveries(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getPurchaseInvoice(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + '/invoiceReceipt/invoices', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getPurchaseInvoice(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getReceivable(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + '/accountsReceivable/receipts', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getReceivable(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getPurchaseOrder(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + '/purchases/orders', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getPurchaseOrder(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getGoodsReceipt(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + `/shipping/processOrders/1/1000?company=${req.params.name}`, {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getGoodsReceipt(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function getSalesInvoice(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
  }

  // console.log(companyIds)

	axios.get(apiLink + companyIds[company] + '/billing/invoices/', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response !== undefined && error.response.status === 401) {
			getToken(() => getSalesInvoice(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

//PODE NAO DAR
function getPayment(req, res)
{
	const {company} = req.params;

	if (company === undefined) {
		res.status(400).json({success: false, error: 'company parameter is required!'});
		return;
	}

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
	}

	axios.get(apiLink + companyIds[company] + '/accountsPayable/payments', {
		headers: {
			'Authorization': tokens[company]
		}
	})
	.then((response) => {

		let data = response.data;

		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {

		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => getPayment(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function filterByDate(json) {

	let result = [];
	const baseDate = new Date('November 1, 2019');

	for (const item of json) {
		let date = new Date(item.createdOn);

		if (date.getTime() > baseDate.getTime())
			result.push(item);
	}

	return result;
}

function tryParseJSON(jsonString) {
	try {
		var o = JSON.parse(jsonString);

		// Handle non-exception-throwing cases:
		// Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
		// but... JSON.parse(null) returns null, and typeof null === "object", 
		// so we must check for that, too. Thankfully, null is falsey, so this suffices:
		if (o && typeof o === "object") {
			return o;
		}
	}
	catch (e) { }

	return false; 
}

function initializeSettings() {
	
	Company.find({}, function(err, comps){
		if(comps.length === 0) {
			appIds = [process.env.APP_ID_1, process.env.APP_ID_2];
			appSecrets = [process.env.APP_SECRET_1, process.env.APP_SECRET_2];
			let companyNames = [process.env.COMPANY_NAME_1, process.env.COMPANY_NAME_2];
			let tenants = [process.env.TENANT_1, process.env.TENANT_2];
			let organizations = [process.env.ORGANIZATION_1, process.env.ORGANIZATION_2];
			companyIds = [tenants[0] + "/" + organizations[0], tenants[1] + "/" + organizations[1]];

			for(let i = 0; i < 2; i++){
				let company = new Company({id:i, 
								   	       appId:appIds[i], 
								           appSecret:appSecrets[i], 
								           tenant:tenants[i],
								           organization:organizations[i], 
								           name:companyNames[i]});
				company.save();
			}
		}else{
			appIds=[comps[0].appId, comps[1].appId];
			appSecrets=[comps[0].appSecret, comps[1].appSecret];
			let tenants=[comps[0].tenant, comps[1].tenant];
			let organizations=[comps[0].organization, comps[1].organization];
			companyIds=[tenants[0]+"/"+organizations[0], tenants[1]+"/"+organizations[1]];
		}
	});

	console.log("Settings initialized");
}

function createPurchaseInvoice(req, res) {
  const {company} = req.params;

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
  }

	axios.post(apiLink + companyIds[company] + '/invoiceReceipt/invoices', querystring.stringify(req.body), {
		headers: {
      'Authorization': tokens[company],
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
	.then((response) => {
    // console.log('criou', response.status);
    console.log('criou', response.data);
		let data = response.data;
		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {
    console.log('não criou', error.response.status);
		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => createPurchaseInvoice(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

function createSalesInvoice(req, res) {
  const {company} = req.params;

	if (company !== "0" && company !== "1") {
		res.status(400).json({success: false, error: 'company is either 0 or 1'});
		return;
  }

	axios.post(apiLink + companyIds[company] + '/billing/invoices/', req.body, {
		headers: {
			'Authorization': tokens[company]
    },
	})
	.then((response) => {
		let data = response.data;
		res.status(200).json({success: true, result: data});
	})
	.catch((error) => {
		if (error.response.status !== undefined && error.response.status === 401) {
			getToken(() => createSalesInvoice(req, res), company);
		} else {
			res.status(400).json({success: false, error: error.statusText});
		}
	});
}

initializeSettings();

module.exports = {
	getMaterialItems: getMaterialItems,
	getSalesItems: getSalesItems,
	getBusinessItems: getBusinessItems,
	getWarehouses: getWarehouses,
	getToken: getToken,
	initializeSettings: initializeSettings,
	getSalesOrders: getSalesOrders,
	getDeliveries: getDeliveries,
	getPurchaseInvoice: getPurchaseInvoice,
	getReceivable: getReceivable,
	getPurchaseOrder: getPurchaseOrder,
	getGoodsReceipt: getGoodsReceipt,
	getSalesInvoice: getSalesInvoice,
  getPayment: getPayment,
  createPurchaseInvoice: createPurchaseInvoice,
  createSalesInvoice,
};