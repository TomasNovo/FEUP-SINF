const Agenda = require('agenda');
const updateProcesses = require('./jobs/updateProcesses');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('./database/mongo');

const masterDataRouter = require('./routes/masterData');
const logRouter = require('./routes/log');
const processRouter = require('./routes/process');
const activeProcessRouter = require('./routes/activeProcess');
const jasminRouter = require('./routes/jasmin');
const companyRouter = require('./routes/company');

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
app.use('/api/company', companyRouter);

const server = app.listen(7000, () => 
{
	console.log(`Express running → PORT ${server.address().port}`);
});

const agenda = new Agenda({db: {address: 'mongodb://localhost:27017/masterData'}});

agenda.on('ready', async function() {
	await agenda.cancel({name: 'update processes'});
	agenda.define('update processes', updateProcesses);
	await agenda.start();
	//Array associativo de activeProcess ids com data
	await agenda.every('10 seconds', 'update processes', {lastCheck: new Date(), lastData: []});
})