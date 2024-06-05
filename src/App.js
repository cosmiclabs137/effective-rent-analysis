import React from "react";
import { Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { Grid } from "@mui/material";

import "./App.css";

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container>
                <Outlet />
            </Grid>
        </React.Fragment>
    );
}

export default App;
