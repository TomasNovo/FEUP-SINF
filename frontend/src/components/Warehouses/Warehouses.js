import React from 'react';
import './Warehouses.css'
import PageTemplate from '../PageTemplate/PageTemplate';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import graphic from '../../assets/distribution.png';

class Warehouses extends React.Component 
{
	render() {
		return (
            <PageTemplate page="warehouses">
                <div className="all">
                    <div className="left">
                        <div id="warehouse-picker">
                            <ButtonGroup>
                                <Dropdown>
                                    <Dropdown.Toggle>
                                        Warehouse 1
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="./">Warehouse 2</Dropdown.Item>
                                        <Dropdown.Item href="./">Warehouse 3</Dropdown.Item>
                                        <Dropdown.Item href="./">Warehouse 4</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonGroup>
                        </div>
                        <div id="warehouse-company">
                            <span>Owner:</span> 
                            <span>Company A</span>
                        </div>
                        <div id="warehouse-address">
                            <span>Address:</span>
                            <span>Rua Aval de Baixo nº158</span>
                        </div>
                        <div id="warehouse-assets">
                            <p>Asset's distribution</p>
                            <img src={graphic} alt="Graphic" />
                        </div>
                        <div className="totalAssets">
                            <span>Total assets value:</span>
                            <span>€110.225,30</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Units in Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </PageTemplate>
        );
	}
};

export default Warehouses;