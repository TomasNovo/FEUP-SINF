const activeProcess = require('../database/models/activeProcess');
const process = require('../database/models/process');
const axios = require('axios');

const codes = {
  1: {
    client: '0001',
    supplier: '0001',
  },
  0: {
    client: '0001',
    supplier: '0001',
  },
}

let documents = [];
let data = {};
 
const date = new Date(2019, 11, 14);
// const date = new Date(Date.now);

async function updateProcesses(job)
{
    const lastCheck = job.attrs.data.lastCheck;
    const ap = await activeProcess.find();

    for(let i = 0; i < ap.length; i++) {
        const proc = await process.findById(ap[i].processId); 
        const currentStep = proc.steps[ap[i].currentStep - 1];
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

        case "Delivery":

            break;

        case "Purchase Invoice":
          console.log('purchase invoice')
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

    // await incrementStep(activeProcess, process);
}

async function checkJasminDocs(lastCheck, process, activeProcess, step)
{
    let company = await axios.get(`http://localhost:7000/api/company/index/${step.company}`);
    company = company.data;

    let docs = [];
    let code;
    let passOnData = {
      documentLines: []
    };
    let item;

    //TODO Check document contents to match to services or sale process (item in sales, materials and regular or just materials and regular ?)
    switch(step.document)
    {
        case "Sales Order":
            docs = await axios.get(`http://localhost:7000/api/jasmin/getSalesOrder/${company.id}`);
            break;

        case "Delivery":
            docs = await axios.get();
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
          docs = await axios.get(`http://localhost:7000/api/jasmin/sales-invoice/${company.id}`);
          code = codes[company.id].client;
          item = 'salesItem';
          break;

        case "Payment":

            break;

        default:
            console.log("Unknown document: " + step.document);
    }

    docs = docs.data.result;
    for(let i = docs.length - 1; i >= 0; i--)
    {   
      // IMP: Change to lastCheck once it's done
        if(new Date(docs[i].createdOn) > date && code === docs[i].buyerCustomerParty)
        {
          let repeated = false;
          documents.forEach(element => {
            if(element === docs[i].id) {
              repeated = true;
            }
          });
          if(repeated) {
            break;
          }

          console.log('found one')
          
          docs[i].documentLines.forEach(element => {
            passOnData.documentLines.push({
              item: element[item],
              quantity: element.quantity,
              unitPrice: element.unitPrice,
            })
          });

            if(activeProcess)
                await incrementStep(activeProcess, process);
            else {
                await axios.post("http://localhost:7000/api/active-process", {
                    processId: process._id,
                    currentStep: 2, 
                    data: passOnData
                })
                .catch(error => {
                    console.log(error);
                })
              }
          documents.push(docs[i].id); 
        } 
    }       
}

function checkDocument(document, step)
{
    /*
        Name | date | origin | recipient
        --------------------------------
        Sales Order | postingDate | company | buyerCustomerPartyName
        Purchase Order | postingDate | company | sellerSupplierPartyName
        Delivery | postingDate | company | logisticsPartyName ?? 
        Goods Receipt | postingDate?? | company?? | 
        Sales Invoice | postingDate | company | buyerCustomerParty
        Purchase Invoice | postingDate | company | sellerSupplierPartyName
        Payment | ?? | ??? | ???
        Receivable | postingDate | company | financialAccount
    */
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