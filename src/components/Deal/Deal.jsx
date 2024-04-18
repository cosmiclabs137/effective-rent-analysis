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
    commissionPercent,
    setCommissionPercent,
    baseRent,
    setBaseRent,
    annualEscalations,
    setAnnualEscalations,
    occupancyExpensesPsf,
    setOccupancyExpensesPsf,
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
            "Rent Abatement ($)",
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

        const operatingExpenses = Array.from(
            new Float32Array(rates.length).fill(
                occupancyExpensesPsf * sqftLeased
            )
        );

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
                    (commissionPercent / 100) * monthlyPayments[period];
                commissions[period] = -commission;
            }
        });

        const beforeTaxOccupancyCost = monthlyPayments.map(
            (baseRent, period) => {
                return (
                    baseRent +
                    operatingExpenses[period] +
                    rentAbatements[period]
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

        const occupancyOpExCommissions = monthlyPayments.map(
            (payment, period) => {
                return (
                    payment +
                    rentAbatements[period] +
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
                toCurrency(rentAbatements[period]),
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

    const handleCommissionPercent = (e) => {
        setCommissionPercent(e.target.value);
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
                commissionPercent={commissionPercent}
                handleCommissionPercent={handleCommissionPercent}
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
