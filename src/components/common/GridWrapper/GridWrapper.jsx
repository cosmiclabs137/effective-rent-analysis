import React from "react";
import { Grid, Paper } from "@mui/material";
import { gridWrapperStyles } from "./styles";

const GridWrapper = ({ children, spacing = 2 }) => {
    return (
        <Grid
            container
            spacing={spacing}
            flexDirection="row"
            justifyContent="center"
            sx={gridWrapperStyles}
            component={Paper}
        >
            {children}
        </Grid>
    );
};

export default GridWrapper;
