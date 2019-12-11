import React from 'react';
import axios from 'axios';
import Warehouses from '../Warehouses/Warehouses';
import Processes from '../Processes/Processes';
import Inventory from '../Inventory/Inventory';
import Logs from '../Logs/Logs';
import Settings from '../Settings/Settings';
import AddProcess from '../AddProcess/AddProcess';
import { Route, Switch, BrowserRouter} from "react-router-dom";

class App extends React.Component 
{

	getCompanies()
	{
		let promise1 = axios.get('http://localhost:7000/api/company')
		.then((response) => {
			window.$companies = response.data;
		})
		.catch((error) => {
			this.setState({ items1: [] });
		});

	}

	render() 
	{
		return (
			<BrowserRouter>
            	<Switch>
            		<Route
            			path="/"
            			component={Logs}
            			exact={true}
            		/>
					<Route
            			path="/processes"
            			component={Processes}
            			exact={true}
            		/>
					<Route
            			path="/add-process"
            			component={AddProcess}
            			exact={true}
            		/>
					<Route
            			path="/warehouses"
            			component={Warehouses}
            			exact={true}
            		/>
					<Route
            			path="/inventory"
            			component={Inventory}
            			exact={true}
            		/>
					<Route
            			path="/logs"
            			component={Logs}
            			exact={true}
            		/>
					<Route
            			path="/settings"
            			component={Settings}
            			exact={true}
            		/>
            	</Switch>
            </BrowserRouter>
		);
	}
};

export default App;