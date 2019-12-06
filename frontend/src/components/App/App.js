import React from 'react';
import axios from 'axios';
import Warehouses from '../Warehouses/Warehouses';
import Processes from '../Processes/Processes';
import Inventory from '../Inventory/Inventory';
import Logs from '../Logs/Logs';
import Settings from '../Settings/Settings';
import AddProcess from '../AddProcess/AddProcess';
import { Route, Switch, BrowserRouter} from "react-router-dom";

const API_PORT = 7000;

class App extends React.Component 
{
	constructor(props)
	{
		super(props);
		
		this.state =
		{
			data: ""
		};
	}

	setData(input)
	{
		this.setState({data: input});
	}

	getDataFromDb = () => 
	{
		var self = this;
		axios.get('http://localhost:' + API_PORT +  '/api/mapping')
		.then(function (res) 
		{
			self.setData(JSON.stringify(res.data));
		})
		.catch(function (error)
		{
			// handle error
			console.log(error);
		})

	};
	
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