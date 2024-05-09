import React, { useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import BasicTable from "../Tables/BasicTable";
import GridWrapper from "../common/GridWrapper/GridWrapper";
import DealInputForm from "../DealInputForm/DealInputForm";

const Deal = ({
    dealName,
    dealTerm,
    dealRate,
    tenantDiscountRate,
    setTenantDiscountRate,
    setDealName,
    setDealTerm,
    sqftLeased,
    setSqftLeased,
    setBeforeTaxOccupancyCostTotal,
    setTenantNetPresentValue,
    setOccupancyOpExCommissionsTotal,
    setOwnerNetPresentValue,
    landlordDiscountRate,
    setLandlordDiscountRate,
    monthsFreeRent,
    setMonthsFreeRent,
    baseRent,
    setBaseRent,
    annualEscalations,
    setAnnualEscalations,
    occupancyExpensesPsf,
    setOccupancyExpensesPsf,
    commissionPercent1st,
    setCommissionPercent1st,
    growthRateInOpEx,
    setGrowthRateInOpEx,
    otherRecurringCost,
    setOtherRecurringCost,
    otherNonRecurringCost,
    setOtherNonRecurringCost,
    recurringCostGrowthRate,
    setRecurringCostGrowthRate,
    tenantImprovementCost,
    setTenantImprovementCost,
    tenantImprovementAllowance,
    setTenantImprovementAllowance,
    otherNonRecurringContribution,
    setOtherNonRecurringContribution,
    otherRecurringContribution,
    setOtherRecurringContribution,
    contributionGrowthRate,
    setContributionGrowthRate,
    commissionPercent2nd,
    setCommissionPercent2nd,
    xs = 3,
}) => {
    const toCurrency = (num) => {
        const formatted = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(num >= 0 ? num : -num);
        return num >= 0 ? formatted : `(${formatted})`;
    };

    const generateTable = () => {
        const columnNames = [
            "Month",
            // "Rate",
            "Base Rent ($)",
            "Operating Expenses ($)",
            "Tenant Improvements Cost ($)",
            "Non-Recurring Cost ($)",
            "Other Recurring Cost ($)",
            "Rent Abatement ($)",
            "Tenant Improvements Allowance ($)",
            "Commission ($)",
            "Before Tax Occupancy Expenses ($)",
            "Tenant Net Present Value ($)",
            "Occupancy + OpEx + Commission ($)",
            "Owner Net Present Value ($)",
        ];
        return <BasicTable columnNames={columnNames} data={calculateDeal()} />;
    };

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
        for (let period = 0; period < dealTerm; period++) {
            if (period > 11 && period % 12 === 0) {
                currentRate = currentRate * (1 + annualEscalations / 100);
            }
            rates.push(currentRate);
        }

        const tenantImprovementCosts = Array.from(
            new Float32Array(rates.length).fill(0.0)
        );
        tenantImprovementCosts[0] = sqftLeased * tenantImprovementCost;

        const tenantImprovementAllowances = Array.from(
            new Float32Array(rates.length).fill(0.0)
        );
        tenantImprovementAllowances[0] =
            tenantImprovementAllowance > 0
                ? -sqftLeased * tenantImprovementAllowance
                : 0;

        const otherNonRecurringCosts = Array.from(
            new Float32Array(rates.length).fill(0.0)
        );
        otherNonRecurringCosts[0] = -Number(otherNonRecurringCost);

        const otherRecurringCosts = Array.from(
            new Float32Array(rates.length).fill(otherRecurringCost)
        );
        let currentRecurringCostGrowthRate = 1;
        for (let period = 0; period < dealTerm; period++) {
            if (period > 11 && period % 12 === 0) {
                currentRecurringCostGrowthRate =
                    currentRecurringCostGrowthRate *
                    (1 + recurringCostGrowthRate / 100);
            }
            otherRecurringCosts[period] =
                otherRecurringCost * currentRecurringCostGrowthRate;
        }

        const operatingExpenses = Array.from(
            new Float32Array(rates.length).fill(0)
        );

        let currentGrowthRate = 1;
        const opExConstant = occupancyExpensesPsf * sqftLeased;
        for (let period = 0; period < dealTerm; period++) {
            if (period > 11 && period % 12 === 0) {
                currentGrowthRate =
                    currentGrowthRate * (1 + growthRateInOpEx / 100);
            }
            operatingExpenses[period] = opExConstant * currentGrowthRate;
        }

        let currentContribGrowthRate = 1;
        const otherRecurringContributions = Array.from(
            new Float32Array(rates.length).fill(0)
        );
        for (let period = 0; period < dealTerm; period++) {
            if (period > 11 && period % 12 === 0) {
                currentContribGrowthRate =
                    currentContribGrowthRate *
                    (1 + contributionGrowthRate / 100);
            }
            otherRecurringContributions[period] =
                otherRecurringContribution * currentContribGrowthRate;
        }

        const monthlyPayments = rates.map(
            (rate) => rate * baseRent * sqftLeased
        );

        const rentAbatements = monthlyPayments.map((payment, period) => {
            return monthsFreeRent > period ? -payment : 0;
        });
        let commissions = Array.from(new Float64Array(rates.length).fill(0.0));
        rentAbatements.forEach((abatement, period) => {
            if (abatement >= 0) {
                const commission =
                    (commissionPercent1st / 100) * monthlyPayments[period];
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
                    rentAbatements[period] +
                    tenantImprovementAllowances[period]
                );
            }
        );
        setBeforeTaxOccupancyCostTotal(
            beforeTaxOccupancyCost.reduce((acc, cost) => acc + cost)
        );

        const tenantNetPV = beforeTaxOccupancyCost.map(
            (cost, period) => -pv(tenantDiscountRate / 1200, period, 0, cost)
        );
        setTenantNetPresentValue(
            tenantNetPV.reduce((acc, value) => acc + value)
        );

        const totalCommission = commissions.reduce(
            (acc, commission) => acc + commission
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

        setOccupancyOpExCommissionsTotal(
            occupancyOpExCommissions.reduce((acc, value) => acc + value)
        );

        const ownerNetPV = occupancyOpExCommissions.map(
            (cost, period) => -pv(landlordDiscountRate / 1200, period, 0, cost)
        );

        setOwnerNetPresentValue(ownerNetPV.reduce((acc, value) => acc + value));

        // combine all the data into a table-friendly format
        const data = rates.map((rate, period) => {
            return [
                <Typography>
                    <Box component="span" fontWeight="bold">
                        {period + 1}
                    </Box>
                </Typography>,
                // Number(rate).toFixed(3),
                toCurrency(monthlyPayments[period]),
                toCurrency(operatingExpenses[period]),
                toCurrency(tenantImprovementCosts[period]),
                toCurrency(otherNonRecurringCosts[period]),
                toCurrency(otherRecurringCosts[period]),
                toCurrency(rentAbatements[period]),
                toCurrency(tenantImprovementAllowances[period]),
                toCurrency(commissions[period]),
                toCurrency(beforeTaxOccupancyCost[period]),
                toCurrency(tenantNetPV[period]),
                toCurrency(occupancyOpExCommissions[period]),
                toCurrency(ownerNetPV[period]),
            ];
        });

        return data;
    };

    const [dealTable, setDealTable] = useState(generateTable);

    const handleDealName = (e) => {
        setDealName(e.target.value);
    };

    const handlesqftLeased = (e) => {
        setSqftLeased(e.target.value);
    };

    const handleDealTerm = (e) => {
        setDealTerm(e.target.value);
    };

    const handleBaseRent = (e) => {
        setBaseRent(e.target.value);
    };

    const handleAnnualEscalations = (e) => {
        setAnnualEscalations(e.target.value);
    };

    const handleOccupancyExpensesPsf = (e) => {
        setOccupancyExpensesPsf(e.target.value);
    };

    const handleMonthsFreeRent = (e) => {
        setMonthsFreeRent(e.target.value);
    };

    const handleTenantDiscountRate = (e) => {
        setTenantDiscountRate(e.target.value);
    };

    const handleLandlordDiscountRate = (e) => {
        setLandlordDiscountRate(e.target.value);
    };

    const handleCommissionPercent1st = (e) => {
        setCommissionPercent1st(e.target.value);
    };

    const handleCommissionPercent2nd = (e) => {
        setCommissionPercent2nd(e.target.value);
    };

    const handleGrowthRateInOpEx = (e) => {
        setGrowthRateInOpEx(e.target.value);
    };

    const handleOtherNonRecurringCost = (e) => {
        setOtherNonRecurringCost(e.target.value);
    };

    const handleOtherRecurringCost = (e) => {
        setOtherRecurringCost(e.target.value);
    };

    const handleRecurringCostGrowthRate = (e) => {
        setRecurringCostGrowthRate(e.target.value);
    };

    const handleTenantImprovementCost = (e) => {
        setTenantImprovementCost(e.target.value);
    };

    const handleTenantImprovementAllowance = (e) => {
        setTenantImprovementAllowance(e.target.value);
    };

    const handleOtherNonRecurringContribution = (e) => {
        setOtherNonRecurringContribution(e.target.value);
    };

    const handleOtherRecurringContribution = (e) => {
        setOtherRecurringContribution(e.target.value);
    };

    const handleContributionGrowthRate = (e) => {
        setContributionGrowthRate(e.target.value);
    };

    const handleSubmit = (e) => {
        setDealTable(generateTable());
    };

    return (
        <GridWrapper>
            <DealInputForm
                dealName={dealName}
                handleDealName={handleDealName}
                sqftLeased={sqftLeased}
                handlesqftLeased={handlesqftLeased}
                dealTerm={dealTerm}
                handleDealTerm={handleDealTerm}
                baseRent={baseRent}
                handleBaseRent={handleBaseRent}
                annualEscalations={annualEscalations}
                handleAnnualEscalations={handleAnnualEscalations}
                occupancyExpensesPsf={occupancyExpensesPsf}
                handleOccupancyExpensesPsf={handleOccupancyExpensesPsf}
                monthsFreeRent={monthsFreeRent}
                handleMonthsFreeRent={handleMonthsFreeRent}
                tenantDiscountRate={tenantDiscountRate}
                handleTenantDiscountRate={handleTenantDiscountRate}
                landlordDiscountRate={landlordDiscountRate}
                handleLandlordDiscountRate={handleLandlordDiscountRate}
                commissionPercent1st={commissionPercent1st}
                handleCommissionPercent1st={handleCommissionPercent1st}
                commissionPercent2nd={commissionPercent2nd}
                handleCommissionPercent2nd={handleCommissionPercent2nd}
                growthRateInOpEx={growthRateInOpEx}
                handleGrowthRateInOpEx={handleGrowthRateInOpEx}
                handleOtherNonRecurringCost={handleOtherNonRecurringCost}
                otherNonRecurringCost={otherNonRecurringCost}
                otherRecurringCost={otherRecurringCost}
                handleOtherRecurringCost={handleOtherRecurringCost}
                recurringCostGrowthRate={recurringCostGrowthRate}
                handleRecurringCostGrowthRate={handleRecurringCostGrowthRate}
                tenantImprovementCost={tenantImprovementCost}
                handleTenantImprovementCost={handleTenantImprovementCost}
                tenantImprovementAllowance={tenantImprovementAllowance}
                handleTenantImprovementAllowance={
                    handleTenantImprovementAllowance
                }
                otherNonRecurringContribution={otherNonRecurringContribution}
                handleOtherNonRecurringContribution={
                    handleOtherNonRecurringContribution
                }
                otherRecurringContribution={otherRecurringContribution}
                handleOtherRecurringContribution={
                    handleOtherRecurringContribution
                }
                contributionGrowthRate={contributionGrowthRate}
                handleContributionGrowthRate={handleContributionGrowthRate}
                handleSubmit={handleSubmit}
                xs={xs}
            />
            <Grid item xs={9}>
                <Typography variant="h5" align="center" marginBottom={2}>
                    {dealName !== "" ? dealName : "Untitled"}
                </Typography>
                {dealTable}
            </Grid>
        </GridWrapper>
    );
};

export default Deal;
