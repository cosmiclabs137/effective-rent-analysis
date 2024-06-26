import React from "react";

import { Grid } from "@mui/material";

import DealForm from "../DealForm/DealForm";
import { DealsContext } from "../../contexts/DealsContexts";

const classes = {
    root: {
        flexGrow: 1,
    },
    gridItem: {
        padding: 5,
        textAlign: "center",
    },
};

const InputsContainer = () => {
    const deals = React.useContext(DealsContext);

    return (
        <div style={classes.root}>
            <Grid container justifyContent="center" spacing={2}>
                {deals.map((deal) => (
                    <Grid
                        item
                        key={deal.id}
                        style={classes.gridItem}
                        xs={12}
                        md={3}
                    >
                        <DealForm dealId={deal.id} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default InputsContainer;
