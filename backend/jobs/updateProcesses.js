const activeProcess = require('../database/models/activeProcess');
const process = require('../database/models/process');
const axios = require('axios');

async function updateProcesses(job)
{
    const lastCheck = job.attrs.data.lastCheck;

    console.log(lastCheck);
    
    const ap = await activeProcess.find();

    for(let i = 0; i < ap.length; i++) {
        const proc = await process.findById(ap[i].processId); 
        const currentStep = process.steps[ap[i].currentStep - 1];

        if(!currentStep.fromJasmin)
            await executeStep(ap[i], proc, currentStep);
        else
            await checkJasminDocs(lastCheck, proc, ap[i], currentStep);
    }

    
    const processes = await process.find();

    for(let i = 0; i < processes.length; i++)
        if(processes[i].steps[0].fromJasmin)
            await checkJasminDocs(lastCheck, processes[i], null, processes[i].steps[0]);
        else
            await executeStep(null, processes[i], processes[i].steps[0]);

    job.attrs.data.lastCheck = new Date();
}

async function executeStep(activeProcess, process, step)
{
    //TODO Check item mappings
    switch(step.document)
    {
        case "Sales Order":

            break;

        case "Shipping Note":

            break;

        case "Purchase Invoice":

            break;

        case "Receivable":

            break;

        case "Purchase Order":

            break;

        case "Goods Receipt":

            break;

        case "Sales Invoice":

            break;

        case "Payment":

            break;

        default:
            console.log("Unknown document: " + step.document);
    }

    await incrementStep(activeProcess, process);
}

async function checkJasminDocs(lastCheck, process, activeProcess, step)
{
    let docs = [];

    //TODO Check document contents to match to services or sale process (item in sales, materials and regular or just materials and regular ?)
    switch(step.document)
    {
        case "Sales Order":

            break;

        case "Shipping Note":

            break;

        case "Purchase Invoice":

            break;

        case "Receivable":

            break;

        case "Purchase Order":

            break;

        case "Goods Receipt":

            break;

        case "Sales Invoice":

            break;

        case "Payment":

            break;

        default:
            console.log("Unknown document: " + step.document);
    }

    //TODO: Check if docs are ordered by creation date

    for(let i = docs.length - 1; i >= 0; i--)
        if(docs[i].postingDate > lastCheck)
        {
            if(activeProcess)
                await incrementStep(activeProcess, process);
            else
                await axios.post("http://localhost:7000/api/active-process", {
                    processId: process._id,
                    currentStep: 1
                })
                .catch(error => {
                    console.log(error);
                })
        }
            
}

async function incrementStep(activeProcess, process)
{
    if(activeProcess.currentStep + 1 >= process.steps.length)
        await axios.delete(`http://localhost:7000/api/active-process/${activeProcess._id}`)
        .catch(error => {
            console.log(error);
        })
    else
        await axios.put(`http://localhost:7000/api/active-process/${activeProcess._id}`, {
            currentStep: activeProcess.currentStep + 1
        })
        .catch(error => {
            console.log(error);
        })
}

module.exports = updateProcesses;