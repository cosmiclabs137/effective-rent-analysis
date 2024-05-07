import React, { useState } from "react";

import { Box, Grid, Tab } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableViewIcon from "@mui/icons-material/TableView";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import Deal from "../../components/Deal/Deal";
import Summary from "../../components/Summary/Summary";

const DealPage = () => {
    const [deal1Name, setDeal1Name] = useState("Deal");
    const [deal2Name, setDeal2Name] = useState("");
    const [deal3Name, setDeal3Name] = useState("");

    const [deal1SqftLeased, setDeal1SqftLeased] = useState(2794);
    const [deal2SqftLeased, setDeal2SqftLeased] = useState(0);
    const [deal3SqftLeased, setDeal3SqftLeased] = useState(0);

    const [deal1Term, setDeal1Term] = useState(65); // is this standard
    const [deal2Term, setDeal2Term] = useState(12); // is this standard
    const [deal3Term, setDeal3Term] = useState(12); // is this standard,

    const [deal1BaseRent, setDeal1BaseRent] = useState(3.45);
    const [deal2BaseRent, setDeal2BaseRent] = useState(0);
    const [deal3BaseRent, setDeal3BaseRent] = useState(0);

    const [deal1AnnualEscalations, setDeal1AnnualEscalations] = useState(3);
    const [deal2AnnualEscalations, setDeal2AnnualEscalations] = useState(0);
    const [deal3AnnualEscalations, setDeal3AnnualEscalations] = useState(0);

    const [deal1OccupancyExpensesPsf, setDeal1OccupancyExpensesPsf] =
        useState(0);
    const [deal2OccupancyExpensesPsf, setDeal2OccupancyExpensesPsf] =
        useState(0);
    const [deal3OccupancyExpensesPsf, setDeal3OccupancyExpensesPsf] =
        useState(0);

    const [deal1GrowthRateInOpEx, setDeal1GrowthRateInOpEx] = useState(0);
    const [deal2GrowthRateInOpEx, setDeal2GrowthRateInOpEx] = useState(0);
    const [deal3GrowthRateInOpEx, setDeal3GrowthRateInOpEx] = useState(0);

    const [deal1OtherRecurringCost, deal1SetOtherRecurringCost] = useState(0);
    const [deal2OtherRecurringCost, deal2SetOtherRecurringCost] = useState(0);
    const [deal3OtherRecurringCost, deal3SetOtherRecurringCost] = useState(0);

    const [deal1OtherNonRecurringCost, deal1SetOtherNonRecurringCost] =
        useState(0);
    const [deal2OtherNonRecurringCost, deal2SetOtherNonRecurringCost] =
        useState(0);
    const [deal3OtherNonRecurringCost, deal3SetOtherNonRecurringCost] =
        useState(0);

    const [deal1RecurringCostGrowthRate, setDeal1RecurringCostGrowthRate] =
        useState(0);
    const [deal2RecurringCostGrowthRate, setDeal2RecurringCostGrowthRate] =
        useState(0);
    const [deal3RecurringCostGrowthRate, setDeal3RecurringCostGrowthRate] =
        useState(0);

    const [deal1TenantImprovementCost, setDeal1TenantImprovementCost] =
        useState(0);
    const [deal2TenantImprovementCost, setDeal2TenantImprovementCost] =
        useState(0);
    const [deal3TenantImprovementCost, setDeal3TenantImprovementCost] =
        useState(0);

    const [
        deal1TenantImprovementAllowance,
        setDeal1TenantImprovementAllowance,
    ] = useState(0);
    const [
        deal2TenantImprovementAllowance,
        setDeal2TenantImprovementAllowance,
    ] = useState(0);
    const [
        deal3TenantImprovementAllowance,
        setDeal3TenantImprovementAllowance,
    ] = useState(0);

    const [
        deal1OtherNonRecurringContribution,
        setDeal1OtherNonRecurringContribution,
    ] = useState(0);
    const [
        deal2OtherNonRecurringContribution,
        setDeal2OtherNonRecurringContribution,
    ] = useState(0);
    const [
        deal3OtherNonRecurringContribution,
        setDeal3OtherNonRecurringContribution,
    ] = useState(0);

    const [
        deal1OtherRecurringContribution,
        setDeal1OtherRecurringContribution,
    ] = useState(0);
    const [
        deal2OtherRecurringContribution,
        setDeal2OtherRecurringContribution,
    ] = useState(0);
    const [
        deal3OtherRecurringContribution,
        setDeal3OtherRecurringContribution,
    ] = useState(0);

    const [deal1ContributionGrowthRate, setDeal1ContributionGrowthRate] =
        useState(0);
    const [deal2ContributionGrowthRate, setDeal2ContributionGrowthRate] =
        useState(0);
    const [deal3ContributionGrowthRate, setDeal3ContributionGrowthRate] =
        useState(0);

    const [deal1TenantDiscountRate, setDeal1TenantDiscountRate] = useState(7);
    const [deal2TenantDiscountRate, setDeal2TenantDiscountRate] = useState(0);
    const [deal3TenantDiscountRate, setDeal3TenantDiscountRate] = useState(0);

    const [deal1LandlordDiscountRate, setDeal1LandlordDiscountRate] =
        useState(5);
    const [deal2LandlordDiscountRate, setDeal2LandlordDiscountRate] =
        useState(0);
    const [deal3LandlordDiscountRate, setDeal3LandlordDiscountRate] =
        useState(0);

    const [
        deal1OccupancyOpExCommissionsTotal,
        setDeal1OccupancyOpExCommissionsTotal,
    ] = useState(0);
    const [
        deal2OccupancyOpExCommissionsTotal,
        setDeal2OccupancyOpExCommissionsTotal,
    ] = useState(0);
    const [
        deal3OccupancyOpExCommissionsTotal,
        setDeal3OccupancyOpExCommissionsTotal,
    ] = useState(0);

    const [deal1OwnerNetPresentValue, setDeal1OwnerNetPresentValue] =
        useState(0);
    const [deal2OwnerNetPresentValue, setDeal2OwnerNetPresentValue] =
        useState(0);
    const [deal3OwnerNetPresentValue, setDeal3OwnerNetPresentValue] =
        useState(0);

    const [
        deal1BeforeTaxOccupancyCostTotal,
        setDeal1BeforeTaxOccupancyCostTotal,
    ] = useState(0);
    const [
        deal2BeforeTaxOccupancyCostTotal,
        setDeal2BeforeTaxOccupancyCostTotal,
    ] = useState(0);
    const [
        deal3BeforeTaxOccupancyCostTotal,
        setDeal3BeforeTaxOccupancyCostTotal,
    ] = useState(0);

    const [deal1TenantNetPresentValue, setDeal1TenantNetPresentValue] =
        useState(0);
    const [deal2TenantNetPresentValue, setDeal2TenantNetPresentValue] =
        useState(0);
    const [deal3TenantNetPresentValue, setDeal3TenantNetPresentValue] =
        useState(0);

    const [deal1Monthsfree, setDeal1MonthsFree] = useState(5);
    const [deal2Monthsfree, setDeal2MonthsFree] = useState(0);
    const [deal3Monthsfree, setDeal3MonthsFree] = useState(0);

    const [deal1CommissionPercent1st, setDeal1CommissionPercent1st] =
        useState(4);
    const [deal2CommissionPercent1st, setDeal2CommissionPercent1st] =
        useState(0);
    const [deal3CommissionPercent1st, setDeal3CommissionPercent1st] =
        useState(0);

    const [deal1CommissionPercent2nd, setDeal1CommissionPercent2nd] =
        useState(4);
    const [deal2CommissionPercent2nd, setDeal2CommissionPercent2nd] =
        useState(0);
    const [deal3CommissionPercent2nd, setDeal3CommissionPercent2nd] =
        useState(0);

    const [currentTabIndex, setCurrentTabIndex] = React.useState("1");

    const handleTabChange = (e, tabIndex) => setCurrentTabIndex(tabIndex);

    return (
        <GridWrapper spacing={1}>
            <Grid item xs={12}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={currentTabIndex}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleTabChange}
                                aria-label="deal tabs"
                                centered
                            >
                                <Tab
                                    icon={<TableViewIcon />}
                                    label={
                                        deal1Name !== ""
                                            ? deal1Name
                                            : "Untitled Deal 1"
                                    }
                                    value="1"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                    key={1}
                                />
                                <Tab
                                    icon={<TableViewIcon />}
                                    label={
                                        deal2Name !== ""
                                            ? deal2Name
                                            : "Untitled Deal 2"
                                    }
                                    value="2"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                    key={2}
                                />
                                <Tab
                                    icon={<TableViewIcon />}
                                    label={
                                        deal3Name !== ""
                                            ? deal3Name
                                            : "Untitled Deal 3"
                                    }
                                    value="3"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                    key={3}
                                />
                                <Tab
                                    icon={<BarChartIcon />}
                                    label="Summary"
                                    value="4"
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                    key={4}
                                />
                            </TabList>
                        </Box>

                        {currentTabIndex === "1" && (
                            <TabPanel value="1">
                                <Deal
                                    tenantDiscountRate={deal1TenantDiscountRate}
                                    dealName={deal1Name}
                                    dealTerm={deal1Term}
                                    setDealTerm={setDeal1Term}
                                    sqftLeased={deal1SqftLeased}
                                    setSqftLeased={setDeal1SqftLeased}
                                    setBeforeTaxOccupancyCostTotal={
                                        setDeal1BeforeTaxOccupancyCostTotal
                                    }
                                    setTenantNetPresentValue={
                                        setDeal1TenantNetPresentValue
                                    }
                                    setDealName={setDeal1Name}
                                    setOccupancyOpExCommissionsTotal={
                                        setDeal1OccupancyOpExCommissionsTotal
                                    }
                                    setOwnerNetPresentValue={
                                        setDeal1OwnerNetPresentValue
                                    }
                                    landlordDiscountRate={
                                        deal1LandlordDiscountRate
                                    }
                                    setLandlordDiscountRate={
                                        setDeal1LandlordDiscountRate
                                    }
                                    monthsFreeRent={deal1Monthsfree}
                                    setMonthsFreeRent={setDeal1MonthsFree}
                                    commissionPercent={
                                        deal1CommissionPercent1st
                                    }
                                    setCommissionPercent={
                                        setDeal1CommissionPercent1st
                                    }
                                    baseRent={deal1BaseRent}
                                    setBaseRent={setDeal1BaseRent}
                                    annualEscalations={deal1AnnualEscalations}
                                    setAnnualEscalations={
                                        setDeal1AnnualEscalations
                                    }
                                    occupancyExpensesPsf={
                                        deal1OccupancyExpensesPsf
                                    }
                                    setOccupancyExpensesPsf={
                                        setDeal1OccupancyExpensesPsf
                                    }
                                    setTenantDiscountRate={
                                        setDeal1TenantDiscountRate
                                    }
                                />
                            </TabPanel>
                        )}

                        {currentTabIndex === "2" && (
                            <TabPanel value="2">
                                <Deal
                                    tenantDiscountRate={deal2TenantDiscountRate}
                                    dealName={deal2Name}
                                    dealTerm={deal2Term}
                                    setDealTerm={setDeal2Term}
                                    sqftLeased={deal2SqftLeased}
                                    setSqftLeased={setDeal2SqftLeased}
                                    setBeforeTaxOccupancyCostTotal={
                                        setDeal2BeforeTaxOccupancyCostTotal
                                    }
                                    setTenantNetPresentValue={
                                        setDeal2TenantNetPresentValue
                                    }
                                    setDealName={setDeal2Name}
                                    setOccupancyOpExCommissionsTotal={
                                        setDeal2OccupancyOpExCommissionsTotal
                                    }
                                    setOwnerNetPresentValue={
                                        setDeal2OwnerNetPresentValue
                                    }
                                    landlordDiscountRate={
                                        deal2LandlordDiscountRate
                                    }
                                    setLandlordDiscountRate={
                                        setDeal2LandlordDiscountRate
                                    }
                                    monthsFreeRent={deal2Monthsfree}
                                    setMonthsFreeRent={setDeal2MonthsFree}
                                    commissionPercent={
                                        deal2CommissionPercent1st
                                    }
                                    setCommissionPercent={
                                        setDeal2CommissionPercent1st
                                    }
                                    baseRent={deal2BaseRent}
                                    setBaseRent={setDeal2BaseRent}
                                    annualEscalations={deal2AnnualEscalations}
                                    setAnnualEscalations={
                                        setDeal2AnnualEscalations
                                    }
                                    occupancyExpensesPsf={
                                        deal2OccupancyExpensesPsf
                                    }
                                    setOccupancyExpensesPsf={
                                        setDeal2OccupancyExpensesPsf
                                    }
                                    setTenantDiscountRate={
                                        setDeal2TenantDiscountRate
                                    }
                                />
                            </TabPanel>
                        )}

                        {currentTabIndex === "3" && (
                            <TabPanel value="3">
                                <Deal
                                    tenantDiscountRate={deal3TenantDiscountRate}
                                    dealName={deal3Name}
                                    dealTerm={deal3Term}
                                    setDealTerm={setDeal3Term}
                                    sqftLeased={deal3SqftLeased}
                                    setSqftLeased={setDeal3SqftLeased}
                                    setBeforeTaxOccupancyCostTotal={
                                        setDeal3BeforeTaxOccupancyCostTotal
                                    }
                                    setTenantNetPresentValue={
                                        setDeal3TenantNetPresentValue
                                    }
                                    setDealName={setDeal3Name}
                                    setOccupancyOpExCommissionsTotal={
                                        setDeal3OccupancyOpExCommissionsTotal
                                    }
                                    setOwnerNetPresentValue={
                                        setDeal3OwnerNetPresentValue
                                    }
                                    landlordDiscountRate={
                                        deal3LandlordDiscountRate
                                    }
                                    setLandlordDiscountRate={
                                        setDeal3LandlordDiscountRate
                                    }
                                    monthsFreeRent={deal3Monthsfree}
                                    setMonthsFreeRent={setDeal3MonthsFree}
                                    commissionPercent={
                                        deal3CommissionPercent1st
                                    }
                                    setCommissionPercent={
                                        setDeal3CommissionPercent1st
                                    }
                                    baseRent={deal3BaseRent}
                                    setBaseRent={setDeal3BaseRent}
                                    annualEscalations={deal3AnnualEscalations}
                                    setAnnualEscalations={
                                        setDeal3AnnualEscalations
                                    }
                                    occupancyExpensesPsf={
                                        deal3OccupancyExpensesPsf
                                    }
                                    setOccupancyExpensesPsf={
                                        setDeal3OccupancyExpensesPsf
                                    }
                                    setTenantDiscountRate={
                                        setDeal3TenantDiscountRate
                                    }
                                />
                            </TabPanel>
                        )}

                        {currentTabIndex === "4" && (
                            <TabPanel value="4">
                                <Summary
                                    tenantDeals={[
                                        {
                                            name: deal1Name,
                                            rate: deal1TenantDiscountRate / 100,
                                            term: deal1Term,
                                            totalCost:
                                                deal1BeforeTaxOccupancyCostTotal,
                                            pv: deal1TenantNetPresentValue,
                                            sqftLeased: deal1SqftLeased,
                                        },
                                        {
                                            name: deal2Name,
                                            rate: deal2TenantDiscountRate / 100,
                                            term: deal2Term,
                                            totalCost:
                                                deal2BeforeTaxOccupancyCostTotal,
                                            pv: deal2TenantNetPresentValue,
                                            sqftLeased: deal2SqftLeased,
                                        },
                                        {
                                            name: deal3Name,
                                            rate: deal3TenantDiscountRate / 100,
                                            term: deal3Term,
                                            totalCost:
                                                deal3BeforeTaxOccupancyCostTotal,
                                            pv: deal3TenantNetPresentValue,
                                            sqftLeased: deal3SqftLeased,
                                        },
                                    ]}
                                    ownerDeals={[
                                        {
                                            name: deal1Name,
                                            rate:
                                                deal1LandlordDiscountRate / 100,
                                            term: deal1Term,
                                            totalCost:
                                                deal1OccupancyOpExCommissionsTotal,
                                            pv: deal1OwnerNetPresentValue,
                                            sqftLeased: deal1SqftLeased,
                                        },
                                        {
                                            name: deal2Name,
                                            rate:
                                                deal2LandlordDiscountRate / 100,
                                            term: deal2Term,
                                            totalCost:
                                                deal2OccupancyOpExCommissionsTotal,
                                            pv: deal2OwnerNetPresentValue,
                                            sqftLeased: deal2SqftLeased,
                                        },
                                        {
                                            name: deal3Name,
                                            rate:
                                                deal3LandlordDiscountRate / 100,
                                            term: deal3Term,
                                            totalCost:
                                                deal3OccupancyOpExCommissionsTotal,
                                            pv: deal3OwnerNetPresentValue,
                                            sqftLeased: deal3SqftLeased,
                                        },
                                    ]}
                                />
                            </TabPanel>
                        )}
                    </TabContext>
                </Box>
            </Grid>
        </GridWrapper>
    );
};

export default DealPage;
