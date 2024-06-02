import Collapsible from "../common/Collapsible/Collapsible";
import InputWithTooltip from "../Inputs/InputWithTooltip";

import { dollarAdornment, percentAdornment } from "../../constants";

const BasicInputs = ({ deal, handleChange, disabled }) => {
    return (
        <Collapsible
            defaultExpanded={true}
            id="basic-input-panel-content"
            summary="Basic Inputs"
        >
            <InputWithTooltip
                label="Deal name"
                type="text"
                value={deal?.name}
                handleChange={(e) => handleChange(e, "name", "string")}
                title="Include a name for the deal or stage of negotiation for easy tracking."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Base rent (RSF/month)"
                value={deal?.sqft}
                handleChange={(e) => handleChange(e, "sqft")}
                inputProps={{ min: 0, step: 1 }}
                title="The number of rentable square feet leased."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Term (months)"
                value={deal?.term}
                handleChange={(e) => handleChange(e, "term")}
                inputProps={{ min: 0, step: 1 }}
                title="Total number of months of the initial term—not including option periods."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Base rent (RSF/month)"
                value={deal?.baseRent}
                handleChange={(e) => handleChange(e, "baseRent")}
                adornment={{ startAdornment: dollarAdornment }}
                title="The dollar amount per rentable square foot per month."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Annual escalations"
                value={deal?.annualEscalations}
                handleChange={(e) => handleChange(e, "annualEscalations")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percentage that the rent is increased per year."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Occupancy expenses (RSF/month)"
                value={deal?.opExPerMonthRsf}
                handleChange={(e) => handleChange(e, "opExPerMonthRsf")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Tenant's monthly share of operating expenses per rentable square foot."
                disabled={disabled}
            />
        </Collapsible>
    );
};

export default BasicInputs;
