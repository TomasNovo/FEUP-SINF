import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Processes.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Processes extends React.Component 
{       
    componentDidMount()
    {
        document.title = "Processes";
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
                                        <span>Company A</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Sales Order</span>
                                   </div>
                                   <i className="glyphicon glyphicon-arrow-down"></i>
                                   <div className="step">
                                        <span>Stock retrieval / Production</span>
                                   </div>
                                   <i className="glyphicon glyphicon-arrow-down"></i>
                                   <div className="step">
                                        <span>Sale Invoice</span>
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                   </div>
                                   <i className="glyphicon glyphicon-arrow-down"></i>
                                   <div className="step">
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
                                        <i className="glyphicon glyphicon-arrow-right"></i>
                                        <span>Delivery Order</span>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        <span>Purchase Verification</span>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        <span>Delivery</span>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
                                        <span>Service Invoice</span>
                                        <i className="glyphicon glyphicon-arrow-left"></i>
                                    </div>
                                    <i className="glyphicon glyphicon-arrow-down"></i>
                                    <div className="step">
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