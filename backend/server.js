const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

require('./database/mongo');
const schema = require('./database/schema');
const jasmin = require('./jasminIntegration');


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


app.use('/api', router);
const server = app.listen(7000, () => 
{
	console.log(`Express running → PORT ${server.address().port}`);
});
