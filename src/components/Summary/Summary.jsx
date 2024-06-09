import React from "react";

import Stack from "@mui/material/Stack";
import SummaryTable from "../Tables/SummaryTable";
import SelectableInputsContainer from "../SelectableInputsContainer/SelectableInputsContainer";

const Summary = ({ landlordDeals, tenantDeals }) => {
    return (
        <Stack
            m={5}
            direction="row"
            flexWrap="wrap"
            sx={{ backgroundColor: "none" }}
            justifyContent="space-evenly"
            alignItems="flex-start"
        >
            <SelectableInputsContainer />
            <div>
                <SummaryTable deals={tenantDeals} title="Tenant" />
                <SummaryTable deals={landlordDeals} title="Landlord" />
            </div>
        </Stack>
    );
};

export default Summary;
