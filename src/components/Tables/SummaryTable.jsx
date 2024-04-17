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

    const pmt = (rate, nper, pv, fv = 0) => {
        // adapted from: https://numpy.org/numpy-financial/latest/pmt.html
        const temp = (1 + rate) ** nper;
        const fact = ((1 + rate) * (temp - 1)) / rate;
        return -(fv + pv * temp) / fact;
    };

    return (
        <TableContainer component={Paper} sx={{ overflow: "scroll" }}>
            <Table size="small">
                <TableHead>
                    <TableRow key="column-names">
                        <TableCell>
                            <Typography fontWeight="bold">
                                {title} Summary
                            </Typography>
                        </TableCell>
                        {deals.map((deal, index) => (
                            <TableCell align="right">
                                <Typography fontWeight="bold">
                                    {deal.name
                                        ? deal.name
                                        : `Untitled Deal ${index + 1}`}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="total-cost-for-occupancy">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Total Cost For Occupancy
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(deal.totalCost)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="present-value">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Present Value
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(deal.pv)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="net-effective-rate-per-annum">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(
                                    -pmt(deal.rate / 12, deal.term, deal.pv) *
                                        12
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="net-effective-rate-per-month">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(
                                    -pmt(deal.rate / 12, deal.term, deal.pv)
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="net-effective-rate-per-annum-per-sf">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum/SF
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(
                                    (-pmt(deal.rate / 12, deal.term, deal.pv) /
                                        deal.sqftLeased) *
                                        12
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="net-effective-rate-per-month-per-sf">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month/SF
                        </TableCell>
                        {deals.map((deal) => (
                            <TableCell align="right">
                                {toCurrency(
                                    -pmt(deal.rate / 12, deal.term, deal.pv) /
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
