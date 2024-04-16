import React from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const genTableHead = (columnNames) => {
    return (
        <TableHead>
            <TableRow key="table-key">
                {columnNames.map((columnName) => (
                    <TableCell sx={{ fontWeight: "bold" }}>
                        {columnName}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const genTableBody = (data) => {
    return (
        <TableBody>
            {data.map((row, index) => (
                <TableRow hover key={index}>
                    {row.map((datum) => (
                        <TableCell>{datum}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

const BasicTable = ({ columnNames, data, stickyHeader = true }) => {
    return (
        <TableContainer component={Paper} sx={{ overflow: "scroll" }}>
            <Table
                aria-label="basic table"
                stickyHeader={stickyHeader}
                xs={12}
                md={8}
            >
                {genTableHead(columnNames)}
                {genTableBody(data)}
            </Table>
        </TableContainer>
    );
};

export default BasicTable;
