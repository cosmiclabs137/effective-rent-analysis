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

import { toCurrency, pmt, beginDue, toPercent } from "../../finance";

const SummaryTable = ({ deals, title }) => {
    const dealsArray = deals[0];
    const netEffectiveRates = dealsArray.map(
        (deal) => -pmt(deal.rate / 12, deal.term, deal.pv, 0, beginDue)
    );
    return (
        <TableContainer
            component={Paper}
            sx={{ overflow: "scroll" }}
            style={{ overflow: "scroll" }}
        >
            <Table size="small">
                <TableHead>
                    <TableRow key="column-names">
                        <TableCell>
                            <Typography fontWeight="bold">
                                {title} Summary
                            </Typography>
                        </TableCell>
                        {dealsArray.map((deal, index) => (
                            <TableCell align="right" key={index}>
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
                        {dealsArray.map((deal, index) => (
                            <TableCell align="right" key={index}>
                                {toCurrency(deal.totalCost)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="present-value">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Present Value
                        </TableCell>
                        {dealsArray.map((deal, index) => (
                            <TableCell align="right" key={index}>
                                {toCurrency(deal.pv)}
                            </TableCell>
                        ))}
                    </TableRow>
                    {/* <TableRow key="net-effective-rate-per-annum">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum
                        </TableCell>
                        {dealsArray.map((_, index) => (
                            <TableCell align="right" key={index}>
                                {toCurrency(netEffectiveRates[index] * 12)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="net-effective-rate-per-month">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month
                        </TableCell>
                        {dealsArray.map((_, index) => (
                            <TableCell align="right" key={index}>
                                {toCurrency(netEffectiveRates[index])}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow key="net-effective-rate-per-annum-per-sf">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Annum/RSF
                        </TableCell>
                        {dealsArray.map((deal, index) => (
                            <TableCell align="right" key={index}>
                                {toCurrency(
                                    (netEffectiveRates[index] * 12) /
                                        deal.sqftLeased
                                )}
                            </TableCell>
                        ))}
                    </TableRow> */}
                    <TableRow key="net-effective-rate-per-month-per-sf">
                        <TableCell sx={{ paddingLeft: 5 }}>
                            Net Effective Rate per Month/RSF
                        </TableCell>
                        {dealsArray.map((deal, index) => (
                            <TableCell align="right" key={index}>
                                {toCurrency(
                                    netEffectiveRates[index] / deal.sqftLeased
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    {title.toLowerCase() === "tenant" ? (
                        <TenantRows deals={dealsArray} />
                    ) : (
                        <LandlordRows deals={dealsArray} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const LandlordRows = ({ deals }) => {
    return (
        <>
            <TableRow key="irr">
                <TableCell sx={{ paddingLeft: 5 }}>
                    Internal Rate of Return (IRR):
                </TableCell>
                {deals.map((deal, index) => (
                    <TableCell align="right" key={index}>
                        {toPercent(deal.irr)}
                    </TableCell>
                ))}
            </TableRow>
            <TableRow key="break-even-month">
                <TableCell sx={{ paddingLeft: 5 }}>Break Even Month</TableCell>
                {deals.map((deal, index) => (
                    <TableCell align="right" key={index}>
                        {deal.breakEven}
                    </TableCell>
                ))}
            </TableRow>
        </>
    );
};

const TenantRows = ({ deals }) => {
    return (
        <>
            {/* <TableRow key="present-value-of-concessions">
                <TableCell sx={{ paddingLeft: 5 }}>
                    Present Value of Concessions
                </TableCell>
                {deals.map((deal, index) => (
                    <TableCell align="right" key={index}>
                        {toCurrency(deal.pvoc)}
                    </TableCell>
                ))}
            </TableRow> */}
            {/* <TableRow>
                <TableCell sx={{ paddingLeft: 5 }}>
                    Present Value of Concessions / Month
                </TableCell>
                {deals.map((deal, index) => (
                    <TableCell align="right" key={index}>
                        {toCurrency(
                            pmt(
                                deal.landlordDiscountRate / 12,
                                deal.term,
                                deal.pvoc,
                                0,
                                beginDue
                            )
                        )}
                    </TableCell>
                ))}
            </TableRow> */}
            <TableRow>
                <TableCell sx={{ paddingLeft: 5 }}>
                    Value of Concessions / RSF
                </TableCell>
                {deals.map((deal, index) => (
                    <TableCell align="right" key={index}>
                        {toCurrency(
                            (12 *
                                pmt(
                                    deal.landlordDiscountRate / 12,
                                    deal.term,
                                    deal.pvoc,
                                    0,
                                    beginDue
                                )) /
                                deal.sqftLeased
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </>
    );
};

export default SummaryTable;
