import React from "react";

import { toCurrency } from "../utils";

// custom hook for calculating the deals
const useCalculateDeal = (deal) => {
    const beforeTaxOccupancyCostTotal = React.useRef(0);
    const tenantNetPresentValue = React.useRef(0);
    const occupancyOpExCommissionsTotal = React.useRef(0);
    const ownerNetPresentValue = React.useRef(0);

    const [results, setResults] = React.useState([]);

    // console.table(deal);

    React.useEffect(() => {
        const calculateDeal = () => {
            const pv = (rate, nper, pmt, fv) => {
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

            const rates = [];

            let currentRate = 1;
            for (let period = 0; period < deal.term; period++) {
                if (period > 11 && period % 12 === 0) {
                    currentRate =
                        currentRate * (1 + deal.annualEscalations / 100);
                }
                rates.push(currentRate);
            }

            const tenantImprovementCosts = Array.from(
                new Float32Array(rates.length).fill(0.0)
            );
            tenantImprovementCosts[0] = deal.sqft * deal.tiCostPerRsf;

            const tenantImprovementAllowances = Array.from(
                new Float32Array(rates.length).fill(0.0)
            );
            tenantImprovementAllowances[0] =
                deal.tiAllowancePerRsf > 0
                    ? -deal.sqft * deal.tiAllowancePerRsf
                    : 0;

            const otherNonRecurringCosts = Array.from(
                new Float32Array(rates.length).fill(0.0)
            );
            otherNonRecurringCosts[0] = -Number(deal.otherOneTimeTenantCost);

            const otherRecurringCosts = Array.from(
                new Float32Array(rates.length).fill(deal.otherOneTimeTenantCost)
            );
            let currentRecurringCostGrowthRate = 1;
            for (let period = 0; period < deal.term; period++) {
                if (period > 11 && period % 12 === 0) {
                    currentRecurringCostGrowthRate =
                        currentRecurringCostGrowthRate *
                        (1 + deal.globalInflation / 100);
                }
                otherRecurringCosts[period] =
                    deal.otherOneTimeTenantCost *
                    currentRecurringCostGrowthRate;
            }

            const operatingExpenses = Array.from(
                new Float32Array(rates.length).fill(0)
            );

            let currentGrowthRate = 1;
            const opExConstant = deal.opExPerMonthRsf * deal.sqft;
            for (let period = 0; period < deal.term; period++) {
                if (period > 11 && period % 12 === 0) {
                    currentGrowthRate =
                        currentGrowthRate * (1 + deal.globalInflation / 100);
                }
                operatingExpenses[period] = opExConstant * currentGrowthRate;
            }

            let currentContribGrowthRate = 1;
            const otherRecurringContributions = Array.from(
                new Float32Array(rates.length).fill(0)
            );
            for (let period = 0; period < deal.term; period++) {
                if (period > 11 && period % 12 === 0) {
                    currentContribGrowthRate =
                        currentContribGrowthRate *
                        (1 + deal.globalInflation / 100);
                }
                otherRecurringContributions[period] =
                    -deal.otherMonthlyLandlordCost * currentContribGrowthRate;
            }

            const monthlyPayments = rates.map(
                (rate) => rate * deal.baseRent * deal.sqft
            );

            const rentAbatements = monthlyPayments.map((payment, period) => {
                return deal.monthsFreeRent > period ? -payment : 0;
            });
            let commissions = Array.from(
                new Float64Array(rates.length).fill(0.0)
            );
            rentAbatements.forEach((abatement, period) => {
                if (abatement >= 0) {
                    let commissionPercentIncrease =
                        period < 60
                            ? deal.commissionFirst
                            : deal.commissionSecond;
                    const commission =
                        (commissionPercentIncrease / 100) *
                        monthlyPayments[period];
                    commissions[period] = -commission;
                }
            });

            const beforeTaxOccupancyCost = monthlyPayments.map(
                (baseRent, period) => {
                    return (
                        baseRent +
                        operatingExpenses[period] +
                        tenantImprovementCosts[period] +
                        otherNonRecurringCosts[period] +
                        otherRecurringCosts[period] +
                        otherRecurringContributions[period] +
                        rentAbatements[period] +
                        tenantImprovementAllowances[period]
                    );
                }
            );

            beforeTaxOccupancyCostTotal.current = beforeTaxOccupancyCost.reduce(
                (acc, cost) => acc + cost,
                0
            );

            const tenantNetPV = beforeTaxOccupancyCost.map(
                (cost, period) =>
                    -pv(deal.tenantDiscountRate / 1200, period, 0, cost)
            );

            tenantNetPresentValue.current = tenantNetPV.reduce(
                (acc, value) => acc + value,
                0
            );

            const totalCommission = commissions.reduce(
                (acc, commission) => acc + commission,
                0
            );

            const firstCommissions = Array.from(
                new Float32Array(rates.length).fill(0)
            );
            firstCommissions[0] = totalCommission;

            const occupancyOpExCommissions = monthlyPayments.map(
                (payment, period) => {
                    return (
                        payment +
                        otherRecurringCosts[period] +
                        rentAbatements[period] +
                        tenantImprovementAllowances[period] +
                        otherNonRecurringCosts[period] +
                        otherRecurringContributions[period] +
                        (period === 0 ? totalCommission : 0)
                    );
                }
            );

            occupancyOpExCommissionsTotal.current =
                occupancyOpExCommissions.reduce((acc, value) => acc + value, 0);

            const ownerNetPV = occupancyOpExCommissions.map(
                (cost, period) =>
                    -pv(deal.landlordDiscountRate / 1200, period, 0, cost)
            );

            ownerNetPresentValue.current = ownerNetPV.reduce(
                (acc, value) => acc + value,
                0
            );

            // combine all the data into a table-friendly format
            const data = rates.map((rate, period) => {
                return {
                    month: period + 1,
                    monthlyPayment: toCurrency(monthlyPayments[period]),
                    opExPerMonthRsf: toCurrency(operatingExpenses[period]),
                    tiCostPerRsf: toCurrency(tenantImprovementCosts[period]),
                    otherOneTimeLandlordCost: toCurrency(
                        otherNonRecurringCosts[period]
                    ),
                    otherMonthlyTenantCost: toCurrency(
                        otherRecurringCosts[period]
                    ),
                    rentAbatement: toCurrency(rentAbatements[period]),
                    tiAllowancePerRsf: toCurrency(
                        tenantImprovementAllowances[period]
                    ),
                    commission: toCurrency(commissions[period]),
                    beforeTaxOccupancyCost: toCurrency(
                        beforeTaxOccupancyCost[period]
                    ),
                    tenantNetPV: toCurrency(tenantNetPV[period]),
                    occupancyOpExCommission: toCurrency(
                        occupancyOpExCommissions[period]
                    ),
                    ownerNetPV: toCurrency(ownerNetPV[period]),
                    tenantImprovementAllowance: toCurrency(
                        tenantImprovementAllowances[period]
                    ),
                };
            });

            return data;
        };
        setResults(calculateDeal());
    }, [deal]);

    return results;
};

export default useCalculateDeal;
