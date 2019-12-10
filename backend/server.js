const agenda = require('./agenda');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('./database/mongo');

const masterDataRouter = require('./routes/masterData');
const logRouter = require('./routes/log');
const processRouter = require('./routes/process');
const activeProcessRouter = require('./routes/activeProcess');
const jasminRouter = require('./routes/jasmin');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/master-data', masterDataRouter);
app.use('/api/log', logRouter);
app.use('/api/process', processRouter);
app.use('/api/active-process', activeProcessRouter);
app.use('/api/jasmin', jasminRouter);

const server = app.listen(7000, () => 
{
	console.log(`Express running → PORT ${server.address().port}`);
});

(async function() {
	await agenda.start();
	await agenda.every('2 seconds', 'update processes');
})();