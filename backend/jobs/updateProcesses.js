const activeProcess = require('../database/models/activeProcess');
const process = require('../database/models/process');
const axios = require('axios');

let documents = ["9eab2694-401f-ea11-8454-0003ff24768f", "a0bb6719-541f-ea11-8454-0003ff24768f"];
let data = {};
 
const date = new Date(2019, 11, 15);
// const date = new Date(Date.now);

async function updateProcesses(job)
{
    const lastCheck = job.attrs.data.lastCheck;
    const ap = await activeProcess.find();

    console.log("checked @" + lastCheck);

    for(let i = 0; i < ap.length; i++) {
        const proc = await process.findById(ap[i].processId); 
        const currentStep = proc.steps[ap[i].currentStep - 1];
        if(!currentStep.fromJasmin) {
          await executeStep(ap[i], proc, currentStep);
        }
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
  let company = await axios.get(`http://localhost:7000/api/company/index/${step.company}`);
  company = company.data;

  let response; 

    //TODO Check item mappings
    switch(step.document)
    {
        case "Sales Order":
          console.log('sales order')
          const POdocumentLines = activeProcess.data.documentLines;
          const POdeliveryTerm = activeProcess.data.deliveryTerm;
          const PObuyer = activeProcess.data.buyer;
          let body = {
            deliveryTerm: POdeliveryTerm,
            company: PObuyer,
            buyerCustomerParty: company.customer,
            documentLines: [], 
          }

          for(let i=0; i<POdocumentLines.length; i++) {
            const { item, quantity, unitPrice } = POdocumentLines[i];
            let itemKey = await axios.get(`http://localhost:7000/api/master-data/${item}/mapping`);
            // TO DO: Verificar se não deu erro e logs
            itemKey = itemKey.data; 
            body.documentLines.push({
              salesItem: itemKey,
              quantity,
              unitPrice,
            })
          };
          response = await axios.post(`http://localhost:7000/api/jasmin/sales-order/${company.id}`, body);
          if (response.data.success) {
            documents.push(response.data.result);
          } 
          // TO DO: Logs
          break;

        case "Delivery":

            break;

        case "Purchase Invoice":
          const { documentLines } = activeProcess.data;
          body = {
            company: company.name,
            sellerSupplierParty: company.supplier,
            documentLines: []
          }

            for(let i=0; i<documentLines.length; i++) {
            const { item, quantity, unitPrice } = documentLines[i];
            let itemKey = await axios.get(`http://localhost:7000/api/master-data/${item}/mapping`);
            // TO DO: Verificar se não deu erro e logs
            itemKey = itemKey.data; 
            body.documentLines.push({
              PurchasesItem: itemKey,
              quantity,
              unitPrice,
            })
          };
          response = await axios.post(`http://localhost:7000/api/jasmin/purchase-invoice/${company.id}`, body);
          if (response.data.success) {
            documents.push(response.data.result);
          } 
          // TO DO: Logs
  
          break;

        case "Receivable":
          const sourceDoc = activeProcess.data["Sales Invoice"];
          const { discount, settled, buyer } = activeProcess.data;
          response = await axios.post(`http://localhost:7000/api/jasmin/receivable/${company.id}/${buyer}`,
            [{sourceDoc, discount, settled}]
          );
          if(response.data.success) {  
            documents.push(response.data.result); 
          }
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


/*
    Name | date | origin | recipient
    --------------------------------
    Sales Order | postingDate | company | buyerCustomerPartyName
    Purchase Order | postingDate | company | sellerSupplierPartyName
    Delivery | postingDate | company | logisticsPartyName ?? 
    Goods Receipt | postingDate?? | company?? | 
    Sales Invoice | createdOn | company | buyerCustomerParty
    Purchase Invoice | postingDate | company | sellerSupplierPartyName
    Payment | ??? | ??? | accountingParty
    Receivable | postingDate | company | financialAccount
*/

async function analyseDocs(lastCheck, docs, code, party, process, activeProcess, step, callback) {
  docs = docs.data.result;

  for(let i = docs.length - 1; i >= 0; i--)
  {   
    // IMP: Change to lastCheck once it's done
      if(new Date(docs[i].modifiedOn) > date && code === docs[i][party] && (!docs[i].autoCreated || step.document == 'Delivery'))
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
        documents.push(docs[i].id);

        console.log('found ' + step.document); 

        let passOnData = callback(docs[i]);

          if(activeProcess) {
            await axios.put(`http://localhost:7000/api/active-process/${activeProcess._id}`, {data: passOnData});
            await incrementStep(activeProcess, process);
          }
          else {
              await axios.post("http://localhost:7000/api/active-process", {
                  processId: process._id,
                  currentStep: 2, 
                  data: passOnData,
              })
              .catch(error => {
                  console.log(error);
              })
            }
      } 
  }  
}

async function checkJasminDocs(lastCheck, process, activeProcess, step)
{
    let company = await axios.get(`http://localhost:7000/api/company/index/${step.company}`);
    company = company.data;

    let docs = [];
    let code;

    let passOnData;
    if(activeProcess) {
      passOnData = activeProcess.data;
    } else {
      passOnData = {
        documentLines: [],
      };
    }
    
    let item;
    let party;

    //TODO Check document contents to match to services or sale process (item in sales, materials and regular or just materials and regular ?)
    switch(step.document)
    {
        case "Sales Order":
            //Untested
            docs = await axios.get(`http://localhost:7000/api/jasmin/sales-order/${company.id}`);
            code = company.customer;
            item = 'salesItem';
            party = 'buyerCustomerPartyName';
            break;

        case "Delivery":
          docs = await axios.get(`http://localhost:7000/api/jasmin/deliveries/${company.id}`);
          code = company.customer;
          item = 'item';
          party = 'party';
          await analyseDocs(lastCheck, docs, code, party, process, activeProcess, step, doc => {
            passOnData['seriesNumber'] = doc.seriesNumber;
            return passOnData;
          })
          break;

        case "Purchase Invoice":
            //Untested
            docs = await axios.get(`http://localhost:7000/api/jasmin/purchase-invoice/${company.id}`);
            code = company.supplier;
            item = 'purchasesItem';
            party = 'sellerSupplierPartyName';
            break;

        case "Receivable":
            //Untested
            docs = await axios.get(`http://localhost:7000/api/jasmin/receivable/${company.id}`);
            code = company.customer;
            item = 'cashFlowItem'; //???
            party = 'accountingParty';
            break;

        case "Purchase Order":
            docs = await axios.get(`http://localhost:7000/api/jasmin/purchase-order/${company.id}`);
            code = company.supplier;
            party = 'sellerSupplierParty';
            passOnData['buyer'] = company.name;
            await analyseDocs(lastCheck, docs, code, party, process, activeProcess, step, doc => {
              passOnData["Purchase Order"] = doc.naturalKey;
              passOnData['deliveryTerm'] = doc.deliveryTerm;
              doc.documentLines.forEach(element => {
                passOnData.documentLines.push({ 
                  item: element['purchasesItem'],
                  quantity: element.quantity,
                  unitPrice: element.unitPrice
                })
              });
              return passOnData;
            });
            break;

        case "Goods Receipt":
            //Untested
            //Check controller function
            docs = await axios.get(`http://localhost:7000/api/jasmin/goods-receipt/${company.id}/${company.name}`);
            code = company.supplier;
            //item = 'purchasesItem'; ???
            // party = 'sellerSupplierPartyName'; ???
            break;

        case "Sales Invoice": 
          docs = await axios.get(`http://localhost:7000/api/jasmin/sales-invoice/${company.id}`);
          code = company.customer;
          // item = 'salesItem'; 
          party = 'buyerCustomerParty';
          await analyseDocs(lastCheck, docs, code, party, process, activeProcess, step, doc => {
            passOnData['Sales Invoice'] = doc.naturalKey;
            passOnData['discount'] = doc.discount;
            passOnData['settled'] = doc.payableAmount.amount; 
            passOnData['supplier'] = company.name;
            doc.documentLines.forEach(element => {
              passOnData.documentLines.push({
                item: element['salesItem'],
                quantity: element.quantity,
                unitPrice: element.unitPrice
              })
            });
            return passOnData;
          });
          break;

        case "Payment":
          docs = await axios.get(`http://localhost:7000/api/jasmin/payments/${company.id}`);
          code = company.supplier;
          party = 'accountingParty'; 
          
          await analyseDocs(lastCheck, docs, code, party, process, activeProcess, step, doc => {
            passOnData['buyer'] = company.name;
            return passOnData;
          });
          break;

        default:
            console.log("Unknown document: " + step.document);
    }
}

async function incrementStep(activeProcess, process)
{
    if(activeProcess.currentStep >= process.steps.length)
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