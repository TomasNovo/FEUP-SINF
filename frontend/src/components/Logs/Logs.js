import React, { Component } from 'react';
import PageTemplate from '../PageTemplate/PageTemplate';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './Logs.css';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(type, proccessId, stepId, message) {
  return { type, proccessId, stepId, message };
}

const rows = [
  createData('Error', 159, 6.0, 24),
  createData('Success', 237, 9.0, 37),
  createData('Error', 262, 16.0, 24),
  createData('Error', 305, 3.7, 67),
  createData('Success', 356, 16.0, 49),
];


class Logs extends Component{

	render(){
		return(
			<PageTemplate page="logs">
				<Paper className="root">
      				<Table className="table" aria-label="customized table">
        				<TableHead>
          					<TableRow>
            					<StyledTableCell>Log</StyledTableCell>
            					<StyledTableCell align="right">Process</StyledTableCell>
            					<StyledTableCell align="right">Step</StyledTableCell>
            					<StyledTableCell align="right">Message</StyledTableCell>
          					</TableRow>
        				</TableHead>
        				<TableBody>
          					{rows.map(row => (
            				<StyledTableRow key={row.message}>
              					<StyledTableCell component="th" scope="row">
                					{row.type}
              					</StyledTableCell>
              					<StyledTableCell align="right">{row.proccessId}</StyledTableCell>
              					<StyledTableCell align="right">{row.stepId}</StyledTableCell>
              					<StyledTableCell align="right">{row.message}</StyledTableCell>
            				</StyledTableRow>
          					))}
        				</TableBody>
      				</Table>
   				 </Paper>
			</PageTemplate>
		);
	}

}

export default Logs;