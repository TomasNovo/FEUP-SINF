import React from 'react';
import './Warehouses.css'
import PageTemplate from '../PageTemplate/PageTemplate';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import graphic from '../../assets/distribution.png';

class Warehouses extends React.Component 
{
    componentDidMount()
    {
        document.title = "Warehouses";
    }

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
                            <Table stickyHeader> 
                                <TableHead>
                                    <TableRow>
                                        <TableCell scope="col">ID</TableCell>
                                        <TableCell scope="col">Name</TableCell>
                                        <TableCell scope="col">Units in Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell scope="row">1</TableCell>
                                        <TableCell>Mark</TableCell>
                                        <TableCell>Otto</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">2</TableCell>
                                        <TableCell>Jacob</TableCell>
                                        <TableCell>TableCellornton</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">3</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">4</TableCell>
                                        <TableCell>Mark</TableCell>
                                        <TableCell>Otto</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">5</TableCell>
                                        <TableCell>Jacob</TableCell>
                                        <TableCell>TableCellornton</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">6</TableCell>
                                        <TableCell>Larry</TableCell>
                                        <TableCell>TableCelle Bird</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </PageTemplate>
        );
    }

    componentDidMount()
    {
        document.title = "Warehouses";
    }
};

export default Warehouses;