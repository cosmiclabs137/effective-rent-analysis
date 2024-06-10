import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Collapsible from "../common/Collapsible/Collapsible";
import InputWithTooltip from "./InputWithTooltip";
import { dollarAdornment } from "../../constants/adornments";

const ConcessionsInputs = ({ deal, handleChange, disabled }) => {
    const tooltipFontSize = "0.9rem";
    return (
        <Collapsible id="concessions-panel-content" summary="Concessions">
            <Tooltip
                arrow
                followCursor
                title="Landlord concessions"
                placement="top"
                describeChild={true}
            >
                <Typography variant="p" fontSize={tooltipFontSize}>
                    Landlord
                </Typography>
            </Tooltip>
            <InputWithTooltip
                label="Other one-time landlord cost"
                value={deal?.otherOneTimeLandlordCost}
                handleChange={(e) =>
                    handleChange(e, "otherOneTimeLandlordCost")
                }
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another one-time cost for landlord to be paid up front (e.g., lease buyout)."
                disabled={disabled}
            />

            <InputWithTooltip
                label="Other monthly landlord cost"
                value={deal?.otherMonthlyLandlordCost}
                handleChange={(e) =>
                    handleChange(e, "otherMonthlyLandlordCost")
                }
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another monthly cost for landlord (e.g., parking discount)."
                disabled={disabled}
            />
            <InputWithTooltip
                label="TI allowance per RSF"
                value={deal?.tiAllowancePerRsf}
                handleChange={(e) => handleChange(e, "tiAllowancePerRsf")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title=""
                disabled={disabled}
            />
            <InputWithTooltip
                label="Months free rent"
                value={deal?.monthsFreeRent}
                handleChange={(e) => handleChange(e, "monthsFreeRent")}
                inputProps={{ min: 0, step: 1 }}
                title="The number of free months. (Front loaded, evenly spread, back loaded)?"
                disabled={disabled}
            />
            <Tooltip
                arrow
                followCursor
                title="Tenant concessions"
                placement="top"
                describeChild={true}
            >
                <Typography variant="p" fontSize={tooltipFontSize}>
                    Tenant
                </Typography>
            </Tooltip>

            <InputWithTooltip
                label="Other one-time tenant cost."
                value={deal?.otherOneTimeTenantCost}
                handleChange={(e) => handleChange(e, "otherOneTimeTenantCost")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another one-time cost for tenant to be paid up front (e.g., key money)."
                disabled={disabled}
            />
            <InputWithTooltip
                label="Other monthly tenant cost"
                value={deal?.otherMonthlyTenantCost}
                handleChange={(e) => handleChange(e, "otherMonthlyTenantCost")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title="Another monthly cost for tenant (e.g., parking)."
                disabled={disabled}
            />

            <InputWithTooltip
                label="TI cost per RSF"
                value={deal?.tiCostPerRsf}
                handleChange={(e) => handleChange(e, "tiCostPerRsf")}
                inputProps={{ min: 0, step: 0.01 }}
                adornment={{ startAdornment: dollarAdornment }}
                title=""
                disabled={disabled}
            />
        </Collapsible>
    );
};

export default ConcessionsInputs;
