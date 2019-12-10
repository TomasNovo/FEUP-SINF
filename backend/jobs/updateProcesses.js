const activeProcess = require('../database/models/activeProcess');

async function updateProcesses(job)
{
    let lastCheck = {id: "alskflak"};

    /*
        foreach active process:
            if(!ap.currentStep.isJasmin)
            {
                executeStep();
                advanceStep();
            }
            else
            {
                if(checkJasminForNewRespectiveDoc().date > lastCheck)
                {
                    advanceStep();
                }
            }

        endforeach

        if(checkJasminForNewDocMatchingAnyFirstStep.date > lastCheck)
            advanceStep();
    */
    const ap = await activeProcess.find();

    /*
    for(let i = 0; i < ap.length; i++)
        if(ap[i].currentStep.) */
}

module.exports = updateProcesses;