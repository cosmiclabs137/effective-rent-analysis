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
