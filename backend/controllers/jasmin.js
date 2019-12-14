'use strict'

require('dotenv').config();
const Company = require('../database/models/company');
const logs = require('../controllers/log');

const axios = require('axios');
const querystring = require('querystring');

const tokenLink = 'https://identity.primaverabss.com/core/connect/token';
const apiLink = 'http://my.jasminsoftware.com/api/';
let tokens = ['', ''];
let appIds = [];
let appSecrets = [];
let companyIds = [];
const maxRetry = 3;

// Company is either 0 or 1
function getToken(callback, company, retry)
{
	retry = retry || maxRetry;

	if (retry === 0) {
		tokens[company] = undefined;
		let errorMsg = 'Failed to get company token, appId = ' + appIds[company] + ", appSecret = " + appSecrets[company];
		console.log(errorMsg);
		logs.addLog('Error', '', '', errorMsg);
		return;
	}

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
		getToken(callback, company, retry-1);

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

	const link = apiLink + companyIds[company] + '/materialscore/materialsitems';
	axios.get(link, {
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
			let errorMsg = 'Failed to make GET request on ' + link;
			console.log(errorMsg);
			logs.addLog('Error', '', '', errorMsg);
			res.status(400).json({success: false, error: error});
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

	const link = apiLink + companyIds[company] + '/salescore/salesitems';
	axios.get(link, {
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
			let errorMsg = 'Failed to make GET request on ' + link;
			console.log(errorMsg);
			logs.addLog("Error", "", "", errorMsg);
			res.status(400).json({ success: false, error: error });
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

	const link = apiLink + companyIds[company] + '/businesscore/items';
	axios.get(link, {
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
			let errorMsg = 'Failed to make GET request on ' + link;
			console.log(errorMsg);
			logs.addLog("Error", "", "", errorMsg);
			res.status(400).json({ success: false, error: error });
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

	const link = apiLink + companyIds[company] + '/materialscore/warehouses';
	axios.get(link, {
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
			let errorMsg = 'Failed to make GET request on ' + link;
			console.log(errorMsg);
			logs.addLog("Error", "", "", errorMsg); 
			res.status(400).json({success: false, error: error});
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
	
	let companyNames, tenants, organizations;
	
	Company.find({}, function(err, comps){
		
		if (comps.length === 0) {
		
			appIds = [process.env.APP_ID_1, process.env.APP_ID_2];
			appSecrets = [process.env.APP_SECRET_1, process.env.APP_SECRET_2];
			companyNames = [process.env.COMPANY_NAME_1, process.env.COMPANY_NAME_2];
			tenants = [process.env.TENANT_1, process.env.TENANT_2];
			organizations = [process.env.ORGANIZATION_1, process.env.ORGANIZATION_2];
			companyIds = [tenants[0] + "/" + organizations[0], tenants[1] + "/" + organizations[1]];

			for (let i = 0; i < 2; i++) {
				let company = new Company({id:i, 
								   	       appId:appIds[i], 
								           appSecret:appSecrets[i], 
								           tenant:tenants[i],
								           organization:organizations[i], 
								           name:companyNames[i]});
				company.save();
			}
		} else {
			
			appIds=[comps[0].appId, comps[1].appId];
			appSecrets=[comps[0].appSecret, comps[1].appSecret];
			tenants=[comps[0].tenant, comps[1].tenant];
			organizations=[comps[0].organization, comps[1].organization];
			companyIds=[tenants[0]+"/"+organizations[0], tenants[1]+"/"+organizations[1]];
		}

		console.log("Settings initialized");
		console.log('appIds = ' + JSON.stringify(appIds));
		console.log('appSecrets = ' + JSON.stringify(appSecrets));
		console.log('companyIds = ' + JSON.stringify(companyIds));
		console.log('companyNames = ' + JSON.stringify(companyNames));
		console.log('tenants = ' + JSON.stringify(tenants));
		console.log('organizations = ' + JSON.stringify(organizations));

	});
}

initializeSettings();

module.exports = {
	getMaterialItems: getMaterialItems,
	getSalesItems: getSalesItems,
	getBusinessItems: getBusinessItems,
	getWarehouses: getWarehouses,
	getToken: getToken,
	initializeSettings: initializeSettings
};