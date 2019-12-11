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
import Spinner from 'react-bootstrap/Spinner';
import Pie from 'react-chartjs-2';


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
            sumWarehouseValue: 0,
            isMounted: false
        }

        console.log(window.$companies);
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

    renderSpinner() {
        if (this.state.isMounted) {
            return null;
        } else {
            return <div id="spinner-div">
                <Spinner id="spinner" className="text-primary d-flex justify-content-center" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>;
        }
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
            return null;
    }

    renderOwner()
    {
        if (this.state.isMounted) {
            return <div id="warehouse-company">
                ><span>Owner:</span>
                <span>{this.state.warehouses[this.state.selectedWarehouse].companyDescription}</span>
            </div>;
        } else {
            return <span></span>;
        }
    }

    renderAddress()
    {
        if (this.state.isMounted)
            return <div id="warehouse-address">
                <span>Address:</span>
                <span>{this.state.warehouses[this.state.selectedWarehouse].address}</span>
                </div>;
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
    
            return <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell scope="col">ID</TableCell>
                        <TableCell scope="col">Name</TableCell>
                        <TableCell scope="col">Units in Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>;
        }
        else
            return [];
    }

    renderValue() {

        if (this.state.isMounted)
        {
            return <div className="totalAssets">
                <span>Total assets value:</span>
                <span>€{this.state.warehouses[this.state.selectedWarehouse].totalWarehouseValue}</span>
            </div>;
        }
        else
            return <span></span>;
    }

    renderGraphic()
    {
        if (this.state.isMounted)
        {
            let data = [];
            let colors = [];
            let labels = [];
            
            for (let i = 0; i < this.state.warehouses.length; i++)
            {   
                // console.log(this.state.warehouses[i]);
                // console.log(this.state.warehouses[i].percent);

                if (this.state.warehouses[i].percent > 0.0) // Filter warehouses with 0% of the assets
                {
                    let warehouse = this.state.warehouses[i];
                    let warehouseStr = warehouse.warehouseKey + ' (Company' + (warehouse.companyIndex+1) + ')';

                    data.push(Math.round(warehouse.percent * 100));
                    // Assign random colour
                    colors.push('#' + ((i + 1) / (this.state.warehouses.length+1) * parseInt("ffffff", 16) ).toString(16));

                    labels.push(warehouseStr);  
                }
            }

            return <div id="warehouse-assets">
                <p>Asset's distribution</p>
                <Pie
                title="My amazing data"
                data= {{
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors
                    }]
                }}
                options={{
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) =>
                            {
                                let value = data.datasets[0].data[tooltipItem.index];
                                return ' ' + value.toString() + '%';
                            },
                            title: (tooltipItem, data) =>
                            {
                                return ' ' + data.labels[tooltipItem[0].index];
                            }
                        },
                        bodyFontSize: 16,
                    }
                }}
                height={250}
          />
            </div>;
        }
        else 
            return <div></div>;
    }

	render() {
		return (
            <PageTemplate page="warehouses">
                {this.renderSpinner()}
                <div className="all">
                    <div className="left">
                        <div id="warehouse-picker">
                            {this.renderWarehouse()}
                        </div>
                        {this.renderOwner()}
                        {this.renderAddress()}
                        {this.renderValue()}
                        {this.renderGraphic()}
                    </div>
                    <div className="right">
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            {this.renderItems()}
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

            if (companyIndex === 0)
                warehouses.splice(i, 0, warehouse);
            else
                warehouses.push(warehouse);

            i++;
        }

        this.setState({ warehouseMapping: warehouseMapping});
        this.setState({ warehouses: warehouses });
    }

    fillItems(companyIndex, requestData)
    {
        let items = this.state.items;
        let i = 0;
        for (let item of requestData.result)
        {
            item.companyIndex = companyIndex;

            if (companyIndex === 0)
                items.splice(i, 0, item);
            else
                items.push(item);
            
            i++;
        }


        this.setState({items: items});
    }
    

    calculateAssets()
    {
        let sum = this.state.sumWarehouseValue;
        let warehouses = this.state.warehouses;

        for (const item of this.state.items)
        {
            for (let warehouse of item.materialsItemWarehouses)
            {
                warehouses[this.state.warehouseMapping[warehouse.warehouseId]].totalWarehouseValue += Number(warehouse.inventoryBalance.amount);
                sum += Number(warehouse.inventoryBalance.amount);
            }
        }

        for (let i = 0; i < warehouses.length; i++) 
        {
            warehouses[i].percent = warehouses[i].totalWarehouseValue / sum;
        }

        this.setState({ warehouses: warehouses });
    }


    componentDidMount()
    {
        document.title = "Warehouses";

        let promise1 = axios.get('http://localhost:7000/api/jasmin/warehouses/0')
        .then((response) => {
            this.fillWarehouses(0, response.data);

            
        })
        .catch((error) => {
            console.log(error);
        });

        let promise2 = axios.get('http://localhost:7000/api/jasmin/warehouses/1')
            .then((response) => {
                this.fillWarehouses(1, response.data);

                
            })
            .catch((error) => {
                console.log(error);
            });

        let promise3 = axios.get('http://localhost:7000/api/jasmin/materialItems/0')
                .then((response) => {

                    this.fillItems(0, response.data);

                    
                })
                .catch((error) => {
                    console.log(error);
                });

        let promise4 = axios.get('http://localhost:7000/api/jasmin/materialItems/1')
                    .then((response) => {

                        this.fillItems(1, response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

        
        

        Promise.all([promise1, promise2, promise3, promise4]).then(() => {

            this.calculateAssets();
            
            this.changeWarehouse(this.state.selectedWarehouse);

            this.setState({isMounted: true});

        });
    }
};

export default Warehouses;