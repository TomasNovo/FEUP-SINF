import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'log', label: 'Log', minWidth: 40 },
  {
    id: 'processId',
    label: 'ProcessID',
    minWidth: 50,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'stepId',
    label: 'StepID',
    minWidth: 50,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'message',
    label: 'Message',
    minWidth: 300,
    align: 'center',
    format: value => value.toLocaleString(),
  },
];

function createData(log, processId, stepId, message) {
  return { log, processId, stepId, message };
}

const rows = [
  createData('Success', 1, 1, 'message1'),
  createData('Success', 2, 1, 'message2'),
  createData('Success', 3, 1, 'message3'),
  createData('Success', 4, 1, 'message4'),
  createData('Success', 5, 1, 'message5'),
  createData('Success', 6, 1, 'message6'),
  createData('Success', 7, 1, 'message7'),
  createData('Success', 8, 1, 'message8'),
  createData('Success', 9, 1, 'message9'),
  createData('Success', 10, 1, 'message10'),
  createData('Success', 11, 1, 'message11'),
  createData('Success', 12, 1, 'message12'),
  createData('Success', 13, 1, 'message13'),
  createData('Success', 14, 1, 'message14'),
  createData('Success', 15, 1, 'message15'),
  createData('Success', 16, 1, 'message16'),
];

const useStyles = makeStyles({
  root: {
    width: '83%',
    marginLeft: '100px',
    marginTop: '80px',

  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
    backgroundColor: '#C0C0C0',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper id="logs-table" className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}