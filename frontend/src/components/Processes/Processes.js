import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Processes.css';
import PageTemplate from '../PageTemplate/PageTemplate';

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
                    <div className="accordion" id="accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Sale
                                    </button>
                                </h2>
                            </div>   
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                   <div className="step">
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
                                </div>
                            </div> 
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Product Delivery
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
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
                            </div>
                            </div>
                        </div>
                    </div>
            </PageTemplate>    
        );
    }
};

export default Processes;