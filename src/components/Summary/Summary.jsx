import React from "react";

import { Box } from "@mui/material";
import SummaryTable from "../Tables/SummaryTable";

const Summary = ({ ownerDeals, tenantDeals }) => {
    return (
        <Box md={5}>
            <SummaryTable deals={tenantDeals} title="Tenant" />
            <SummaryTable deals={ownerDeals} title="Owner" />
        </Box>
    );
};

export default Summary;
