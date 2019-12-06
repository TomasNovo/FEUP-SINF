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

class Processes extends React.Component 
{       
    componentDidMount()
    {
        document.title = "Processes";
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
            <PageTemplate page="processes">
                    <div className="addProcess">
                        <Fab href="./add-process" color="primary" aria-label="add">
                            <Add fontSize="large"/>
                        </Fab>
                        <span>Add Process</span>
                    </div>
                    <Accordion id="processes">
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
};

export default Processes;