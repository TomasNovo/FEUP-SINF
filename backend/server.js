const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('./database/mongo');
const schema = require('./database/schema');
const masterDataRouter = require('./routes/masterData');
const logRouter = require('./routes/log');
const processRouter = require('./routes/process');
const activeProcessRouter = require('./routes/activeProcess');

const app = express();
app.use(express.static(__dirname + '/public'));
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API
router.get('/', (req, res) => 
{
	res.send('Hello! ^^');
});

router.get('/data', (req, res) =>
{
	schema.Data.find((err, data) =>
	{
		return (err) ? res.json({ success: false, error: err }) : res.json({ success: true, data: data });
	});
});

router.get('/mapping', (req, res) =>
{
	schema.Mapping.find({},(err, data) =>
	{
		return (err) ? res.json({ success: false, error: err }) : res.json({ success: true, data: data });
	});
});

router.get('/mapping/:id1/:id2/', (req, res) =>
{
    console.log(req.params);

	schema.Mapping.find({id1: req.params.id1, id2: req.params.id2},(err, data) =>
	{
		return (err) ? res.json({ success: false, error: err }) : res.json({ success: true, data: data });
	});
});

router.post('/mapping', (req, res) =>
{
	let mapping = new schema.Mapping();
  
	const { id1, id2 } = req.body;
  
	if ((!id1 && id1 !== 0) || (!id2 && id2 !== 0))
	{
		return res.json(
		{
			success: false,
			error: 'INVALID INPUTS',
		});
	}

	mapping.id1 = id1;
	mapping.id2 = id2;
	mapping.save((err) => 
	{
		if (err)
			return res.json({ success: false, error: err });
		else
	  		return res.json({ success: true });
	});
});

// this is our delete method
// this method removes existing data in our database
router.delete('/mapping', (req, res) =>
{
	const { id1, id2 } = req.body;
	
	if (id1 === undefined || id2 === undefined)
	{
		res.status(412);
		return res.send(err);
	}
	
	schema.Mapping.find({id1: id1, id2: id2},(err, data) =>
	{
		var queryResult = (err) ? undefined : data;

		if (queryResult === undefined)
		{
			res.status(400);
			return res.json({ success: true, error: err });
		}

		if (queryResult.length === 0)
		{
			res.status(200);
			return res.json({ success: true, error: "Entry not found" });
		}

		// Iterate result and delete each entry that matches
		for (var i = 0; i < queryResult.length; i++)
		{
			queryResult[i].remove((err) =>
			{
				if (err)
				{
					res.status(400);
					return res.send(err);
				}
			});
		}

		res.status(201);
		return res.json({ success: true });
	});



    
});

app.use('/api/master-data', masterDataRouter);
app.use('/api/log', logRouter);
app.use('/api/process', processRouter);
app.use('/api/active-process', activeProcessRouter);
app.use('/api', router);

const server = app.listen(7000, () => 
{
	console.log(`Express running → PORT ${server.address().port}`);
});


const appId = 'FEUP-SINF-B';
const appSecret = 'cb7c111f-7431-41de-9d77-b67d5de2172c';
var request = require('request');

function getToken(callback)
{
 
	request({
	  url: 'https://identity.primaverabss.com/core/connect/token',
	  method: 'POST',
	  auth: {
		  user: appId, // TODO : put your application client id here
		  pass: appSecret // TODO : put your application client secret here
	  },
	  form: {
	    'grant_type': 'client_credentials',
	    'scope': 'application',
	  }
	}, function(err, res) {
	  if (!err) {
		var json = JSON.parse(res.body);
		// console.log("Received: " + res.body);
		console.log("Created new token!");

		callback(json.access_token);
	  }
	  else {
		console.log(err);
		token = undefined;
	  }
	});
}


function getItems()
{
	getToken((token) => 
	{
		request({
			url: 'http://my.jasminsoftware.com/api/226454/226454-0001/sales/orders',
		method: 'GET',
		headers:
		{
			Authorization: "bearer " + token,
			'Content-Type': 'application/json'
		}
	},
		function (err, res) {
			if (!err) {
				// console.log("Received: " + JSON.stringify(res));

				if (res.body !== undefined) {
					let json = tryParseJSON(res.body);

					console.log("Status code: " + res.statusCode);

					if (json)
						console.log("Body:\n" + res.body);
				}

				if (res.headers !== undefined) {
					console.log(JSON.stringify(res.headers));
				}
			}
			else {
				console.log(err);
				return undefined;
			}
		})});
}

// getItems();

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
};
