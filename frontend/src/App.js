import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import CustomForm from './CustomForm';
import Settings from './Settings.js';
import Processes from './Processes.js';

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
			
			<Processes />
			
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