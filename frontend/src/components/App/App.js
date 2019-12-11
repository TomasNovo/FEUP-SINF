import React from 'react';
import Warehouses from '../Warehouses/Warehouses';
import Processes from '../Processes/Processes';
import Inventory from '../Inventory/Inventory';
import Logs from '../Logs/Logs';
import Settings from '../Settings/Settings';
import AddProcess from '../AddProcess/AddProcess';
import { Route, Switch, BrowserRouter} from "react-router-dom";

class App extends React.Component 
{
	constructor(props)
	{
		super(props);
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