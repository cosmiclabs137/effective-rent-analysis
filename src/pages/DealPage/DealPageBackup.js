import React, { useState } from "react";

import { Box, Grid, Typography } from "@mui/material";

import BasicTable from "../../components/Tables/BasicTable";
import DealInputForm from "../../components/DealInputForm/DealInputForm";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";

const DealPageBackup = () => {
    const [dealName, setDealName] = useState("");
    const [sqftLeased, setSqftLeased] = useState(0);
    const [dealTerm, setDealTerm] = useState(12); // is this standard
    const [baseRent, setBaseRent] = useState(0);
    const [annualEscalations, setAnnualEscalations] = useState(0);
    const [occupancyExpensesPsf, setOccupancyExpensesPsf] = useState(0);
    const [monthsFreeRent, setMonthsFreeRent] = useState(0);
    const [landlordDiscountRate, setLandlordDiscountRate] = useState(0);
    const [tenantDiscountRate, setTenantDiscountRate] = useState(0);
    const [commissionPercent, setCommissionPercent] = useState(0);

    const toCurrency = (num) => {
        const formatted = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(num >= 0 ? num : -num);
        return num >= 0 ? formatted : `(${formatted})`;
    };

    const generateTable = () => {
        const columnNames = [
            "Period",
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

        const tenantNetPV = beforeTaxOccupancyCost.map(
            (cost, period) => -pv(tenantDiscountRate / 1200, period, 0, cost)
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

        const ownerNetPV = occupancyOpExCommissions.map(
            (cost, period) => -pv(landlordDiscountRate / 1200, period, 0, cost)
        );

        // combine all the data into a table-friendly format
        const data = rates.map((rate, period) => {
            return [
                <Typography>
                    <Box component="span" fontWeight="bold">
                        {period}
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
        e.preventDefault();
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
                xs={3}
            />
            <Grid item xs={9}>
                {generateTable()}
            </Grid>
        </GridWrapper>
    );
};

export default DealPageBackup;
