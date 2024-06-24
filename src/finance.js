import { irr as financeIrr, pmt, pv, PaymentDueTime } from "financial";

import { arrayFrom, isNewYear, range } from "./utils";

const beginDue = PaymentDueTime.Begin;
const endDue = PaymentDueTime.End;

function simpleYearlyIncrease(periods, value, rate) {
    let currentRate = 1;

    return periods.map((period) => {
        if (isNewYear(period)) {
            currentRate *= 1 + rate;
        }

        return value * currentRate;
    });
}

// present value of concessions
const pvocs = (
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

const toCurrency = (num) => {
    const formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(num >= 0 ? num : -num);
    return num >= 0 ? formatted : `(${formatted})`;
};

const toPercent = (num) =>
    Number(num).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
    });

const calculateDeal = (deal) => {
    const periods = range(deal.term);

    // these are the columns that we're going to be calculating
    const monthlyPayments = simpleYearlyIncrease(
        periods,
        deal.baseRent * deal.sqft,
        deal.annualEscalations / 1200
    );

    const operatingExpenses = simpleYearlyIncrease(
        periods,
        deal.opExPerMonthRsf * deal.sqft,
        deal.globalInflation / 1200
    );
    const tiCosts = arrayFrom(periods.length, 0);
    tiCosts[0] = deal.tiCostPerRsf * deal.sqft;

    const nonRecurringCosts = arrayFrom(periods.length, 0);
    nonRecurringCosts[0] = deal.otherOneTimeTenantCost;

    const recurringCosts = simpleYearlyIncrease(
        periods,
        deal.otherMonthlyTenantCost,
        deal.tenantDiscountRate / 1200
    );

    const rentAbatements = periods.map((period) =>
        period < deal.monthsFreeRent ? -deal.baseRent * deal.sqft : 0
    );

    const tiAllowances = arrayFrom(periods.length);
    tiAllowances[0] = -deal.sqft * deal.tiAllowancePerRsf * deal.sqft;

    const commissions = periods.map((period) => {
        let commissionPercent;

        if (period < deal.monthsFreeRent) {
            commissionPercent =
                period < 60 ? deal.commissionFirst : deal.commissionSecond;
        }

        return commissionPercent * -monthlyPayments[period];
    });

    const nonRecurringContributions = arrayFrom(periods, 0);
    nonRecurringContributions[0] = -deal.otherOneTimeLandlordCost;

    const recurringContributions = simpleYearlyIncrease(
        periods,
        -deal.otherMonthlyLandlordCost,
        deal.globalInflation / 1200
    );

    const beforeTaxOccupancyCosts = periods.map(
        (period) =>
            monthlyPayments[period] +
            tiAllowances[period] +
            nonRecurringContributions[period] +
            recurringContributions[period]
    );

    const tenantNetPresentValues = periods.map(
        (period) =>
            -pv(
                deal.tenantDiscountRate / 1200,
                period,
                0,
                beforeTaxOccupancyCosts[period],
                endDue
            )
    );

    const addExpenses = (period) =>
        monthlyPayments[period] +
        recurringCosts[period] +
        rentAbatements[period] +
        tiAllowances[period] +
        nonRecurringContributions[period] +
        recurringContributions[period];
    const occupancyOpExCommissions = periods.map((period) => {
        if (period === 0) {
            const totalCommission = commissions.reduce(
                (acc, commission) => acc + commission,
                0
            );
            return totalCommission + addExpenses(period);
        }
        return addExpenses(period);
    });

    const landlordNetPresentValues = periods.map(
        (period) =>
            -pv(
                deal.tenantDiscountRate / 1200,
                period,
                0,
                occupancyOpExCommissions[period],
                endDue
            )
    );

    const calculatedDeal = {
        month: periods,
        monthlyPayment: monthlyPayments,
        opExPerMonthRsf: operatingExpenses,
        tiCostPerRsf: tiCosts,
        otherOneTimeLandlordCost: nonRecurringContributions,
        otherMonthlyTenantCost: recurringCosts,
        rentAbatement: rentAbatements,
        tiAllowancePerRsf: tiAllowances,
        commission: commissions,
        beforeTaxOccupancyCost: beforeTaxOccupancyCosts,
        tenantNetPV: tenantNetPresentValues,
        occupancyOpExCommission: occupancyOpExCommissions,
        ownerNetPV: landlordNetPresentValues,
    };
    return {
        calculatedDeal: calculatedDeal,
        landlordResults: [],
        tenantResults: [],
    };
};

const irr = (values, guess = 0.001) =>
    Math.pow(1 + financeIrr(values, guess), 12) - 1;

const breakEvenMonth = (array) => {
    for (let index = 0; index < array.length; index++) {
        if (array[index] >= 0) {
            return index + 1;
        }
    }

    return -1;
};

export {
    beginDue,
    breakEvenMonth,
    calculateDeal,
    endDue,
    irr,
    pmt,
    pv,
    pvocs,
    simpleYearlyIncrease,
    toCurrency,
    toPercent,
};
