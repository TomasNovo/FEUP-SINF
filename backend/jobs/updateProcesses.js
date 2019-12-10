const activeProcess = require('../database/models/activeProcess');

async function updateProcesses(job)
{
    let lastCheck = {id: "alskflak"};
    const ap = await activeProcess.find();

    /*
    for(let i = 0; i < ap.length; i++)
        if(ap[i].currentStep.) */
}

module.exports = updateProcesses;