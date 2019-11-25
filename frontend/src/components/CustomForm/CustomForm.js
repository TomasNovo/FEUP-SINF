import React from 'react';
import CustomTextBox from '../CustomTextBox/CustomTextBox';
import axios from 'axios';

const API_PORT = 7000;

class CustomForm extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = 
		{
			textBoxes: Array(2).fill(null)
		};

		for (var i = 0; i < 2; i++)
		{
			this.state.textBoxes[i] = new CustomTextBox(props, "id"+i);
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) 
	{
		// alert('A name was submitted: ' + this.state.textBoxes[0].state.value + ", " + this.state.textBoxes[1].state.value);

		axios.post('http://localhost:' + API_PORT +  '/api/mapping',
		{
			id1: this.state.textBoxes[0].state.value,
			id2: this.state.textBoxes[1].state.value
		})
		.then(function (response)
		{
			console.log(response);
		})
		.catch(function (error)
		{
			console.log(error);
		});

		event.preventDefault();
	}

	deleteEntry(event)
	{
		axios.delete('http://localhost:' + API_PORT +  '/api/mapping',
		{
			data:
			{
				id1: this.state.textBoxes[0].state.value,
				id2: this.state.textBoxes[1].state.value
			}
		})
		.then(function (response)
		{
			console.log(response);
		})
		.catch(function (error)
		{
			console.log(error);
		});

		event.preventDefault();
	}
  
	render() {
	  return (

		<form>
			<div className="form-group">
				<label>id1</label>
				{this.state.textBoxes[0].render()}
			</div>
			<div className="form-group">
				<label >id2</label>
				{this.state.textBoxes[1].render()}
			</div>
			<button className="btn btn-primary" onClick={(event) => {this.handleSubmit(event);}}>Submit mapping</button>
			<button className="btn btn-primary" onClick={(event) => {this.deleteEntry(event);}}>Delete mapping</button>
		</form>
	  );
	}
};

export default CustomForm;