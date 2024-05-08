import React from "react";

import {
    Button,
    FormControl,
    Grid,
    InputAdornment,
    TextField,
} from "@mui/material";

const DealInputForm = ({
    dealName,
    handleDealName,
    sqftLeased,
    handlesqftLeased,
    dealTerm,
    handleDealTerm,
    baseRent,
    handleBaseRent,
    annualEscalations,
    handleAnnualEscalations,
    occupancyExpensesPsf,
    handleOccupancyExpensesPsf,
    monthsFreeRent,
    handleMonthsFreeRent,
    tenantDiscountRate,
    handleTenantDiscountRate,
    landlordDiscountRate,
    handleLandlordDiscountRate,
    commissionPercent1st,
    handleCommissionPercent1st,
    growthRateInOpEx,
    handleGrowthRateInOpEx,
    otherRecurringCost,
    handleOtherRecurringCost,
    otherNonRecurringCost,
    handleOtherNonRecurringCost,
    recurringCostGrowthRate,
    handleRecurringCostGrowthRate,
    tenantImprovementCost,
    handleTenantImprovementCost,
    tenantImprovementAllowance,
    handleTenantImprovementAllowance,
    otherNonRecurringContribution,
    handleOtherNonRecurringContribution,
    otherRecurringContribution,
    handleOtherRecurringContribution,
    contributionGrowthRate,
    handleContributionGrowthRate,
    commissionPercent2nd,
    handleCommissionPercent2nd,
    handleSubmit,
    xs = 3,
}) => {
    return (
        <Grid item xs={xs}>
            <form action="" method="post" className="basic-table">
                <FormControl>
                    <TextField
                        name="deal-name"
                        label="Name of deal"
                        helperText="Enter a unique name for the deal"
                        variant="standard"
                        value={dealName}
                        onChange={(e) => handleDealName(e)}
                    />
                    <TextField
                        name="sqft-leased"
                        label="SQFT leased"
                        helperText="The number of square feet leased"
                        type="number"
                        variant="standard"
                        value={sqftLeased}
                        onChange={(e) => handlesqftLeased(e)}
                    />
                    <TextField
                        name="term"
                        label="Term (in months)"
                        helperText="Enter the term (in months)"
                        type="number"
                        variant="standard"
                        value={dealTerm}
                        onChange={(e) => handleDealTerm(e)}
                    />
                    <TextField
                        name="base-rent-psf"
                        label="Base rent PSF/month"
                        helperText="The dollar amount per SQFT per month"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={baseRent}
                        onChange={(e) => handleBaseRent(e)}
                    />
                    <TextField
                        name="annual-escalations"
                        label="Annual escalations"
                        helperText="The percentage that the rent is increased per year"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={annualEscalations}
                        onChange={(e) => handleAnnualEscalations(e)}
                    />
                    <TextField
                        name="occupancy-expenses-psf"
                        label="Occupancy expenses PSF/month"
                        helperText="The dollar amount per SQFT per month"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={occupancyExpensesPsf}
                        onChange={(e) => handleOccupancyExpensesPsf(e)}
                    />
                    <TextField
                        name="growth-rate-in-opex"
                        label="Growth rate in OpEx (%)"
                        helperText="Growth rate in operating expenses (%)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={growthRateInOpEx}
                        onChange={(e) => handleGrowthRateInOpEx(e)}
                    />
                    <TextField
                        name="other-non-recurring-cost"
                        label="Other Non-Recurring Cost"
                        helperText="Other Non-Recurring Cost ($)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={otherNonRecurringCost}
                        onChange={(e) => handleOtherNonRecurringCost(e)}
                    />
                    <TextField
                        name="other-recurring-cost"
                        label="Other Recurring Cost (Total)"
                        helperText="Other Recurring Cost ($)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={otherRecurringCost}
                        onChange={(e) => handleOtherRecurringCost(e)}
                    />
                    <TextField
                        name="recurring-cost-growth-rate"
                        label="Recurring Cost Growth Rate"
                        helperText="Recurring Cost Growth Rate (%)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={recurringCostGrowthRate}
                        onChange={(e) => handleRecurringCostGrowthRate(e)}
                    />
                    <TextField
                        name="tenant-improvement-cost"
                        label="Tenant Improvement Cost"
                        helperText="Tenant Improvement Cost ($)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={tenantImprovementCost}
                        onChange={(e) => handleTenantImprovementCost(e)}
                    />
                    <TextField
                        name="tenant-improvement-allowance"
                        label="Tenant Improvement Allowance"
                        helperText="Tenant Improvement Allowance ($)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={tenantImprovementAllowance}
                        onChange={(e) => handleTenantImprovementAllowance(e)}
                    />
                    <TextField
                        name="months-free-rent"
                        label="Months free rent"
                        helperText="The number of months with free rent"
                        type="number"
                        variant="standard"
                        value={monthsFreeRent}
                        onChange={(e) => handleMonthsFreeRent(e)}
                    />
                    <TextField
                        name="other-non-recurring-contribution"
                        label="Other Non-Recurring Contribution (Total)"
                        helperText="Other Non-Recurring Contribution ($)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={otherNonRecurringContribution}
                        onChange={(e) => handleOtherNonRecurringContribution(e)}
                    />
                    <TextField
                        name="other-recurring-contribution"
                        label="Other Recurring Contribution (Total)"
                        helperText="Other Recurring Contribution ($)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        value={otherRecurringContribution}
                        onChange={(e) => handleOtherRecurringContribution(e)}
                    />
                    <TextField
                        name="contribution-growth-rate"
                        label="Contribution Growth Rate"
                        helperText="Contribution growth rate (percentage)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={contributionGrowthRate}
                        onChange={(e) => handleContributionGrowthRate(e)}
                    />
                    <TextField
                        name="tenant-discount-rate"
                        label="Tenant discount rate"
                        helperText="Tenant discount rate (percentage)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={tenantDiscountRate}
                        onChange={(e) => handleTenantDiscountRate(e)}
                    />
                    <TextField
                        name="landlord-discount-rate"
                        label="Landlord discount rate"
                        helperText="Landlord discount rate (percentage)"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={landlordDiscountRate}
                        onChange={(e) => handleLandlordDiscountRate(e)}
                    />
                    <TextField
                        name="commission-percent"
                        label="Commission percent (Years  1 - 5)"
                        helperText="The commission percent"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={commissionPercent1st}
                        onChange={(e) => handleCommissionPercent1st(e)}
                    />
                    <TextField
                        name="commission-percent"
                        label="Commission percent (Years  6 - 10)"
                        helperText="The commission percent"
                        type="number"
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        value={commissionPercent2nd}
                        onChange={(e) => handleCommissionPercent2nd(e)}
                    />
                    <Button
                        variant="contained"
                        sx={{ margin: "1em" }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
        </Grid>
    );
};

export default DealInputForm;
