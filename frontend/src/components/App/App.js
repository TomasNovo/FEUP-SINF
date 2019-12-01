import React from 'react';
import axios from 'axios';
import Processes from '../Processes/Processes';
import Logs from '../Logs/Logs';
import Settings from '../Settings/Settings';

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
	
	render() {
		return (

			<BrowserRouter>
            	<Switch>
            		<Route
            			path="/"
            			component={Processes}
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
			
			// <Settings />
			
			// <Container className="p-3">
			// 	<Jumbotron>
			// 		<h1 className="header">Welcome To React-Bootstrap</h1>
			// 		<CustomForm />
			// 	</Jumbotron>

			// 	<Jumbotron>
			// 		<Button variant="primary" onClick={() => {this.getDataFromDb();}}>
			// 			Fetch mapping
			// 		</Button>
			// 		<h1><br></br>Result:</h1>
			// 		<div>
			// 			{this.state.data}
			// 		</div>
			// 	</Jumbotron>
			// </Container>
		);
	}
};

export default App;