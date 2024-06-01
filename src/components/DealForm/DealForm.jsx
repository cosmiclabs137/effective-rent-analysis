import React from "react";

import { Typography } from "@mui/material";

import BasicInputs from "../Inputs/BasicInputs";
import ConcessionsInputs from "../Inputs/ConcessionInputs";
import OtherInputs from "../Inputs/OtherInputs";

import {
    DealsContext,
    DealsDispatchContext,
} from "../../contexts/DealsContexts";

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

export default DealForm;
