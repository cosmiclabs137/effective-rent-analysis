import React from "react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControl,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const dealFactory = (id) => ({
    id: id,
    name: `Deal ${id + 1}`,
    sqft: 0,
    term: 12,
    baseRent: 0,
    annualEscalations: 0,
    opExPerMonth: 0,
    opExGrowthRate: 0,
    otherNonRecurringCost: 0,
    otherNonRecurringCostTotal: 0,
    otherRecurringCost: 0,
    otherRecurringCostTotal: 0,
    otherNonRecurringContribution: 0,
    otherRecurringContribution: 0,
    contributionGrowthRate: 0,
    monthsFreeRent: 0,
    commissionFirst: 0,
    commissionSecond: 0,
    tenantDiscountRate: 0,
    tenantImprovementCost: 0,
    tenantImprovementAllowance: 0,
    landlordDiscountRate: 0,
});

const dealsReducer = (deals, action) => {
    switch (action.type) {
        case "created": {
            const id = deals.length;
            return [...deals, dealFactory(id)];
        }
        case "deleted": {
            return deals.filter((deal) => deal.id !== action.id);
        }
        case "updated": {
            return deals.map((d) =>
                d.id === action.id
                    ? { ...deals[action.id], [action.key]: action.value }
                    : d
            );
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};

const DealsContext = React.createContext(null);
const DealsDispatchContext = React.createContext(null);

const DealsContainer = () => {
    const [deals, dispatch] = React.useReducer(dealsReducer, [dealFactory(0)]);
    const [dealId, setDealId] = React.useState(0);

    return (
        <DealsContext.Provider value={deals}>
            <DealsDispatchContext.Provider value={dispatch}>
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "#f8f8ff",
                        minHeight: "90vh",
                        padding: 5,
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                    >
                        <Grid item xs={12} marginBottom={5} marginTop={2}>
                            <Typography variant="h4" align="center">
                                Effective Rent Analysis
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            lg={2}
                            component={Paper}
                            elevation={4}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 2,
                            }}
                        >
                            <DealForm dealId={dealId} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={9}
                            component={Paper}
                            elevation={4}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                padding: 2,
                            }}
                        >
                            <Typography variant="p" align="center">
                                This is where the table will be
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </DealsDispatchContext.Provider>
        </DealsContext.Provider>
    );
};

