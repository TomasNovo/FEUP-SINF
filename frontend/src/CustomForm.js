import React from 'react';
import CustomTextBox from './CustomTextBox';
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
  
	render() {
	  return (
		// <form onSubmit={this.handleSubmit}>
		//   <label>
		// 	Name:
		// 	<input type="text" value={this.state.value} onChange={this.handleChange} />
		//   </label>
		//   <input type="submit" value="Submit" />
		// </form>

		<form onSubmit={this.handleSubmit}>
			<div className="form-group">
				<label>id1</label>
				{this.state.textBoxes[0].render()}
			</div>
			<div className="form-group">
				<label >id2</label>
				{this.state.textBoxes[1].render()}
			</div>
			<button type="submit" className="btn btn-primary" value="Submit">Submit mapping</button>
		</form>
	  );
	}
};

export default CustomForm;