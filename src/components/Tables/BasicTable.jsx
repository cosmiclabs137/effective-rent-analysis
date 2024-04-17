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
                {columnNames.map((columnName, index) => (
                    <TableCell sx={{ fontWeight: "bold" }} key={index}>
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

const BasicTable = ({
    columnNames,
    data,
    stickyHeader = true,
    size = "small",
}) => {
    return (
        <TableContainer component={Paper} sx={{ overflow: "scroll" }}>
            <Table
                aria-label="basic table"
                stickyHeader={stickyHeader}
                xs={9}
                md={8}
                size={size}
                key="a-basic-table"
            >
                {genTableHead(columnNames)}
                {genTableBody(data)}
            </Table>
        </TableContainer>
    );
};

export default BasicTable;
