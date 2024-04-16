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
    commissionPercent,
    handleCommissionPercent,
    handleSubmit,
    xs = 4,
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
                        name="months-free-rent"
                        label="Months free rent"
                        helperText="The number of months with free rend"
                        type="number"
                        variant="standard"
                        value={monthsFreeRent}
                        onChange={(e) => handleMonthsFreeRent(e)}
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
                        label="Commission percent"
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
                        value={commissionPercent}
                        onChange={(e) => handleCommissionPercent(e)}
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
