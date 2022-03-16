import React from 'react';

// components
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

    const memberSince = (val) => {
        const currentYear = new Date()?.getFullYear();
        const inauguralSeason = val?.memberSince?.toDate().toDateString().split(' ').slice(3).join(' ');
        const memberSince = currentYear - inauguralSeason;

        if (val?.memberSince === undefined) {
            return 'N/A'
        } else {
            return `${memberSince} yr${memberSince === 1 ? '' : 's'}`;
        }
    }

    return (
        <TableContainer component={Paper}>
        <Table className='league-table' size='small' aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Member Since</TableCell>
                    <TableCell align="center">Admin</TableCell>
                    <TableCell align="center">Edit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <TableRow key={user.name}>
                    <TableCell align="center" component="th" scope="row">
                        {user.name}
                    </TableCell>
                    <TableCell align="center">{memberSince(user)}</TableCell>
                    <TableCell align="center">{String(user.admin)}</TableCell>
                    <TableCell align="center"><a href='/'>Edit</a></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
