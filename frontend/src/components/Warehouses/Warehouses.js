import React from 'react';
import axios from 'axios';

import './Warehouses.css'
import PageTemplate from '../PageTemplate/PageTemplate';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
// import graphic from '../../assets/distribution.png';

// import CanvasJS from 'canvasjs';
// var CanvasJS = require('canvasjs');
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJSChart = CanvasJS.CanvasJSChart;

import * as V from 'victory';
import { VictoryPie } from 'victory';


class Warehouses extends React.Component 
{

    constructor(props)
    {
        super(props);

        this.state =
        {
            items: [],
            warehouseItems: [],
            warehouses: [],
            selectedWarehouse: 0,
            warehouseMapping: [], // Maps warehouse indexes to warehouse Names
            isMounted: false
        }
    }

    changeWarehouse(warehouseIndex)
    {
        this.setState({selectedWarehouse: warehouseIndex});

        // Populate warehouseItems
        let warehouseItems = [];
        // console.log(this.state.items.length);
        for (const item of this.state.items)
        {
            for (const warehouse of item.materialsItemWarehouses)
            {
                // console.log(warehouse.warehouseId + "===" + this.state.warehouses[warehouseIndex].id);
                if (warehouse.warehouseId === this.state.warehouses[warehouseIndex].id)
                {
                    item.unitsInStock = warehouse.stockBalance;
                    item.unitPrice = warehouse.calculatedUnitCost.amount; 
                    warehouseItems.push(item);
                    break;
                }
            }
        }

        this.setState({warehouseItems: warehouseItems});
        // console.log(warehouseItems);
    }

    renderWarehouse()
    {
        if (this.state.isMounted)
        {
            let dropdownChildren = [];
            let warehouse = this.state.warehouses[this.state.selectedWarehouse];
            let warehouseStr = warehouse.warehouseKey + ' (Company' + (warehouse.companyIndex+1) + ')';
            dropdownChildren.push(<Dropdown.Toggle key={0}>{warehouseStr}</Dropdown.Toggle>)
    
            let dropdownItems = [];
            for (let i = 0; i < this.state.warehouses.length; i++)
            {
                warehouse = this.state.warehouses[i];
                warehouseStr = warehouse.warehouseKey + ' (Company' + (warehouse.companyIndex+1) + ')';
                dropdownItems.push(<Dropdown.Item onClick={(event) => {this.changeWarehouse(i);}} key={i}>{warehouseStr}</Dropdown.Item>);
            }
            dropdownChildren.push(<Dropdown.Menu key={1}>{dropdownItems}</Dropdown.Menu>);
    
            let dropdown = <ButtonGroup> {<Dropdown>{dropdownChildren}</Dropdown>} </ButtonGroup>;

            return dropdown;
        }
        else
            return <ButtonGroup>
                <Dropdown>
                    <Dropdown.Toggle>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>;
    }

    renderOwner()
    {
        if (this.state.isMounted)
            return <span>{this.state.warehouses[this.state.selectedWarehouse].companyDescription}</span>;
        else
            return <span></span>;
    }

    renderAddress()
    {
        if (this.state.isMounted)
            return <span>{this.state.warehouses[this.state.selectedWarehouse].address}</span>;
        else
            return <span></span>;
    }

    renderItems()
    {
        if (this.state.isMounted)
        {
            let rows = [];
            for (let i = 0; i < this.state.warehouseItems.length; i++)
            {
                let children = [];

                children.push(<TableCell key={0} scope="row">{i+1}</TableCell>);
                children.push(<TableCell key={1}>{this.state.warehouseItems[i].itemKey}</TableCell>);
                children.push(<TableCell key={2}>{this.state.warehouseItems[i].unitsInStock}</TableCell>);

                rows.push(<TableRow key={i}>{children}</TableRow>);
            }
    
            return rows;
        }
        else
            return [];
    }

    renderValue() {
        if (this.state.isMounted) {
            let value = 0;

            // all warehouses
            // for (const item of this.state.items)
            // {
            //     for (const warehouse of item.materialsItemWarehouses)
            //     {
            //         value += warehouse.inventoryBalance.amount;
            //     }
            // }

            // individual warehouse total
            for (let i = 0; i < this.state.warehouseItems.length; i++) {
                value += this.state.warehouseItems[i].unitPrice * this.state.warehouseItems[i].unitsInStock;
            }

            return <span>€{value}</span>;
        }
        else
            return <span>€0</span>;
    }

