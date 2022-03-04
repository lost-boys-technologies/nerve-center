import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function LeagueTable(data) {
    const { users } = data;
 
    //? determine what extra fields I need to add
    // TODO need an edit button that will submit to firebase with the updates
    // TODO UI-wise, I need input fields in the areas   

    return (
        <TableContainer component={Paper}>
        <Table className='' aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Admin</TableCell>
                    <TableCell align="right">ID</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <TableRow key={user.name}>
                    <TableCell align="center" component="th" scope="row">
                        {user.name}
                    </TableCell>
                    <TableCell align="center">{String(user.admin)}</TableCell>
                    <TableCell align="right">{user.id}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
