import React, { Component } from 'react';
import PageTemplate from '../PageTemplate/PageTemplate';

import './Logs.css';
import TableStyled from './table';


class Logs extends Component{

	render(){
		return(
			<PageTemplate page="logs">
				<TableStyled></TableStyled>
			</PageTemplate>
		);
	}

}

export default Logs;