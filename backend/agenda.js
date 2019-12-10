const Agenda = require('agenda');
const updateProcesses = require('./jobs/updateProcesses');

const agenda = new Agenda({db: {address: 'mongodb://localhost:27017/masterData'}});

agenda.define('update processes', updateProcesses);

module.exports = agenda;