const DealForm = ({ dealId }) => {
    const deals = React.useContext(DealsContext);
    const dispatch = React.useContext(DealsDispatchContext);
    const deal = deals.filter((deal) => deal.id === dealId)[0];

    const handleChange = (e, key) => {
        dispatch({
            type: "updated",
            value: e.target.value,
            key: key,
            id: dealId,
        });
    };

    const dollarAdornment = <InputAdornment position="start">$</InputAdornment>;
    const percentAdornment = <InputAdornment>%</InputAdornment>;

    return (
        <React.Fragment>
            <Typography variant="h6">
                {deal?.name.length > 0 ? deal?.name : "New Deal"}
            </Typography>
            <form>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        id="basic-input-panel-content"
                        aria-label="basic-input-panel-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Basic Inputs
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Deal name"
                                type="text"
                                value={deal.name}
                                variant="standard"
                                onChange={(e) => handleChange(e, "name")}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Sqft leased"
                                type="number"
                                value={deal.sqft}
                                variant="standard"
                                onChange={(e) => handleChange(e, "sqft")}
                                inputProps={{ min: 0 }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Term (in months)"
                                type="number"
                                value={deal.term}
                                variant="standard"
                                onChange={(e) => handleChange(e, "term")}
                                inputProps={{ min: 0 }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Base rent"
                                type="number"
                                variant="standard"
                                value={deal.baseRent}
                                onChange={(e) => handleChange(e, "baseRent")}
                                inputProps={{ min: 0, step: 0.01 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Annual escalations"
                                type="number"
                                variant="standard"
                                value={deal.annualEscalations}
                                onChange={(e) =>
                                    handleChange(e, "annualEscalations")
                                }
                                inputProps={{ min: 0 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>

                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Months free rent"
                                type="number"
                                value={deal.monthsFreeRent}
                                variant="standard"
                                onChange={(e) =>
                                    handleChange(e, "monthsFreeRent")
                                }
                                inputProps={{ min: 0 }}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        id="occupancy-expenses-panel-content"
                        aria-label="occupancy-expenses-panel-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Occupancy Expenses
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Occupancy expenses (psf/mo)"
                                type="number"
                                variant="standard"
                                value={deal.opExPerMonth}
                                onChange={(e) =>
                                    handleChange(e, "opExPerMonth")
                                }
                                inputProps={{ min: 0 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Occupancy expenses growth rate (%)"
                                type="number"
                                variant="standard"
                                value={deal.opExGrowthRate}
                                onChange={(e) =>
                                    handleChange(e, "opExGrowthRate")
                                }
                                inputProps={{ min: 0 }}
                                InputProps={{ endAdornment: percentAdornment }}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        id="other-costs-panel-content"
                        aria-label="other-costs-panel-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Other Costs
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Other non-recurring cost"
                                type="number"
                                variant="standard"
                                value={deal.otherNonRecurringCost}
                                onChange={(e) =>
                                    handleChange(e, "otherNonRecurringCost")
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>

                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Other non-recurring cost (total)"
                                type="number"
                                variant="standard"
                                value={deal.otherNonRecurringCostTotal}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        "otherNonRecurringCostTotal"
                                    )
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Other recurring cost"
                                type="number"
                                variant="standard"
                                value={deal.otherRecurringCost}
                                onChange={(e) =>
                                    handleChange(e, "otherRecurringCost")
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Other recurring cost (total)"
                                type="number"
                                variant="standard"
                                value={deal.otherRecurringCostTotal}
                                onChange={(e) =>
                                    handleChange(e, "otherRecurringCostTotal")
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        id="tenant-improvement-panel-content"
                        aria-label="tenant-improvement-panel-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Tenant Improvements
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Tenant improvement cost"
                                type="number"
                                variant="standard"
                                value={deal.tenantImprovementCost}
                                onChange={(e) =>
                                    handleChange(e, "tenantImprovementCost")
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Tenant improvement allowance"
                                type="number"
                                variant="standard"
                                value={deal.tenantImprovementAllowance}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        "tenantImprovementAllowance"
                                    )
                                }
                                inputProps={{ min: 0, step: 0.01 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        id="other-contribution-panel-content"
                        aria-label="other-contribution-panel-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Other Contributions
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Other non-recurring contribution (Total)"
                                type="number"
                                variant="standard"
                                value={deal.otherNonRecurringContribution}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        "otherNonRecurringContribution"
                                    )
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Other recurring contribution (Total)"
                                type="number"
                                variant="standard"
                                value={deal.otherRecurringContribution}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        "tenantImprovementAllowance"
                                    )
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ startAdornment: dollarAdornment }}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        id="commissions-panel-content"
                        aria-label="commissions-panel-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        Comissions
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Commission pct (yrs 1 to 5)"
                                type="number"
                                variant="standard"
                                value={deal.commissionFirst}
                                onChange={(e) =>
                                    handleChange(e, "commissionFirst")
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ endAdornment: percentAdornment }}
                            />
                        </FormControl>
                        <FormControl sx={{ paddingTop: 2 }} fullWidth>
                            <TextField
                                label="Commission pct (yrs 6 to 10)"
                                type="number"
                                variant="standard"
                                value={deal.commissionSecond}
                                onChange={(e) =>
                                    handleChange(e, "commissionSecond")
                                }
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{ endAdornment: percentAdornment }}
                            />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </form>
        </React.Fragment>
    );
};

const PGTestPage = DealsContainer;

export default PGTestPage;
