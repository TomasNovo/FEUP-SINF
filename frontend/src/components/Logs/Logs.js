import React, { Component } from 'react';
import PageTemplate from '../PageTemplate/PageTemplate';
import axios from 'axios';

import './Logs.css';
import TableStyled from './table';


class Logs extends Component{

	constructor(props){
		super(props);
		this.state={
			logs:[]
		}
	}

	render(){
		return(
			<PageTemplate page="logs">
				<TableStyled logs={this.state.logs}></TableStyled>
			</PageTemplate>
		);
	}

	componentDidMount()
    {
        document.title = "Logs";

        //fetch all logs and set the state
        let promise = axios.get('http://localhost:7000/api/log')
        .then((response) => {
        	this.setState({logs: response.data});
        })
        .catch((error) =>{
        	this.setState({logs: []});
        })

        Promise.all([promise]).then(()=>{
        	console.log(this.state.logs);
        });
    }

}

export default Logs;