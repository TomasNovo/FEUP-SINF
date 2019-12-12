import React from 'react';

class CustomTextBox extends React.Component 
{
	constructor(props, id) 
	{
		super(props);
		this.state = 
		{
			value: '',
			id: id
		};

		this.handleChange = this.handleChange.bind(this);
	}
  
	handleChange(event)
	{
		var id = this.state.id;

		this.state = 
		{
			value: event.target.value,
			id: id
		};

		event.preventDefault();
	}
  
	render() {
	  return (
		<input type="text" className="form-control" id={this.state.id} onChange={this.handleChange}></input>
	  );
	}
};

export default CustomTextBox;