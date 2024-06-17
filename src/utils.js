import { pmt, pv, PaymentDueTime } from "financial";

const beginDue = PaymentDueTime.Begin;
const endDue = PaymentDueTime.End;

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

// export const pmt = (rate, nper, pv, fv = 0, when = 0) => {
//     // when: 1 -> beginning, 0 -> end
//     // adapted from: https://numpy.org/numpy-financial/latest/pmt.html
//     const isRateZero = rate === 0;
//     const temp = (1 + rate) ** nper;
//     const maskedRate = isRateZero ? 1 : rate;
//     const fact = isRateZero
//         ? nper
//         : ((1 + maskedRate * when) * (temp - 1)) / maskedRate;

//     return -(fv + pv * temp) / fact;
// };

// export const pv = (rate, nper, pmt, fv = 0, when = 0) => {
//     // when: 1 -> beginning, 0 -> end
//     const isRateZero = rate === 0;
//     const temp = (1 + rate) ** nper;
//     const fact = isRateZero ? nper : ((1 + rate * when) * (temp - 1)) / rate;
//     return -(fv + pmt * fact) / temp;
// };

// present value of concessions
export const pvocs = (
    rate,
    abatements,
    tiAllowance,
    otherNonRecurringCosts,
    otherRecurringContributions
) => {
    const pvs = abatements.map((abatement, index) => {
        const fv =
            abatement +
            tiAllowance[index] +
            otherNonRecurringCosts[index] +
            otherRecurringContributions[index];
        return -pv(rate, index, 0, fv, endDue);
    });

    return pvs.reduce((acc, val) => acc + val, 0);
};

export { beginDue, endDue, pmt, pv };
