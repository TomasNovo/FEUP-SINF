import React from 'react';
import { renderToString } from 'react-dom/server'
import './AddProcess.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/logo.png';
import jasmin from '../../assets/jasmin-logo.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddProcess extends React.Component
{
    constructor (props)
    {
        super(props);

        this.addStep = this.addStep.bind(this);
        this.createProcess = this.createProcess.bind(this);
    }

    addTooltip(image)
    {   
        let tooltip;
        let alt;

        if(image === logo)
        {
            tooltip = <Tooltip>Intercomp</Tooltip>
            alt = "Intercomp";
        }
        else
        {
            tooltip = <Tooltip>Jasmin</Tooltip>
            alt = "Jasmin";
        }
            
        return <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={tooltip}>
                    <img src={image} alt={alt}/>
                </OverlayTrigger>
    }

    render()
    {
        return (
            <PageTemplate page="Add Process">
                <h1 id="new-process">New Process</h1>
                <form id="add-process-form">
                    <input id="process-name" placeholder="Name" required/>
                    <div id="add-steps">
                        <div id="steps">
                            <h1>Steps</h1>
                        </div>
                        <hr/>
                        <div id="add-step">
                            <div className="step" id="step-template">
                                <span>1</span>
                                <select id="new-step-execution-point"> 
                                    <option value="intercomp">InterComp</option>
                                    <option value="jasmin">Jasmin</option>
                                </select>
                                <select id="new-step-company"> 
                                    <option>Company A</option>
                                    <option>Company B</option>
                                </select>
                                <i className="glyphicon glyphicon-arrow-right"></i>
                                <select id="new-step-document"> 
                                    <option>Sales Order</option>
                                    <option>Sales Invoice</option>
                                    <option>Purchase Order</option>
                                    <option>Purchase Invoice</option>
                                </select>
                            </div>
                            <Fab aria-label="add" onClick={this.addStep}>
                                <Add fontSize="large"/>
                            </Fab>
                            <span>Add step</span>
                            <br/>
                        </div>
                        <Button id="create-process" variant="danger" type="submit" form="add-process-form" onClick={this.createProcess}>Create Process</Button>
                    </div>
                </form>
            </PageTemplate>
        )
    }

    addStep()
    {   
        const newStep = document.createElement("div");

        newStep.classList.add("step");
        newStep.innerHTML = `
            <span>${document.getElementById("steps").childElementCount}</span>
            ${document.getElementById("new-step-execution-point").value === "intercomp" ? renderToString(this.addTooltip(logo)) : renderToString(this.addTooltip(jasmin))}
            <span>${document.getElementById("new-step-company").value}</span>
            <i class="glyphicon glyphicon-arrow-right"></i>
            <span>${document.getElementById("new-step-document").value}</span>`;

        document.getElementById("steps").appendChild(newStep);
    }

    createProcess(event)
    {
        const stepsElem = document.getElementById("steps");

        event.preventDefault();

        if(stepsElem.childElementCount <= 1)
            return;

        //Create process
        axios.post('http://localhost:7000/api/process', {
            steps: []
        }).then((response) => {
            let stepsPromises = [];

            for(let i = 1; i < stepsElem.children.length; i++)
                stepsPromises.push(
                    axios.post(`http://localhost:7000/api/process/${response.data._id}/step`, {
                        number: stepsElem.children[i].querySelector("span:first-child").textContent,
                        fromJasmin: stepsElem.children[i].querySelector(":nth-child(2)").getAttribute("alt") === "Jasmin",
                        company: stepsElem.children[i].querySelector(":nth-child(3)").textContent,
                        document: stepsElem.children[i].querySelector(":last-child").textContent
                    }));

        Promise.all(stepsPromises).then(() => {
            this.props.history.push('/processes')
        })
        
        }).catch(error => console.log(error));
    }

    componentDidMount()
    {
        document.title = "Add Process";
    }
}

export default withRouter(AddProcess);