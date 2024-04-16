import React, { useState } from "react";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableViewIcon from "@mui/icons-material/TableView";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import BasicTable from "../../components/Tables/BasicTable";
import DealInputForm from "../../components/DealInputForm/DealInputForm";
// import DealTab from "../../components/DealTab/DealTab";
import Summary from "../../components/Summary/Summary";

const DealPage = () => {
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

    const [occupancyOpExCommissionsTotal, setOccupancyOpExCommissionsTotal] =
        useState(0);

    const [ownerNetPresentValue, setOwnerNetPresentValue] = useState(0);
    const [beforeTaxOccupancyCostTotal, setBeforeTaxOccupancyCostTotal] =
        useState(0);
    const [tenantNetPresentValue, setTenantNetPresentValue] = useState(0);

    const [currentTabIndex, setCurrentTabIndex] = React.useState("1");

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
        setDealTable(generateTable());
    };

    const handleTabChange = (e, tabIndex) => setCurrentTabIndex(tabIndex);

    const [dealTable, setDealTable] = useState(generateTable);

    return (
        <GridWrapper spacing={1}>
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
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={currentTabIndex}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleTabChange}
                                aria-label="deal tabs"
                            >
                                <Tab
                                    icon={<BarChartIcon />}
                                    label="Summary"
                                    value="1"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                />
                                <Tab
                                    icon={<TableViewIcon />}
                                    label="Spreadsheet"
                                    value="2"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                />
                            </TabList>
                        </Box>

                        {currentTabIndex === "1" && (
                            <TabPanel value="1">
                                <Summary
                                    tenantDeals={{
                                        rate: tenantDiscountRate / 100,
                                        term: dealTerm,
                                        totalCost: beforeTaxOccupancyCostTotal,
                                        pv: tenantNetPresentValue,
                                        sqftLeased: sqftLeased,
                                    }}
                                    ownerDeals={{
                                        rate: landlordDiscountRate / 100,
                                        term: dealTerm,
                                        totalCost:
                                            occupancyOpExCommissionsTotal,
                                        pv: ownerNetPresentValue,
                                        sqftLeased: sqftLeased,
                                    }}
                                />
                            </TabPanel>
                        )}
                        {currentTabIndex === "2" && (
                            <TabPanel value="2">
                                <Typography>Spread Sheet</Typography>
                                {dealTable}
                            </TabPanel>
                        )}
                    </TabContext>
                </Box>
            </Grid>
        </GridWrapper>
    );
};

export default DealPage;
