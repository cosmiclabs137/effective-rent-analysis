import React from "react";

import { Box } from "@mui/material";
// import SummaryChart from "../Charts/SummaryChart";
import SummaryTable from "../Tables/SummaryTable";

const Summary = ({ ownerDeals, tenantDeals }) => {
    // const toCurrency = (num) => {
    //     const formatted = Intl.NumberFormat("en-US", {
    //         style: "currency",
    //         currency: "USD",
    //     }).format(num >= 0 ? num : -num);
    //     return num >= 0 ? formatted : `(${formatted})`;
    // };

    // const pmt = (rate, nper, pv, fv = 0) => {
    //     // adapted from: https://numpy.org/numpy-financial/latest/pmt.html
    //     const temp = (1 + rate) ** nper;
    //     const fact = ((1 + rate) * (temp - 1)) / rate;
    //     return -(fv + pv * temp) / fact;
    // };

    // const toSeries = (deals) => ({
    //     data: deals.map(
    //         (deal) => -pmt(deal.rate / 12, deal.term, deal.pv) / deal.sqftLeased
    //     ),
    //     type: "bar",
    // });

    // const ownerSeries = toSeries(ownerDeals);
    // const tenantSeries = toSeries(tenantDeals);
    // const axis = {
    //     data: ownerDeals.map((d) => d.name),
    //     scaleType: "linear",
    // };
    // const sizingProps = { width: 600, height: 500 };

    // const tenantDataset = tenantDeals.map(({name, }) => ({name: toCurrency()}));
    // const tenantDataset = [
    //     { "Deal 1": 3.22 },
    //     { "Deal 2": 4.2 },
    //     { "Deal 3": 10.2 },
    // ];
    // const ownerDataset = [{}];
    return (
        <Box md={5}>
            <SummaryTable deals={tenantDeals} title="Tenant" />
            <SummaryTable deals={ownerDeals} title="Owner" />
            {/* <SummaryChart dataset={tenantDataset} sizingProps={sizingProps} />
            <SummaryChart dataset={ownerDataset} sizingProps={sizingProps} /> */}
        </Box>
    );
};

export default Summary;
