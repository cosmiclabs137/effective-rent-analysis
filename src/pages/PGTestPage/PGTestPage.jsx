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
    Tooltip,
    Typography,
    styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";

import useCalculateDeal from "../../hooks/useCalculateDeal";

import "./PGTestPage.css";

const dealFactory = (id) => ({
    id: id,
    name: `Deal ${id + 1}`,
    sqft: 2794,
    term: 65,
    baseRent: 3.45,
    annualEscalations: 3,
    opExPerMonthRsf: 0,
    globalInflation: 0,
    otherOneTimeLandlordCost: 0,
    otherOneTimeTenantCost: 0,
    otherMonthlyLandlordCost: 0,
    otherMonthlyTenantCost: 0,
    monthsFreeRent: 5,
    commissionFirst: 4,
    commissionSecond: 0,
    tenantDiscountRate: 7,
    tiCostPerRsf: 0,
    tiAllowancePerRsf: 0,
    landlordDiscountRate: 5,
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
    // const [dealId, setDealId] = React.useState(0);
    const dealId = 0;

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
            field: "opExPerMonthRsf",
            headerName: "Operating Expenses",
        },
        {
            field: "tiCostPerRsf",
            headerName: "Tenant Improvement Cost",
        },
        {
            field: "otherOneTimeLandlordCost",
            headerName: "Other Non-Recurring Cost",
        },
        {
            field: "otherMonthlyTenantCost",
            headerName: "Other Monthly Tenant Cost",
        },
        {
            field: "rentAbatement",
            headerName: "Rent Abatement",
        },
        {
            field: "tiAllowancePerRsf",
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

const dollarAdornment = <InputAdornment position="start">$</InputAdornment>;
const percentAdornment = <InputAdornment position="end">%</InputAdornment>;

const DealForm = ({ dealId }) => {
    const deals = React.useContext(DealsContext);
    const dispatch = React.useContext(DealsDispatchContext);
    const deal = deals.filter((deal) => deal.id === dealId)[0];

    const handleChange = (e, key, type = "number") => {
        const value = e.target.value;

        dispatch({
            type: "updated",
            value: type === "string" ? value : Number(value),
            key: key,
            id: dealId,
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h6">
                {deal?.name.length > 0 ? deal?.name : "New Deal"}
            </Typography>
            <form>
                <BasicInputs deal={deal} handleChange={handleChange} />
                <ConcessionsInputs deal={deal} handleChange={handleChange} />
                <OtherInputs deal={deal} handleChange={handleChange} />
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

const InputWithToolTip = ({
    value,
    handleChange,
    label,
    title,
    adornment,
    type = "number",
    variant = "standard",
    inputProps = { min: 0, step: 0.01 },
    placement = "top",
    sx = { paddingTop: 2 },
    describeChild = true,
}) => {
    return (
        <Tooltip
            title={title}
            placement={placement}
            describeChild={describeChild}
        >
            <FormControl sx={sx} fullWidth>
                <TextField
                    label={label}
                    type={type}
                    variant={variant}
                    value={value}
                    onChange={handleChange}
                    inputProps={inputProps}
                    InputProps={adornment}
                />
            </FormControl>
        </Tooltip>
    );
};

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-main": {
        // remove overflow hidden overwise sticky does not work
        overflow: "unset",
    },
    "& .MuiDataGrid-columnHeaders": {
        position: "sticky",
        // backgroundColor: "white",
        zIndex: 1,
        top: 62,
    },
    "& .MuiDataGrid-virtualScroller": {
        // remove the space left for the header
        marginTop: "0!important",
    },
}));

const DealTable = ({
    columns,
    rows,
    style = { minHeight: 300, width: "100%", backgroundColor: "white" },
}) => {
    return (
        <ErrorBoundary fallback={<p>Looks like something went wrong!</p>}>
            <div style={style}>
                <StyledDataGrid
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

const BasicInputs = ({ deal, handleChange }) => {
    return (
        <Collapsible
            defaultExpanded={true}
            id="basic-input-panel-content"
            summary="Basic Inputs"
        >
            <InputWithToolTip
                label="Deal name"
                type="text"
                value={deal?.name}
                handleChange={(e) => handleChange(e, "name", "string")}
                title="Include a name for the deal or stage of negotiation for easy tracking."
            />
            <InputWithToolTip
                label="Base rent (RSF/month)"
                value={deal?.sqft}
                handleChange={(e) => handleChange(e, "sqft")}
                inputProps={{ min: 0 }}
                title="The number of rentable square feet leased."
            />
            <InputWithToolTip
                label="Term (months)"
                value={deal?.term}
                handleChange={(e) => handleChange(e, "term")}
                inputProps={{ min: 0 }}
                title="Total number of months of the initial term—not including option periods."
            />
            <InputWithToolTip
                label="Base rent (RSF/month)"
                value={deal?.baseRent}
                handleChange={(e) => handleChange(e, "baseRent")}
                adornment={{ startAdornment: dollarAdornment }}
                title="The dollar amount per rentable square foot per month."
            />
            <InputWithToolTip
                label="Annual escalations"
                value={deal?.annualEscalations}
                handleChange={(e) => handleChange(e, "annualEscalations")}
                inputProps={{ min: 0 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percentage that the rent is increased per year."
            />
            <InputWithToolTip
                label="Occupancy expenses (RSF/month)"
                value={deal?.opExPerMonthRsf}
                handleChange={(e) => handleChange(e, "opExPerMonthRsf")}
                inputProps={{ min: 0 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Tenant's monthly share of operating expenses per rentable square foot."
            />
        </Collapsible>
    );
};

const ConcessionsInputs = ({ deal, handleChange }) => {
    return (
        <Collapsible id="concessions-panel-content" summary="Concessions">
            <InputWithToolTip
                label="Other one-time tenant cost."
                value={deal?.otherOneTimeTenantCost}
                handleChange={(e) => handleChange(e, "otherOneTimeTenantCost")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another one-time cost for tenant to be paid up front (e.g., key money)."
            />
            <InputWithToolTip
                label="Other monthly tenant cost"
                value={deal?.otherMonthlyTenantCost}
                handleChange={(e) => handleChange(e, "otherMonthlyTenantCost")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another monthly cost for tenant (e.g., parking)."
            />
            <InputWithToolTip
                label="Other one-time landlord cost"
                value={deal?.otherOneTimeLandlordCost}
                handleChange={(e) =>
                    handleChange(e, "otherOneTimeLandlordCost")
                }
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another one-time cost for landlord to be paid up front (e.g., lease buyout)."
            />

            <InputWithToolTip
                label="Other monthly landlord cost"
                type="number"
                variant="standard"
                value={deal?.otherMonthlyLandlordCost}
                handleChange={(e) =>
                    handleChange(e, "otherMonthlyLandlordCost")
                }
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another monthly cost for landlord (e.g., parking discount)."
            />

            <InputWithToolTip
                label="TI cost per RSF"
                value={deal?.tiCostPerRsf}
                handleChange={(e) => handleChange(e, "tiCostPerRsf")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title=""
            />
            <InputWithToolTip
                label="TI allowance per RSF"
                value={deal?.tiAllowancePerRsf}
                handleChange={(e) => handleChange(e, "tiAllowancePerRsf")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title=""
            />
        </Collapsible>
    );
};

const OtherInputs = ({ deal, handleChange }) => {
    return (
        <Collapsible id="other-panel-content" summary="Other">
            <InputWithToolTip
                label="Tenant discount rate"
                value={deal?.tenantDiscountRate}
                handleChange={(e) => handleChange(e, "tenantDiscountRate")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percentage rate the tenant would be charged on an unsecured loan."
            />
            <InputWithToolTip
                label="Lanlord discount rate"
                value={deal?.landlordDiscountRate}
                handleChange={(e) => handleChange(e, "landlordDiscountRate")}
                inputProps={{ min: 0, step: 0.1 }}
                InputProps={{ endAdornment: percentAdornment }}
                title="The return percent the landlord would make on an alternate investment."
            />
            <InputWithToolTip
                label="Commission percent (months 1 to 60)"
                value={deal?.commissionFirst}
                handleChange={(e) => handleChange(e, "commissionFirst")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percent of the landlord's commission costs for the first 60 months."
            />
            <InputWithToolTip
                label="Commission pct (months 61+)"
                value={deal?.commissionSecond}
                handleChange={(e) => handleChange(e, "commissionSecond")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percent of the landlord's commission costs from month 61 onward."
            />
        </Collapsible>
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
