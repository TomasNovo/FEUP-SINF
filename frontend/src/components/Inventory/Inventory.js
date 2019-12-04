import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';
import './Inventory.css';
import PageTemplate from '../PageTemplate/PageTemplate';

class Inventory extends React.Component
{
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
                            <TableRow>
                                <TableCell>Juice A</TableCell>
                                <TableCell>1</TableCell> 
                                <TableCell>3000</TableCell> 
                                <TableCell>0.70€</TableCell> 
                                <TableCell className="category">TAN</TableCell> 
                                <TableCell>Juice B</TableCell>
                                <TableCell>3</TableCell> 
                                <TableCell>1000</TableCell> 
                                <TableCell>1.20€</TableCell> 
                            </TableRow>
                            <TableRow>
                                <TableCell>Juice A</TableCell>
                                <TableCell>1</TableCell> 
                                <TableCell>3000</TableCell> 
                                <TableCell>0.70€</TableCell> 
                                <TableCell className="category">TAN</TableCell> 
                                <TableCell>Juice B</TableCell>
                                <TableCell>3</TableCell> 
                                <TableCell>1000</TableCell> 
                                <TableCell>1.20€</TableCell> 
                            </TableRow>
                            <TableRow>
                                <TableCell>Juice A</TableCell>
                                <TableCell>1</TableCell> 
                                <TableCell>3000</TableCell> 
                                <TableCell>0.70€</TableCell> 
                                <TableCell className="category">TAN</TableCell> 
                                <TableCell>Juice B</TableCell>
                                <TableCell>3</TableCell> 
                                <TableCell>1000</TableCell> 
                                <TableCell>1.20€</TableCell> 
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </PageTemplate>
        );
    }

    componentDidMount()
    {
        document.title = "Inventory";
    }
}

export default Inventory;