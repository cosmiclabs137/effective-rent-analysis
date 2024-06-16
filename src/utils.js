export const toCurrency = (num) => {
    const formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(num >= 0 ? num : -num);
    return num >= 0 ? formatted : `(${formatted})`;
};

export const dealFactory = (id) => ({
    id: id,
    name: `Deal ${id + 1}`,
    sqft: 2794,
    term: 65,
    baseRent: 3.45,
    annualEscalations: 3,
    opExPerMonthRsf: 0,
    globalInflation: 0,
    otherOneTimeLandlordCost: 0,
    otherOneTimeTenantCost: 0,
    otherMonthlyLandlordCost: 0,
    otherMonthlyTenantCost: 0,
    monthsFreeRent: 5,
    commissionFirst: 4,
    commissionSecond: 0,
    tenantDiscountRate: 7,
    tiCostPerRsf: 0,
    tiAllowancePerRsf: 0,
    landlordDiscountRate: 5,
});

export const pmt = (rate, nper, pv, fv = 0) => {
    // adapted from: https://numpy.org/numpy-financial/latest/pmt.html
    const temp = (1 + rate) ** nper;
    const fact = ((1 + rate) * (temp - 1)) / rate;

    return -(fv + pv * temp) / fact;
};

export const pv = (rate, nper, pmt, fv = 0) => {
    let pv_value = 0;

    if (rate === 0.0) {
        pv_value = -(fv + pmt * nper);
    } else {
        const x = Math.pow(1 + rate, -nper);
        const y = Math.pow(1 + rate, nper);

        pv_value = -(x * (fv * rate - pmt + y * pmt)) / rate;
    }
    return pv_value;
};

// present value of concessions
export const pvocs = (
    rate,
    abatements,
    tiAllowance,
    otherNonRecurringCosts,
    beforeTaxOccupancyCost
) => {
    const pvs = abatements.map((abatement, index) => {
        const fv =
            abatement +
            tiAllowance[index] +
            otherNonRecurringCosts[index] +
            beforeTaxOccupancyCost[index];
        return -pv(rate, index, 0, fv);
    });

    return pvs.reduce((acc, val) => acc + val, 0);
};
