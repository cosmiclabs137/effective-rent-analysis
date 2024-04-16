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

const SummaryTable = ({ deal, title }) => {
    const toCurrency = (num) => {
        const formatted = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(num >= 0 ? num : -num);
        return num >= 0 ? formatted : `(${formatted})`;
    };

    return (
        <TableContainer
            component={Paper}
            sx={{ overflow: "scroll", marginBottom: 5 }}
        >
            <Table sx={{ maxWidth: 400 }} size="small">
                <TableHead>
                    <TableRow key={"table-head-row"}>
                        <TableCell>
                            <Typography fontWeight="bold">
                                {title} Summary
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography fontWeight="bold">Deal</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Total Cost For Occupancy
                        </TableCell>
                        <TableCell align="right">
                            {toCurrency(deal.totalCost)}
                        </TableCell>
                    </TableRow>
                    <TableRow key={"present-value"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Present Value
                        </TableCell>
                        <TableCell align="right">
                            {toCurrency(deal.pv)}
                        </TableCell>
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum
                        </TableCell>
                        <TableCell align="right">
                            {toCurrency(deal.netEffectiveRentPerYear)}
                        </TableCell>
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month
                        </TableCell>
                        <TableCell align="right">
                            {toCurrency(deal.netEffectiveRentPerMonth)}
                        </TableCell>
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum/SF
                        </TableCell>
                        <TableCell align="right">
                            {toCurrency(
                                deal.netEffectiveRentPerYear / deal.sqftLeased
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key={"total-cost-for-occupancy"}>
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month/SF
                        </TableCell>
                        <TableCell align="right">
                            {toCurrency(
                                deal.netEffectiveRentPerMonth / deal.sqftLeased
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SummaryTable;
