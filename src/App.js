import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { Grid } from "@mui/material";

import BasicHeader from "./components/Headers/BasicHeader";

import "./App.css";

function App() {
    const [title, setTitle] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const parsedTitle = location.pathname.replace(/\W/g, " ");
        setTitle(parsedTitle);
    }, [location]);
    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container>
                {/* <BasicHeader title={title} /> */}
                <Outlet />
            </Grid>
        </React.Fragment>
    );
}

export default App;
