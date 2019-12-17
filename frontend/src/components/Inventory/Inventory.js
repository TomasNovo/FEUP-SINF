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

        console.log(process.env.REACT_APP_BACK_END_HOST);

        this.submitMapping = this.submitMapping.bind(this);
        this.submitCompanyAtt = this.submitCompanyAtt.bind(this);
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

    submitCompanyAtt(event){

        let target = event.target.childNodes[0].childNodes[0].name.split("-");
        let value = event.target.childNodes[0].childNodes[0].value;

        let host = process.env.REACT_APP_BACK_END_HOST || 'http://localhost:7000';

        if(target[0] === "customer"){

            axios.put(host + '/api/company/' + target[1], querystring.stringify({
                customer: value
            }))
            .then((response) => {
                console.log(response.status);
                axios.post(host + '/api/log', querystring.stringify({
                    type:"success" ,
                    processId: "none",
                    stepId: "none",
                    message: "Update customer ["+ this.state.companies[target[1]].name+"]" + " to " + value
                }))
                .then((response)=>{
                    console.log(response.status)
                })
                .catch((error)=>{
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });


        }

        if(target[0] === "supplier"){

            axios.put(host + '/api/company/' + target[1], querystring.stringify({
                supplier: value
            }))
            .then((response) => {
                console.log(response.status);
                axios.post(host + '/api/log', querystring.stringify({
                    type:"success",
                    processId: "none",
                    stepId: "none",
                    message: "Update supplier ["+ this.state.companies[target[1]].name+"]" + " to " + value
                }))
                .then((response)=>{
                    console.log(response.status);
                })
                .catch((error)=>{
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }   

        event.preventDefault();
    }


    submitMapping(event)
    {
        let idArgs = event.target.id.split("-");
        let company = Number(idArgs[1]);
        company = (company + 1) % 2;
        let row = idArgs[2];
        let text = event.target.childNodes[0].childNodes[0].value;

        let name1 = this.state.result[row].name1;
        let name2 = this.state.result[row].name2;

        let masterData = this.state.masterData;

        let host = process.env.REACT_APP_BACK_END_HOST || 'http://localhost:7000';

        if (text === "") {
            if (company === 0) {
                let index = this.findById(masterData, name1, company);

                if (index !== -1) {
                    axios.delete(host + '/api/master-data/' + name1)
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
                    axios.delete(host + '/api/master-data/' + name2)
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
                    axios.post(host + '/api/master-data/', querystring.stringify({
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
                    axios.put(host + '/api/master-data/' + name1, querystring.stringify({
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
                    axios.post(host + '/api/master-data/', querystring.stringify({
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
                    axios.put(host + '/api/master-data/' + name2, querystring.stringify({
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
        event.preventDefault();
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

    renderCompanysTable() {
        if (this.state.isMounted) {
            return <Table id="companys-table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {this.state.companies[0].name}-customer
                        </TableCell>
                        <TableCell>
                            {this.state.companies[0].name}-supplier
                        </TableCell>
                        <TableCell>
                            {this.state.companies[1].name}-customer
                        </TableCell>
                        <TableCell>
                            {this.state.companies[1].name}-supplier
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <form id="customer0" onSubmit={(event) => { this.submitCompanyAtt(event); }}>
                                <div className="form-group">
                                    <input type="text" name="customer-0" className="form-control" size="1" defaultValue={this.state.companies[0].customer} />
                                </div>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form id="supp0" onSubmit={(event) => { this.submitCompanyAtt(event); }}>
                                <div className="form-group">
                                    <input type="text" name="supplier-0" className="form-control" size="1" defaultValue={this.state.companies[0].supplier} />
                                </div>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form id="customer1" onSubmit={(event) => { this.submitCompanyAtt(event); }}>
                                <div className="form-group">
                                    <input type="text" name="customer-1" className="form-control" size="1" defaultValue={this.state.companies[1].customer} />
                                </div>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form id="supp1" onSubmit={(event) => { this.submitCompanyAtt(event); }}>
                                <div className="form-group">
                                    <input type="text" name="supplier-1" className="form-control" size="1" defaultValue={this.state.companies[1].supplier} />
                                </div>
                            </form>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>;
        }
    }
    renderTable() {
        if (this.state.isMounted) {
            return <Table id="inventory-table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <p>Name</p>
                            <p>{this.state.companies[0].name}</p>
                        </TableCell>
                        {/* <TableCell> */}
                            {/* <p>Mapping</p> */}
                            {/* <p>{this.state.companies[0].name}</p> */}
                        {/* </TableCell> */}
                        {/* <TableCell> */}
                            {/* <p>Mapping</p> */}
                            {/* <p>{this.state.companies[1].name}</p> */}
                        {/* </TableCell> */}
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

    renderContents()
    {
        if (this.state.isMounted) {

            let table = [];

            for (let i = 0; i < this.state.result.length; i++) {
                let elem = this.state.result[i];
                let children = [];

                children.push(
                <TableCell key={0} >
                    <form id={"mapping-0-" + i} onSubmit={(event) => { this.submitMapping(event); }}>
                        <div className="form-group">
                            <input type="text" className="form-control" size="1" defaultValue={elem.name1} />
                        </div>
                    </form>
                </TableCell>);

                children.push(
                <TableCell key={1}>
                    <form id={"mapping-1-" + i} onSubmit={(event) => { this.submitMapping(event); }}>
                        <div className="form-group">
                            <input type="text" className="form-control" size="1" defaultValue={elem.name2} />
                        </div>
                    </form>
                </TableCell>);


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

        let host = process.env.REACT_APP_BACK_END_HOST || 'http://localhost:7000';

        let promise1 = axios.get(host + '/api/jasmin/businessItems/0')
        .then((response) => {
            this.setState({items1: response.data.result});
        })
        .catch((error) => {
            console.log(error);
            this.setState({items1: []});
        });

        let promise2 = axios.get(host + '/api/jasmin/businessItems/1')
        .then((response) => {
            this.setState({items2: response.data.result});
        })
        .catch((error) => {
            console.log(error);
            this.setState({items2: []});
        });

        let promise3 = axios.get(host + '/api/master-data/')
        .then((response) => {
            this.setState({masterData: response.data});
        })
        .catch((error) => {
            console.log(error);
            this.setState({masterData: []});
        });

        let promise4 = axios.get(host + '/api/company')
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