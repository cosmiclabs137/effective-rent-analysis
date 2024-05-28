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
import { DataGrid } from "@mui/x-data-grid";

import useCalculateDeal from "../../hooks/useCalculateDeal";

import "./PGTestPage.css";

const dealFactory = (id) => ({
    id: id,
    name: `Deal ${id + 1}`,
    sqft: 0,
    term: 12,
    baseRent: 0,
    annualEscalations: 0,
    opExPerMonthPsf: 0,
    opExGrowthRate: 0,
    otherNonRecurringCost: 0,
    otherNonRecurringCostTotal: 0,
    otherRecurringCost: 0,
    recurringCostGrowthRate: 0,
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

    const calculatedDeal = useCalculateDeal(deals[dealId]);

    const columns = [
        {
            field: "month",
            headerName: "Month",
            cellClassName: "bold",
        },
        {
            field: "monthlyPayment",
            headerName: "Monthly Payment",
        },
        {
            field: "operatingExpense",
            headerName: "Operating Expenses",
        },
        {
            field: "tenantImprovementCost",
            headerName: "Tenant Improvement Cost",
        },
        {
            field: "otherNonRecurringCost",
            headerName: "Other Non-Recurring Cost",
        },
        {
            field: "otherRecurringCost",
            headerName: "Other Recurring Cost",
        },
        {
            field: "rentAbatement",
            headerName: "Rent Abatement",
        },
        {
            field: "tenantImprovementAllowance",
            headerName: "Tenant Improvement Allowances",
        },
        {
            field: "commission",
            headerName: "Commission",
        },
        {
            field: "beforeTaxOccupancyCost",
            headerName: "Before-Tax Occupancy Cost",
        },
        {
            field: "tenantNetPV",
            headerName: "Tenant Net Present Value",
        },
        {
            field: "occupancyOpExCommission",
            headerName: "Occupancy OpEx Commission",
        },
        {
            field: "ownerNetPV",
            headerName: "Owner Net Present Value",
        },
    ];

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
                        flexGrow={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
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
                            className="sticky"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 2,
                                mt: 2,
                            }}
                        >
                            <DealForm dealId={dealId} />
                        </Grid>
                        <Box
                            container="true"
                            xs={12}
                            lg={9}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                padding: 2,
                            }}
                        >
                            <div>
                                <Grid item>
                                    <DealTable
                                        rows={calculatedDeal}
                                        columns={columns}
                                    />
                                </Grid>
                            </div>
                        </Box>
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

    const handleChange = (e, key, type = "number") => {
        dispatch({
            type: "updated",
            value: type === "string" ? e.target.value : Number(e.target.value),
            key: key,
            id: dealId,
        });
    };

    const dollarAdornment = <InputAdornment position="start">$</InputAdornment>;
    const percentAdornment = <InputAdornment position="end">%</InputAdornment>;

    return (
        <React.Fragment>
            <Typography variant="h6">
                {deal?.name.length > 0 ? deal?.name : "New Deal"}
            </Typography>
            <form>
                <Collapsible
                    defaultExpanded={true}
                    id="basic-input-panel-content"
                    summary="Basic Inputs"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Deal name"
                            type="text"
                            value={deal?.name}
                            variant="standard"
                            onChange={(e) => handleChange(e, "name", "string")}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Sqft leased"
                            type="number"
                            value={deal?.sqft}
                            variant="standard"
                            onChange={(e) => handleChange(e, "sqft")}
                            inputProps={{ min: 0 }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Term (in months)"
                            type="number"
                            value={deal?.term}
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
                            value={deal?.baseRent}
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
                            value={deal?.annualEscalations}
                            onChange={(e) =>
                                handleChange(e, "annualEscalations")
                            }
                            inputProps={{ min: 0 }}
                            InputProps={{ endAdornment: percentAdornment }}
                        />
                    </FormControl>

                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Months free rent"
                            type="number"
                            value={deal?.monthsFreeRent}
                            variant="standard"
                            onChange={(e) => handleChange(e, "monthsFreeRent")}
                            inputProps={{ min: 0 }}
                        />
                    </FormControl>
                </Collapsible>

                <Collapsible
                    id="occupancy-expenses-panel-content"
                    summary="Occupancy Expenses"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Occupancy expenses (psf/mo)"
                            type="number"
                            variant="standard"
                            value={deal?.opExPerMonthPsf}
                            onChange={(e) => handleChange(e, "opExPerMonthPsf")}
                            inputProps={{ min: 0 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Occupancy expenses growth rate (%)"
                            type="number"
                            variant="standard"
                            value={deal?.opExGrowthRate}
                            onChange={(e) => handleChange(e, "opExGrowthRate")}
                            inputProps={{ min: 0 }}
                            InputProps={{ endAdornment: percentAdornment }}
                        />
                    </FormControl>
                </Collapsible>

                <Collapsible
                    id="other-costs-panel-content"
                    summary="Other Costs"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Other non-recurring cost"
                            type="number"
                            variant="standard"
                            value={deal?.otherNonRecurringCost}
                            onChange={(e) =>
                                handleChange(e, "otherNonRecurringCost")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Other non-recurring cost (total)"
                            type="number"
                            variant="standard"
                            value={deal?.otherNonRecurringCostTotal}
                            onChange={(e) =>
                                handleChange(e, "otherNonRecurringCostTotal")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Other recurring cost"
                            type="number"
                            variant="standard"
                            value={deal?.otherRecurringCost}
                            onChange={(e) =>
                                handleChange(e, "otherRecurringCost")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                        <TextField
                            label="Recurring cost growth rate"
                            helperText="In months"
                            type="number"
                            variant="standard"
                            value={deal?.recurringCostGrowthRate}
                            onChange={(e) =>
                                handleChange(e, "recurringCostGrowthRate")
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
                            value={deal?.otherRecurringCostTotal}
                            onChange={(e) =>
                                handleChange(e, "otherRecurringCostTotal")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                </Collapsible>

                <Collapsible
                    id="tenant-improvement-panel-content"
                    summary="Tenant Improvements"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Tenant improvement cost"
                            type="number"
                            variant="standard"
                            value={deal?.tenantImprovementCost}
                            onChange={(e) =>
                                handleChange(e, "tenantImprovementCost")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Tenant improvement allowance"
                            type="number"
                            variant="standard"
                            value={deal?.tenantImprovementAllowance}
                            onChange={(e) =>
                                handleChange(e, "tenantImprovementAllowance")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                </Collapsible>

                <Collapsible
                    id="tenant-improvement-panel-content"
                    summary="Discount Rates"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Tenant discount rate"
                            type="number"
                            variant="standard"
                            value={deal?.tenantDiscountRate}
                            onChange={(e) =>
                                handleChange(e, "tenantDiscountRate")
                            }
                            inputProps={{ min: 0, step: 0.1 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Lanlord discount rate"
                            type="number"
                            variant="standard"
                            value={deal?.landlordDiscountRate}
                            onChange={(e) =>
                                handleChange(e, "landlordDiscountRate")
                            }
                            inputProps={{ min: 0, step: 0.01 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                </Collapsible>

                <Collapsible
                    id="other-contribution-panel-content"
                    summary="Other Contributions"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Other non-recurring contribution (Total)"
                            type="number"
                            variant="standard"
                            value={deal?.otherNonRecurringContribution}
                            onChange={(e) =>
                                handleChange(e, "otherNonRecurringContribution")
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
                            value={deal?.otherRecurringContribution}
                            onChange={(e) =>
                                handleChange(e, "tenantImprovementAllowance")
                            }
                            inputProps={{ min: 0, step: 0.1 }}
                            InputProps={{ startAdornment: dollarAdornment }}
                        />
                    </FormControl>
                </Collapsible>

                <Collapsible
                    id="commissions-panel-content"
                    summary="Commissions"
                >
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Commission pct (yrs 1 to 5)"
                            type="number"
                            variant="standard"
                            value={deal?.commissionFirst}
                            onChange={(e) => handleChange(e, "commissionFirst")}
                            inputProps={{ min: 0, step: 0.1 }}
                            InputProps={{ endAdornment: percentAdornment }}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingTop: 2 }} fullWidth>
                        <TextField
                            label="Commission pct (yrs 6 to 10)"
                            type="number"
                            variant="standard"
                            value={deal?.commissionSecond}
                            onChange={(e) =>
                                handleChange(e, "commissionSecond")
                            }
                            inputProps={{ min: 0, step: 0.1 }}
                            InputProps={{ endAdornment: percentAdornment }}
                        />
                    </FormControl>
                </Collapsible>
            </form>
        </React.Fragment>
    );
};

const Collapsible = ({ id, summary, children, defaultExpanded = false }) => {
    return (
        <Accordion defaultExpanded={defaultExpanded}>
            <AccordionSummary
                id={id}
                aria-label={id}
                expandIcon={<ExpandMoreIcon />}
            >
                {summary}
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

const DealTable = ({
    columns,
    rows,
    style = { height: "100%", width: "100%", backgroundColor: "white" },
}) => {
    return (
        <ErrorBoundary fallback={<p>Looks like something went wrong!</p>}>
            <div style={style}>
                <DataGrid
                    density="compact"
                    columns={columns}
                    rows={rows}
                    className="MuiPaper-root"
                    sx={{ p: 1 }}
                    getRowId={(row) => row.month - 1}
                />
            </div>
        </ErrorBoundary>
    );
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}

const PGTestPage = DealsContainer;

export default PGTestPage;
