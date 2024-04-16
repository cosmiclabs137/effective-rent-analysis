import React from "react";

import SummaryTable from "../Tables/SummaryTable";

const Summary = ({ ownerDeals, tenantDeals }) => {
    const pmt = (rate, nper, pv, fv = 0) => {
        // adapted from: https://numpy.org/numpy-financial/latest/pmt.html
        const temp = (1 + rate) ** nper;
        const fact = ((1 + rate) * (temp - 1)) / rate;
        return -(fv + pv * temp) / fact;
    };

    const tenantNERperMonth = -pmt(
        tenantDeals.rate / 12,
        tenantDeals.term,
        tenantDeals.pv
    );

    const ownerNERperMonth = -pmt(
        ownerDeals.rate / 12,
        ownerDeals.term,
        ownerDeals.pv
    );

    const td = {
        netEffectiveRentPerMonth: tenantNERperMonth,
        netEffectiveRentPerYear: tenantNERperMonth * 12,
        totalCost: tenantDeals.totalCost,
        pv: tenantDeals.pv,
        sqftLeased: tenantDeals.sqftLeased,
    };
    const od = {
        netEffectiveRentPerMonth: ownerNERperMonth,
        netEffectiveRentPerYear: ownerNERperMonth * 12,
        totalCost: ownerDeals.totalCost,
        pv: ownerDeals.pv,
        sqftLeased: ownerDeals.sqftLeased,
    };
    return (
        <>
            <SummaryTable deal={td} title="Tenant" />
            <SummaryTable deal={od} title="Owner" />
        </>
    );
};

export default Summary;
