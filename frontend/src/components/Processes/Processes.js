import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Processes.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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
            
        return <OverlayTrigger placement="left" delay={{ show: 250, hide: 250 }} overlay={tooltip}>
                    <img src={image} alt={alt}/>
                </OverlayTrigger>
    }

    render() 
    {
        return (
            <PageTemplate page="processes">
                    <button className="addProcess btn" type="button">
                        <span className="btn">+</span>
                        <span>Add Process</span>
                    </button>
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
                                        {this.addTooltip(jasmin)}
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Sales Order</span>
                                   </div>
                                   <i className="glyphicon glyphicon-arrow-down"></i>
                                   <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Stock retrieval / Production</span>
                                   </div>
                                   <i className="glyphicon glyphicon-arrow-down"></i>
                                   <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Sale Invoice</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                   </div>
                                   <i className="glyphicon glyphicon-arrow-down"></i>
                                   <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Purchase Invoice</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
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
                                        {this.addTooltip(jasmin)}
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Delivery Order</span>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Purchase Verification</span>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Delivery</span>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Service Invoice</span>
                                        <i className="glyphicon glyphicon-arrow-left"></i>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        {this.addTooltip(logo)}
                                        <span>Service Provided Invoice</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
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