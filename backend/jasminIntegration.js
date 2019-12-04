require('dotenv').config();

const request = require('request');


function getToken(callback)
{
 
	request({
	  url: 'https://identity.primaverabss.com/core/connect/token',
	  method: 'POST',
	  auth: {
		  user: process.env.APP_ID,
		  pass: process.env.APP_SECRET
	  },
	  form: {
	    'grant_type': 'client_credentials',
	    'scope': 'application',
	  }
	}, function(err, res) {
	  if (!err) {
		var json = tryParseJSON(res.body);

		if (json.access_token === undefined)
			console.log("Error! " + json.error);
		else
		{
			console.log("Created new token! " + res.body);

			callback(json.access_token);
		}
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
			url: 'http://my.jasminsoftware.com/api/226454/226454-0001/businesscore/items',
			method: 'GET',
			headers:
			{
				Authorization: "bearer " + token,
				'Content-Type': 'application/json'
			}
		},
		(err, res) => {
			if (!err) {
				// console.log("Received: " + JSON.stringify(res));

				if (res.body !== undefined) {
					let json = tryParseJSON(res.body);

					console.log("Status code: " + res.statusCode);

					if (json)
						console.log("Body:\n" + res.body);
				}
			}
			else {
				console.log(err);
				return undefined;
			}
		})});
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

module.exports = {
	getItems: getItems
};