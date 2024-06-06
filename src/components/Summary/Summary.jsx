import React from "react";

import { Box } from "@mui/material";
import SummaryTable from "../Tables/SummaryTable";

const Summary = ({ landlordDeals, tenantDeals }) => {
    return (
        <Box md={5}>
            <SummaryTable deals={tenantDeals} title="Tenant" />
            <SummaryTable deals={landlordDeals} title="Landlord" />
        </Box>
    );
};

export default Summary;
