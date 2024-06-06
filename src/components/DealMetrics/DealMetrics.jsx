import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { toCurrency } from "../../utils";

const DealMetrics = ({ tenant, landlord }) => {
    return (
        <List component={Stack} direction="row">
            <ListItem>
                <Tooltip
                    arrow
                    followCursor
                    title="Landlord net effective rate."
                    placement="top"
                    describeChild
                >
                    <Typography variant="subtitle1">
                        Landlord: {toCurrency(landlord)}
                    </Typography>
                </Tooltip>
            </ListItem>
            <ListItem>
                <Tooltip
                    arrow
                    followCursor
                    title="Tenant net effective rate."
                    placement="top"
                    describeChild
                >
                    <Typography variant="subtitle1">
                        Tenant:&nbsp;
                        {toCurrency(tenant)}
                    </Typography>
                </Tooltip>
            </ListItem>
        </List>
    );
};

export default DealMetrics;
