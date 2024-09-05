import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Checkbox,
    Paper,
    IconButton,
} from '@mui/material';
import useCrmUsers from '../hooks/useCrmUsers';
import DeleteIcon from "@mui/icons-material/Delete";


export default function CrmUsers() {
    const [selected, setSelected] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const { users, setUsersToDelete, setSingleuserToDelete, singleuserToDelete, usersToDelete, handleDeleteUsers } = useCrmUsers();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((row) => row._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#918A87" }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < users.length}
                                    checked={users.length > 0 && selected.length === users.length}
                                    onChange={handleSelectAllClick}
                                    sx={{ backgroundColor: "#000" }}
                                />
                            </TableCell>
                            <TableCell sx={{ color: "#000" }}>ID</TableCell>
                            <TableCell sx={{ color: "#000" }}>First name</TableCell>
                            <TableCell sx={{ color: "#000" }}>Last name</TableCell>
                            <TableCell sx={{ color: "#000" }}>Status</TableCell>
                            <TableCell sx={{ color: "#000" }}>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isItemSelected = isSelected(row._id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={() => handleClick(row._id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row._id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isItemSelected} />
                                        </TableCell>
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell>{row.name.first}</TableCell>
                                        <TableCell>{row.name.last}</TableCell>
                                        <TableCell>
                                            {row.isAdmin && row.isBusiness
                                                ? 'Admin & Business'
                                                : row.isAdmin
                                                    ? 'Admin'
                                                    : row.isBusiness
                                                        ? 'Business'
                                                        : 'Regular User'}
                                        </TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 100, 1300]}
            >

            </TablePagination>
            <IconButton onClick={() => handleDeleteUsers(users._id)}>
                <DeleteIcon sx={{ fontSize: "20px", color: "#918A87" }} />
            </IconButton>
        </Paper>
    );
}
