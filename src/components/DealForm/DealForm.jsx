import React from "react";

import { Paper, Typography } from "@mui/material";

import BasicInputs from "../Inputs/BasicInputs";
import ConcessionsInputs from "../Inputs/ConcessionInputs";
import OtherInputs from "../Inputs/OtherInputs";

import DealMetrics from "../DealMetrics/DealMetrics";
import { MetricsContext } from "../../contexts/MetricsContext";

import {
    DealsContext,
    DealsDispatchContext,
} from "../../contexts/DealsContexts";

import DealMenu from "../DealMenu/DealMenu";

const DealForm = ({ dealId, disable = { metrics: false, name: false } }) => {
    const [disabled, setDisabled] = React.useState(false);

    const deals = React.useContext(DealsContext);
    const dispatch = React.useContext(DealsDispatchContext);
    const deal = deals[dealId];

    const metrics = React.useContext(MetricsContext);

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
        <Paper sx={{ p: 2 }}>
            {!disable.name && (
                <Typography variant="h6">
                    {deal?.name.length > 0 ? deal?.name : "New Deal"}
                </Typography>
            )}
            <DealMenu
                dealId={dealId}
                disabled={disabled}
                setDisabled={setDisabled}
            />
            {!disable.metrics && <DealMetrics metrics={metrics[dealId]} />}
            <form>
                <BasicInputs
                    deal={deal}
                    handleChange={handleChange}
                    disabled={disabled}
                />
                <ConcessionsInputs
                    deal={deal}
                    handleChange={handleChange}
                    disabled={disabled}
                />
                <OtherInputs
                    deal={deal}
                    handleChange={handleChange}
                    disabled={disabled}
                />
            </form>
            <DealMenu
                dealId={dealId}
                disabled={disabled}
                setDisabled={setDisabled}
            />
        </Paper>
    );
};

export default DealForm;
