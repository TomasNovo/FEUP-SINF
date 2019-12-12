import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import Spinner from 'react-bootstrap/Spinner';
import Paper from '@material-ui/core/Paper';
import './Inventory.css';
import PageTemplate from '../PageTemplate/PageTemplate';
import axios from 'axios';
import querystring from 'querystring';
// import CustomTextBox from '../CustomTextBox/CustomTextBox';

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
            companies: [],
            result: [],
            isMounted: false
        }

        this.submitMapping = this.submitMapping.bind(this);
    }

    findById(array, name, company)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (company === 0 && array[i].idA === name)
                return i;

            if (company === 1 && array[i].idB === name)
                return i;
        }

        return -1;
    }

    findByName(array, name) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].itemKey === name)
                return i;
        }

        return -1;
    }


    renderSpinner()
    {
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

    renderCompanysTable()
    {
        if(this.state.isMounted)
        {
            return <Table id="companys-table">
            <TableHead>
                <TableRow>
                    <TableCell>
                        EDU
                    </TableCell>
                    <TableCell>
                        GAY
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableCell>
                    EDU É MESMO
                </TableCell>
                <TableCell>
                    MUITO GAY
                </TableCell>
            </TableBody>
        </Table>;
        }
    }
    renderTable()
    {
        if (this.state.isMounted) {
            return <Table id="inventory-table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <p>Name</p>
                            <p>{this.state.companies[0].name}</p>
                        </TableCell>
                        <TableCell>
                            <p>Mapping</p>
                            <p>{this.state.companies[0].name}</p>
                        </TableCell>
                        <TableCell>
                            <p>Mapping</p>
                            <p>{this.state.companies[1].name}</p>
                        </TableCell>
                        <TableCell>
                            <p>Name</p>
                            <p>{this.state.companies[1].name}</p>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderContents()}
                </TableBody>
            </Table>;

        }
        else
            return null;
    }

    submitMapping(event)
    {
        let idArgs = event.target.id.split("-");
        let company = Number(idArgs[1]);
        let row = idArgs[2];
        let text = event.target.childNodes[0].childNodes[0].value;

        let name1 = this.state.result[row].name1;
        let name2 = this.state.result[row].name2;

        let masterData = this.state.masterData;

        if (text === "") {
            if (company === 0) {
                let index = this.findById(masterData, name1, company);

                if (index !== -1) {
                    axios.delete('http://localhost:7000/api/master-data/' + name1)
                    .then((response) => {
                        console.log(response.status);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            }

            if (company === 1) {
                let index = this.findById(masterData, name2, company);

                if (index !== -1) {
                    axios.delete('http://localhost:7000/api/master-data/' + name2)
                    .then((response) => {
                        console.log(response.status);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            }
        } else {

            if (company === 0) {
                
                if (this.findByName(this.state.items2, text) === -1) {
                    alert("This id does not exists in the item of " + this.state.companies[(company + 1) % 2].name);
                    event.preventDefault();
                    return;
                }

                let index = this.findById(masterData, text, (company + 1) % 2);

                if (name2 === undefined && index === -1) {
                    axios.post('http://localhost:7000/api/master-data/', querystring.stringify({
                        idA: name1,
                        idB: text
                    }))
                    .then((response) => {
                        console.log(response.status);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    axios.put('http://localhost:7000/api/master-data/' + name1, querystring.stringify({
                        idA: name1,
                        idB: text
                    }))
                    .then((response) => {
                        console.log(response.status);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }   
            }

            if (company === 1) {
                
                if (this.findByName(this.state.items1, text) === -1) {
                    alert("This id does not exists in the item of " + this.state.companies[(company + 1) % 2].name);
                    event.preventDefault();
                    return;
                }

                let index = this.findById(masterData, text, (company + 1) % 2);

                if (name1 === undefined && index === -1) {
                    axios.post('http://localhost:7000/api/master-data/', querystring.stringify({
                        idA: text,
                        idB: name2
                    }))
                        .then((response) => {
                            console.log(response.status);

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    axios.put('http://localhost:7000/api/master-data/' + name2, querystring.stringify({
                        idA: text,
                        idB: name2
                    }))
                        .then((response) => {
                            console.log(response.status);

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        }


        this.setState({ masterData: masterData});
        this.generateResults();
    }

    generateResults() {
        let result = [];
        let items1 = this.state.items1.slice();
        let items2 = this.state.items2.slice();

        for (let i = 0; i < this.state.masterData.length; i++) {
            let name1 = this.state.masterData[i].idA;
            let name2 = this.state.masterData[i].idB;

            let index1 = this.findByName(items1, name1);
            let index2 = this.findByName(items2, name2);

            if (index1 === -1) {
                console.error("Bad name1 = " + name1);
                continue;
            }

            if (index2 === -1) {
                console.error("Bad name2 = " + name2);
                continue;
            }

            let row =
            {
                name1: name1,
                name2: name2
            }

            result.push(row);

            items1.splice(index1, 1);
            items2.splice(index2, 1);
        }

        for (let i = 0; i < items1.length; i++) {
            let item1 = items1[i];

            let row =
            {
                name1: item1.itemKey
            }

            result.push(row);
        }

        for (let i = 0; i < items2.length; i++) {
            let item2 = items2[i];

            let row =
            {
                name2: item2.itemKey
            }

            result.push(row);
        }

        this.setState({ result: result });
    }

    preventEvent(event)
    {
        // event.default();
    }

    renderContents()
    {
        if (this.state.isMounted) {

            let table = [];

            for (let i = 0; i < this.state.result.length; i++) {
                let elem = this.state.result[i];
                let children = [];
                let hasMapping = (elem.name1 !== undefined && elem.name2 !== undefined);

                if (elem.name1 === undefined)
                {
                    children.push(<TableCell key={0}></TableCell>);
                    children.push(<TableCell key={1} ></TableCell>);
                }
                else
                {
                    children.push(<TableCell key={0} >{elem.name1}</TableCell>);
                    children.push(
                        <TableCell key={1}>
                            <form id={"mapping-0-" + i} onSubmit={(event) => { this.submitMapping(event); }}>
                                <div className="form-group">
                                    <input type="text" className="form-control" size="1" defaultValue={(hasMapping) ? elem.name2 : ''} />
                                </div>
                            </form>
                        </TableCell>);
                }

                if (elem.name2 === undefined)
                {
                    children.push(<TableCell key={2} ></TableCell>);
                    children.push(<TableCell key={3} ></TableCell>);
                }
                else
                {
                    children.push(
                        <TableCell key={2}>
                            <form id={"mapping-1-" + i} onSubmit={(event) => { this.submitMapping(event); }}>
                                <div className="form-group">
                                    <input type="text" className="form-control" size="1" defaultValue={(hasMapping) ? elem.name1 : ''} />
                                </div>
                            </form>
                        </TableCell>);
                    children.push(<TableCell key={3} >{elem.name2}</TableCell>);
                }

                table.push(<TableRow key={i}>{children}</TableRow>);
            }

            return table;
        } else {
            return null;
        }
    }

    render()
    {
        return (
            <PageTemplate page="inventory">
                {this.renderSpinner()}
                <Paper id="companys-paper">
                    {this.renderCompanysTable()}      
                </Paper>
                <Paper id="inventory-paper">
                    {this.renderTable()}
                </Paper>
            </PageTemplate>
        );
    }

    componentDidMount()
    {
        document.title = "Inventory";

        let promise1 = axios.get('http://localhost:7000/api/jasmin/businessItems/0')
        .then((response) => {
            this.setState({items1: response.data.result});
        })
        .catch((error) => {
            console.log(error);
            this.setState({items1: []});
        });

        let promise2 = axios.get('http://localhost:7000/api/jasmin/businessItems/1')
        .then((response) => {
            this.setState({items2: response.data.result});
        })
        .catch((error) => {
            console.log(error);
            this.setState({items2: []});
        });

        let promise3 = axios.get('http://localhost:7000/api/master-data/')
        .then((response) => {
            this.setState({masterData: response.data});
        })
        .catch((error) => {
            console.log(error);
            this.setState({masterData: []});
        });

        let promise4 = axios.get('http://localhost:7000/api/company')
        .then((response) => {
            this.setState({ companies: response.data });
        })
        .catch((error) => {
            console.log(error)
            this.setState({ companies: [] });
        });

        Promise.all([promise1, promise2, promise3, promise4]).then(() => {

            this.generateResults();
            this.setState({isMounted: true});
        });

    }
}

export default Inventory;