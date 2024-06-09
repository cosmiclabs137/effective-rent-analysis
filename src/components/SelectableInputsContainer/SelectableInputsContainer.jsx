import React from "react";

import Stack from "@mui/material/Stack";

import DealForm from "../DealForm/DealForm";
import DealSelector from "../DealSelector/DealSelector";

import { DealsContext } from "../../contexts/DealsContexts";

const classes = {
    root: {
        flexGrow: 1,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 2,
        maxWidth: "25%",
    },
};

const FormPanel = ({ dealId, value, index }) =>
    value === index && <DealForm dealId={dealId} />;

const SelectableInputsContainer = ({ sx = {} }) => {
    const deals = React.useContext(DealsContext);
    const [dealId, setDealId] = React.useState(0);

    const handleChange = (e) => {
        setDealId(Number(e.target.value));
    };

    return (
        <Stack
            style={classes.root}
            className="sticky"
            sx={sx}
            flexDirection="column"
            justifyItems="center"
            maxWidth="sm"
        >
            <DealSelector dealId={dealId} handleChange={handleChange} />
            {deals.map((deal, index) => (
                <FormPanel
                    dealId={deal.id}
                    value={dealId}
                    index={index}
                    key={deal.id}
                />
            ))}
        </Stack>
    );
};

export default SelectableInputsContainer;
