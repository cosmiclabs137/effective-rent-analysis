import React from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const SummaryTable = ({ deals, title }) => {
    const toCurrency = (num) => {
        const formatted = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(num >= 0 ? num : -num);
        return num >= 0 ? formatted : `(${formatted})`;
    };

    return (
        <TableContainer component={Paper} sx={{ overflow: "scroll" }}>
            <Table size="small">
                <TableHead>
                    <TableRow key={"table-head-row"}>
                        <TableCell>
                            <Typography fontWeight="bold">
                                {title} Summary
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography fontWeight="bold">Deal 1</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography fontWeight="bold">Deal 3</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography fontWeight="bold">Deal 2</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Total Cost For Occupancy
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(deal.totalCost)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key={"present-value"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Present Value
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(deal.pv)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(deal.netEffectiveRentPerYear)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(deal.netEffectiveRentPerMonth)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum/SF
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(
                                    deal.netEffectiveRentPerYear /
                                        deal.sqftLeased
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month/SF
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(
                                    deal.netEffectiveRentPerMonth /
                                        deal.sqftLeased
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SummaryTable;
