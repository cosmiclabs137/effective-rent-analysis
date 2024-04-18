import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
        <Grid container>
            <BasicHeader title={title} />
            <Outlet />
        </Grid>
    );
}

export default App;
