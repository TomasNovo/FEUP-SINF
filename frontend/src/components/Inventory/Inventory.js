import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';
import './Inventory.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import axios from 'axios';

class Inventory extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            items1: [],
            items2: [],
            masterData: [],
            result: []
        }
    }

    findById(array, id)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i].id === id)
                return i;
        }

        return -1;
    }

    renderContents()
    {
        let table = [];
        let i = 0;
        let idCompany = 0;
        for (const elem of this.state.result)
        {
            let children = [];

            if (elem.name1 === undefined)
            {
                children.push(<TableCell key={0} > </TableCell>);
                children.push(<TableCell key={1} > </TableCell>);
                children.push(<TableCell key={2} > </TableCell>);
                children.push(<TableCell key={3} > </TableCell>);
                children.push(<TableCell key={4} > </TableCell>);
            }
            else
            {
                children.push(<TableCell key={0} > {elem.name1} </TableCell>);
                children.push(<TableCell key={1} > {elem.id1} </TableCell>);
                children.push(<TableCell key={2} > {elem.stock1} </TableCell>);
                children.push(<TableCell key={3} > {elem.price1} </TableCell>);
                children.push(<TableCell key={4} > {'TAN'} </TableCell>);    
            }

            if (elem.name2 === undefined)
            {
                children.push(<TableCell key={5} > </TableCell>);
                children.push(<TableCell key={6} > </TableCell>);
                children.push(<TableCell key={7} > </TableCell>);
                children.push(<TableCell key={8} > </TableCell>);
            }
            else
            {
                children.push(<TableCell key={5} > {elem.name2} </TableCell>);
                children.push(<TableCell key={6} > {elem.id2} </TableCell>);
                children.push(<TableCell key={7} > {elem.stock2} </TableCell>);
                children.push(<TableCell key={8} > {elem.price2} </TableCell>);
            }

            table.push(<TableRow key={i}> {children} </TableRow>);
            i++;
        }

        return table;
    }

    render()
    {
        return (
            <PageTemplate page="inventory">
                <Paper id="inventory-paper">
                    <Table  stickyHeader id="inventory-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <p>Name</p>
                                    <p>Company A</p>
                                </TableCell>
                                <TableCell>
                                    <p>ID</p>
                                    <p>Company A</p>
                                </TableCell>
                                <TableCell>
                                    <p>Stock</p>
                                    <p>Company A</p>
                                </TableCell>
                                <TableCell>
                                    <p>Price / Unit</p>
                                    <p>Company A</p>
                                </TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>
                                    <p>Name</p>
                                    <p>Company B</p>
                                </TableCell>
                                <TableCell>
                                    <p>ID</p>
                                    <p>Company B</p>
                                </TableCell>
                                <TableCell>
                                    <p>Stock</p>
                                    <p>Company B</p>
                                </TableCell>
                                <TableCell>
                                    <p>Price / Unit</p>
                                    <p>Company B</p>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderContents()}
                        </TableBody>
                    </Table>
                </Paper>
            </PageTemplate>
        );
    }

    componentDidMount()
    {
        document.title = "Inventory";

        let promise1 = axios.get('http://localhost:7000/api/jasmin/salesItems/0')
        .then((response) => {
            this.setState({items1: response.data.result});
            console.log(this.state.items1);
        })
        .catch((error) => {
            this.setState({items1: []});
        });

        let promise2 = axios.get('http://localhost:7000/api/jasmin/salesItems/1')
        .then((response) => {
            this.setState({items2: response.data.result});
        })
        .catch((error) => {
            this.setState({items2: []});
        });

        let promise3 = axios.get('http://localhost:7000/api/master-data/')
        .then((response) => {
            this.setState({masterData: response.data});
            console.log(this.state.masterData);
        })
        .catch((error) => {
            this.setState({masterData: []});
        });

        Promise.all([promise1, promise2, promise3]).then(() => {
            
            console.log(this.state.items1);
            console.log(this.state.items2);
            console.log(this.state.masterData);

            let result = [];
            let items1 = this.state.items1;
            let items2 = this.state.items2;

            for (let i = 0; i < this.state.masterData.length; i++)
            {
                let id1 = this.state.masterData[i].idA;
                let id2 = this.state.masterData[i].idB;

                console.log(id1);
                console.log(id2);

                let index1 = this.findById(items1, id1);
                let index2 = this.findById(items2, id2);

                let item1 = items1[index1];
                let item2 = items2[index2];

                let row = 
                {
                    id1: item1.id,
                    id2: item2.id,
                    name1: item1.itemKey,
                    name2: item2.itemKey,
                    price1: item1.priceListLines[0].priceAmount.amount + item1.priceListLines[0].priceAmount.symbol,
                    price2: item2.priceListLines[0].priceAmount.amount + item2.priceListLines[0].priceAmount.symbol,
                    stock1: '',
                    stock2: '',
                }

                result.push(row);

                items1.splice(index1);

                items2.splice(index2);
            }

            for (let i = 0; i < items1.length; i++)
            {
                let item1 = items1[i];

                let row = 
                {
                    id1: item1.id,
                    name1: item1.itemKey,
                    price1: item1.priceListLines[0].priceAmount.amount + item1.priceListLines[0].priceAmount.symbol,
                    stock1: '',
                }

                result.push(row);
            }

            for (let i = 0; i < items2.length; i++)
            {
                let item2 = items2[i];

                let row = 
                {
                    id2: item2.id,
                    name2: item2.itemKey,
                    price2: item2.priceListLines[0].priceAmount.amount + item2.priceListLines[0].priceAmount.symbol,
                    stock2: '',
                }

                result.push(row);
            }

            this.setState({result: result});

        });

    }
}

export default Inventory;