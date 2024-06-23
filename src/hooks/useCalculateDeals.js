import React from "react";

import { toCurrency, pv, pmt, pvocs, beginDue, endDue } from "../utils";

// custom hook for calculating the deals
const useCalculateDeal = (deals, metricsDispatch, metrics) => {
    const beforeTaxOccupancyCostTotal = React.useRef(0);
    const tenantNetPresentValue = React.useRef(0);
    const occupancyOpExCommissionsTotal = React.useRef(0);
    const landlordNetPresentValue = React.useRef(0);

    const presentValuesOfConcessions = React.useRef([]);

    const [dealsResults, setDealsResults] = React.useState([]);
    const landlordDealResults = React.useRef([]);
    const tenantDealResults = React.useRef([]);

    const isNew = (arr, deal) =>
        arr.filter((res) => res.id === deal.id).length === 0;

    const updateLandlordResults = React.useCallback(
        (deal) => {
            const results = {
                id: deal.id,
                name: deal.name,
                rate: deal.landlordDiscountRate / 100,
                totalCost: occupancyOpExCommissionsTotal.current,
                pv: landlordNetPresentValue.current,
                sqftLeased: deal.sqft,
                term: deal.term,
            };
            const currentResults = landlordDealResults.current;
            landlordDealResults.current = isNew(currentResults, deal)
                ? [...currentResults, results]
                : [
                      ...currentResults.filter((res) => res.id !== deal.id),
                      results,
                  ];
        },
        [occupancyOpExCommissionsTotal, landlordDealResults]
    );

    const updateTenantResults = React.useCallback(
        (deal, pvoc) => {
            const results = {
                id: deal.id,
                name: deal.name,
                rate: deal.tenantDiscountRate / 100,
                totalCost: beforeTaxOccupancyCostTotal.current,
                pv: tenantNetPresentValue.current,
                sqftLeased: deal.sqft,
                term: deal.term,
                pvoc: pvoc,
                landlordDiscountRate: deal.landlordDiscountRate / 100,
            };
            const currentResults = tenantDealResults.current;
            tenantDealResults.current = isNew(tenantDealResults.current, deal)
                ? [...currentResults, results]
                : [
                      ...currentResults.filter((res) => res.id !== deal.id),
                      results,
                  ];
        },
        [beforeTaxOccupancyCostTotal, tenantNetPresentValue]
    );

    React.useEffect(() => {
        const calculateDeal = (deal) => {
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

            const otherMonthlyTenantCosts = Array.from(
                new Float32Array(rates.length).fill(deal.otherMonthlyTenantCost)
            );
            let currentRecurringCostGrowthRate = 1;
            for (let period = 0; period < deal.term; period++) {
                if (period > 11 && period % 12 === 0) {
                    currentRecurringCostGrowthRate =
                        currentRecurringCostGrowthRate *
                        (1 + deal.globalInflation / 100);
                }
                otherMonthlyTenantCosts[period] =
                    deal.otherMonthlyTenantCost *
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
            const otherNonRecurringContributions = Array.from(
                new Float32Array(rates.length).fill(0)
            );
            otherNonRecurringContributions[0] = -deal.otherOneTimeLandlordCost;

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
                (monthlyPayment, period) => {
                    return (
                        monthlyPayment + // mp_i
                        operatingExpenses[period] + // opex_i
                        otherNonRecurringCosts[period] + // nrc_i
                        tenantImprovementCosts[period] + // tiContrib_i
                        otherMonthlyTenantCosts[period] + // orCost_i
                        rentAbatements[period] + // ra_i
                        otherRecurringContributions[period] + // orContrib_i
                        otherRecurringContributions[period] + // onrContrib_i
                        tenantImprovementAllowances[period] // tiAllowance_i
                    );
                }
            );

            beforeTaxOccupancyCostTotal.current = beforeTaxOccupancyCost.reduce(
                (acc, cost) => acc + cost,
                0
            );

            const tenantNetPV = beforeTaxOccupancyCost.map(
                (cost, period) =>
                    -pv(deal.tenantDiscountRate / 1200, period, 0, cost, endDue)
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
                        payment + // mp_i
                        otherMonthlyTenantCosts[period] + // orCost_i
                        rentAbatements[period] + // ra_i
                        tenantImprovementCosts[period] + // tiContrib_i
                        otherNonRecurringCosts[period] + // onrc_i
                        otherRecurringContributions[period] + // orContrib__i
                        otherNonRecurringContributions[period] + // onrContrib_i
                        (period === 0 ? totalCommission : 0)
                    );
                }
            );

            occupancyOpExCommissionsTotal.current =
                occupancyOpExCommissions.reduce((acc, value) => acc + value, 0);

            const landlordNetPV = occupancyOpExCommissions.map(
                (cost, period) =>
                    -pv(
                        deal.landlordDiscountRate / 1200,
                        period,
                        0,
                        cost,
                        endDue
                    )
            );

            landlordNetPresentValue.current = landlordNetPV.reduce(
                (acc, value) => acc + value,
                0
            );

            const povc = pvocs(
                deal.landlordDiscountRate / 1200,
                rentAbatements,
                tenantImprovementAllowances,
                otherNonRecurringCosts,
                otherRecurringContributions
            );

            updateLandlordResults(deal);
            updateTenantResults(deal, povc);

            // combine all the data into a table-friendly format
            const data = rates.map((rate, period) => {
                return {
                    month: period + 1,
                    name: deal.name,
                    monthlyPayment: toCurrency(monthlyPayments[period]),
                    opExPerMonthRsf: toCurrency(operatingExpenses[period]),
                    tiCostPerRsf: toCurrency(tenantImprovementCosts[period]),
                    otherOneTimeLandlordCost: toCurrency(
                        otherNonRecurringCosts[period]
                    ),
                    otherMonthlyTenantCost: toCurrency(
                        otherMonthlyTenantCosts[period]
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
                    ownerNetPV: toCurrency(landlordNetPV[period]),
                    tenantImprovementAllowance: toCurrency(
                        tenantImprovementAllowances[period]
                    ),
                };
            });

            return data;
        };

        setDealsResults(deals.map((deal) => calculateDeal(deal)));
    }, [
        deals,
        updateLandlordResults,
        updateTenantResults,
        metricsDispatch,
        presentValuesOfConcessions,
    ]);

    React.useEffect(() => {
        deals.forEach((deal, index) => {
            const currLandlordResults = landlordDealResults.current[index];
            const currTenantResults = tenantDealResults.current[index];

            metricsDispatch({
                type: "update",
                value: {
                    id: deal.id,
                    landlord:
                        -pmt(
                            currLandlordResults.rate / 12,
                            currLandlordResults.term,
                            currLandlordResults.pv,
                            0,
                            beginDue
                        ) / currLandlordResults.sqftLeased,
                    tenant:
                        -pmt(
                            currTenantResults.rate / 12,
                            currTenantResults.term,
                            currTenantResults.pv,
                            0,
                            beginDue
                        ) / currTenantResults.sqftLeased,
                },
            });
        });
    }, [deals, metricsDispatch]);

    return {
        calculatedDeals: dealsResults,
        landlordResults: landlordDealResults.current,
        tenantResults: tenantDealResults.current,
    };
};

export default useCalculateDeal;
