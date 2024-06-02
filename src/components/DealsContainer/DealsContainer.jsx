import React from "react";

import { Box, Grid, Paper } from "@mui/material";

import {
    DealsContext,
    DealsDispatchContext,
} from "../../contexts/DealsContexts";
import useCalculateDeal from "../../hooks/useCalculateDeal";
import DealForm from "../DealForm/DealForm";
import DealTable from "../DealTable/DealTable";
import { dealsReducer } from "../../reducers/dealsReducer";
import { dealFactory } from "../../utils";
import { columns } from "../../constants/columns";

const DealsContainer = () => {
    const [deals, dispatch] = React.useReducer(dealsReducer, [dealFactory(0)]);
    // const [dealId, setDealId] = React.useState(0);
    const dealId = 0;

    const calculatedDeal = useCalculateDeal(deals[dealId]);

    return (
        <DealsContext.Provider value={deals}>
            <DealsDispatchContext.Provider value={dispatch}>
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "#f8f8ff",
                        minHeight: "90vh",
                        padding: 5,
                    }}
                >
                    <Grid
                        container
                        flexGrow={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid
                            item
                            xs={12}
                            lg={2}
                            component={Paper}
                            elevation={4}
                            className="sticky"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 2,
                                mt: 2,
                            }}
                        >
                            <DealForm dealId={dealId} />
                        </Grid>
                        <Box
                            container="true"
                            xs={12}
                            lg={9}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                padding: 2,
                            }}
                        >
                            <div>
                                <Grid item>
                                    <DealTable
                                        rows={calculatedDeal}
                                        columns={columns}
                                    />
                                </Grid>
                            </div>
                        </Box>
                    </Grid>
                </Box>
            </DealsDispatchContext.Provider>
        </DealsContext.Provider>
    );
};

export default DealsContainer;
