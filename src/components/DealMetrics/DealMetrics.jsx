import React from "react";

import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { toCurrency } from "../../utils";

import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const MetricsText = ({ children }) => (
    <Typography variant="subtitle1" color="InfoText" gutterBottom>
        {children}
    </Typography>
);

const Item = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "0.7rem",
}));

const DealMetrics = ({ metrics }) => {
    const landlord = metrics?.landlord;
    const tenant = metrics?.tenant;

    return (
        <Stack direction="row" spacing={2} justifyContent="space-around">
            <Item>
                <Tooltip
                    arrow
                    followCursor
                    title="Landlord net effective rate / RSF."
                    placement="top"
                    describeChild
                >
                    <MetricsText>Landlord: {toCurrency(landlord)}</MetricsText>
                </Tooltip>
            </Item>

            <Item>
                <Tooltip
                    arrow
                    followCursor
                    title="Tenant net effective rate / RSF."
                    placement="top"
                    describeChild
                >
                    <MetricsText>Tenant: {toCurrency(tenant)}</MetricsText>
                </Tooltip>
            </Item>
        </Stack>
    );
};

export default DealMetrics;
