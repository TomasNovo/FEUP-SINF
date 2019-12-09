import React from 'react';
import './Processes.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import logo from '../../assets/logo.png';
import jasmin from '../../assets/jasmin-logo.png';
import axios from 'axios';

class Processes extends React.Component 
{       
    constructor(props)
    {
        super(props);

        this.state = {
            processes: []
        };

        this.addTooltip = this.addTooltip.bind(this);
        this.displayProcesses = this.displayProcesses.bind(this);
        this.removeProcess = this.removeProcess.bind(this);
    }

    componentDidMount()
    {
        document.title = "Processes";
        this.displayProcesses();
    }

    render() 
    {
        return (
            <PageTemplate page="processes">
                    <div className="addProcess">
                        <Fab href="./add-process" color="primary" aria-label="add">
                            <Add fontSize="large"/>
                        </Fab>
                        <span>Add Process</span>
                    </div>
                    <Accordion id="processes">
                        {this.state.processes}
                        <Card>
                            <Card.Header id="headingOne">
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Sale
                                </Accordion.Toggle>
                            </Card.Header>   
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                   <div className="step">
                                        <span>1</span>
                                        {this.addTooltip(jasmin)}
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Sales Order</span>
                                   </div>
                                   <hr/>
                                   <div className="step">
                                       <span>2</span>
                                        {this.addTooltip(logo)}
                                        <span>Company B</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Stock retrieval</span>
                                   </div>
                                   <hr/>
                                   <div className="step">
                                       <span>3</span>
                                        {this.addTooltip(logo)}
                                        <span>Company B</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Sale Invoice</span>
                                   </div>
                                   <hr/>
                                   <div className="step">
                                       <span>4</span>
                                        {this.addTooltip(logo)}
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Purchase Invoice</span>
                                   </div>
                                </Card.Body>
                            </Accordion.Collapse> 
                        </Card>
                        <Card>
                            <Card.Header id="headingTwo">
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Product Delivery
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <div className="step">
                                        <span>1</span>
                                        {this.addTooltip(jasmin)}
                                        <span>Company B</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Delivery Order</span>
                                    </div>
                                    <hr/>
                                    <div className="step">
                                        <span>2</span>
                                        {this.addTooltip(logo)}
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Purchase Verification</span>
                                    </div>
                                    <hr/>
                                    <div className="step">
                                        <span>3</span>
                                        {this.addTooltip(jasmin)}
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Delivery</span>
                                    </div>
                                    <hr/>
                                    <div className="step">
                                        <span>4</span>
                                        {this.addTooltip(jasmin)}
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-left"></i>
                                        <span>Service Invoice</span>  
                                    </div>
                                    <hr/>
                                    <div className="step">
                                        <span>5</span>
                                        {this.addTooltip(logo)}
                                        <span>Company B</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Service Provided Invoice</span>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
            </PageTemplate>    
        );
    }

    displayProcesses()
    {
        axios.get('http://localhost:7000/api/process').then(response => {
            const processes = [];

            for(let i = 0; i < response.data.length; i++)
            {
                const steps = []

                for(let j = 0; j < response.data[i].steps.length; j++) {
                    steps.push(
                        <div className="step" key={i + "-" + j}>
                            <span>{j}</span>
                            {response.data[i].steps[j].fromJasmin ? this.addTooltip(jasmin) : this.addTooltip(logo)}
                            <span>{response.data[i].steps[j].company}</span>
                            <i className="glyphicon glyphicon-arrow-right"></i>
                            <span>{response.data[i].steps[j].document}</span>
                        </div>
                    );

                    if(j < response.data[i].steps.length - 1)
                        steps.push(<hr key={i + "-" + j + "-hr"}/>);
                }

                processes.push(
                    <Card key={i} id={response.data[i]._id}>
                        <Card.Header id={"heading" + i} >
                            <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                                Sale
                            </Accordion.Toggle>
                            <Button className="remove" type="button" onClick={event => this.removeProcess(event)}>
                                <i className="glyphicon glyphicon-remove"></i>
                            </Button>
                        </Card.Header>   
                        <Accordion.Collapse eventKey={i}>
                            <Card.Body>
                                {steps}
                            </Card.Body>
                        </Accordion.Collapse> 
                    </Card>
                );
            }

            this.setState({processes: processes});
                
        })
        .catch(error => {
            console.log(error);
        });
    }

    removeProcess(event)
    {
        let id;
        
        if(event.target.nodeName === "BUTTON")
            id = event.target.parentElement.parentElement.id;
        else
            id = event.target.parentElement.parentElement.parentElement.id;

        for(let i = 0; i < this.state.processes.length; i++)
            if(this.state.processes[i].props.id === id)
            {
                const processesClone = [...this.state.processes];

                processesClone.splice(i, 1);
                this.setState({processes: processesClone});
                break;
            }
        
        axios.delete(`http://localhost:7000/api/process/${id}`).catch(error => {
            console.log(error);
        });
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
};

export default Processes;