    renderGraphic()
    {
        if(this.state.isMounted)
        {
            let data = [];
            let colors = [];

            console.log(parseInt("ffffff", 16));
            for(let i = 0; i < this.state.warehouses.length; i++)
            {   
                console.log(this.state.warehouses[i]);
                console.log(this.state.warehouses[i].percent);

                if (this.state.warehouses[i].percent > 0.0)
                {
                    data.push({ label: this.state.warehouses[i].naturalKey, y: this.state.warehouses[i].percent * 100 });
                    // Assign random colour
                    colors.push(((i + 1) / (this.state.warehouses.length+1) * parseInt("ffffff", 16) ).toString(16));
                }
                
            }

            console.log(data);
            console.log(colors);

            return <VictoryPie animate={true} style={{ labels: { fill: "white" } }} colorScale={colors} data={data}/>
        }
        else return null;
    }

	render() {
		return (
            <PageTemplate page="warehouses">
                <div className="all">
                    <div className="left">
                        <div id="warehouse-picker">
                            {this.renderWarehouse()}
                        </div>
                        <div id="warehouse-company">
                            <span>Owner:</span> 
                            {this.renderOwner()}
                        </div>
                        <div id="warehouse-address">
                            <span>Address:</span>
                            {this.renderAddress()}
                        </div>
                        <div className="totalAssets">
                            <span>Total assets value:</span>
                            {this.renderValue()}
                        </div>
                        <div id="warehouse-assets">
                            <p>Asset's distribution</p>
                            {this.renderGraphic()}    
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
                                    {this.renderItems()}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </PageTemplate>
        );
    }

    fillWarehouses(companyIndex, requestData)
    {
        let warehouses = this.state.warehouses;
        let warehouseMapping = this.state.warehouseMapping;
        let i = 0;
        for (let warehouse of requestData.result)
        {
            warehouse.companyIndex = companyIndex;
            warehouse.address = "";

            if(warehouse.streetName !== null && warehouse.streetName !== undefined)
            {
                warehouse.address += warehouse.streetName + ", ";
            }
            
            if(warehouse.buildingName !== null && warehouse.buildingName !== undefined)
            {
                warehouse.address += warehouse.buildingName + ", ";
            } 

            if(warehouse.postalZone !== null && warehouse.postalZone !== undefined)
            {
                warehouse.address += warehouse.postalZone + ", ";
            }
            
            if(warehouse.cityName !== null && warehouse.cityName !== undefined)
            {
                warehouse.address += warehouse.cityName;
            }

            warehouse.totalWarehouseValue = 0;

            warehouseMapping[warehouse.id] = warehouses.length;
            warehouses.push(warehouse);
        }

        this.setState({ warehouseMapping: warehouseMapping});
        this.setState({ warehouses: warehouses });

        // console.log(warehouses);
    }

    fillItems(companyIndex, requestData)
    {
        let items = this.state.items;
        let sum = 0;
        let warehouses = this.state.warehouses;
        for (let item of requestData.result)
        {
            item.companyIndex = companyIndex;

            for (let warehouse of item.materialsItemWarehouses)
            {
                warehouses[this.state.warehouseMapping[warehouse.warehouseId]].totalWarehouseValue += Number(warehouse.inventoryBalance.amount);
                sum += Number(warehouse.inventoryBalance.amount);
            }

            items.push(item);
        }

        for (let i = 0; i < warehouses.length; i++) {
            warehouses[i].percent = warehouses[i].totalWarehouseValue / sum;
        }

        console.log(warehouses);

        this.setState({ warehouses: warehouses });
        this.setState({items: items});
        // console.log(items);
    }


    componentDidMount()
    {
        document.title = "Warehouses";

        let promise1 = axios.get('http://localhost:7000/api/jasmin/warehouses/0')
        .then((response) => {
            this.fillWarehouses(0, response.data);

            axios.get('http://localhost:7000/api/jasmin/warehouses/1')
            .then((response) => {
                this.fillWarehouses(1, response.data);

                let promise2 = axios.get('http://localhost:7000/api/jasmin/materialItems/0')
                .then((response) => {

                    this.fillItems(0, response.data);

                    axios.get('http://localhost:7000/api/jasmin/materialItems/1')
                    .then((response) => {

                        this.fillItems(1, response.data);
                        this.changeWarehouse(this.state.selectedWarehouse);


                        
                       


                        this.setState({isMounted: true});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });

        
        

        // Promise.all([promise1, promise2]).then(() => {

            
        // });
    }
};

export default Warehouses;