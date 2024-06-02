import Collapsible from "../common/Collapsible/Collapsible";
import InputWithTooltip from "./InputWithTooltip";
import { percentAdornment } from "../../constants/adornments";

const OtherInputs = ({ deal, handleChange, disabled }) => {
    return (
        <Collapsible id="other-panel-content" summary="Other">
            <InputWithTooltip
                label="Tenant discount rate"
                value={deal?.tenantDiscountRate}
                handleChange={(e) => handleChange(e, "tenantDiscountRate")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percentage rate the tenant would be charged on an unsecured loan."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Lanlord discount rate"
                value={deal?.landlordDiscountRate}
                handleChange={(e) => handleChange(e, "landlordDiscountRate")}
                inputProps={{ min: 0, step: 0.1 }}
                InputProps={{ endAdornment: percentAdornment }}
                title="The return percent the landlord would make on an alternate investment."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Commission percent (months 1 to 60)"
                value={deal?.commissionFirst}
                handleChange={(e) => handleChange(e, "commissionFirst")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percent of the landlord's commission costs for the first 60 months."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Commission pct (months 61+)"
                value={deal?.commissionSecond}
                handleChange={(e) => handleChange(e, "commissionSecond")}
                inputProps={{ min: 0, step: 0.1 }}
                adornment={{ endAdornment: percentAdornment }}
                title="The percent of the landlord's commission costs from month 61 onward."
                disabled={disabled}
            />
        </Collapsible>
    );
};

export default OtherInputs;
