import React from "react";

import BarChartIcon from "@mui/icons-material/BarChart";
import CalculateIcon from "@mui/icons-material/Calculate";
import TableViewIcon from "@mui/icons-material/TableView";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";

import useCalculateDeals from "../../hooks/useCalculateDeals";
import { dealsReducer } from "../../reducers/dealsReducer";
import { metricsReducer } from "../../reducers/metricsReducer";
import { dealFactory } from "../../utils";
import InputsContainer from "../Inputs/InputsContainer";
import Summary from "../Summary/Summary";
import DealTablesContainer from "../DealTablesContainer/DealTablesContainer";
import AppContext from "../../contexts/AppContext";

const DealsContainer = () => {
    const [currentTabIndex, setCurrentTabIndex] = React.useState("0");
    const [deals, dealsDispatch] = React.useReducer(dealsReducer, [
        dealFactory(0),
        dealFactory(1),
        dealFactory(2),
    ]);
    // const [dealId, setDealId] = React.useState(0);
    // const dealId = 0;

    const [metrics, metricsDispatch] = React.useReducer(metricsReducer, {
        landlord: [],
        tenant: [],
    });

    const { calculatedDeals, landlordResults, tenantResults } =
        useCalculateDeals(deals);
    const handleTabChange = (e, tabIndex) => setCurrentTabIndex(tabIndex);

    return (
        <AppContext
            deals={deals}
            dealsDispatch={dealsDispatch}
            metrics={metrics}
            metricsDispatch={metricsDispatch}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: "#f8f8ff",
                    minHeight: "90vh",
                    padding: 5,
                }}
            >
                <TabContext value={currentTabIndex}>
                    <Box>
                        <TabList
                            onChange={handleTabChange}
                            aria-label="deal tabs"
                            centered
                        >
                            <Tab
                                value="0"
                                icon={<TableViewIcon />}
                                label="Inputs"
                                key={0}
                            />
                            <Tab
                                value="1"
                                icon={<BarChartIcon />}
                                label="Summary"
                                key={1}
                            />
                            <Tab
                                value="2"
                                icon={<CalculateIcon />}
                                label="Calculations"
                                key={2}
                            />
                        </TabList>
                    </Box>
                    <Grid
                        container
                        flexGrow={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        {currentTabIndex === "0" && (
                            <TabPanel value="0">
                                <Grid
                                    item
                                    xs={12}
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
                                    {/* <DealForm dealId={dealId} /> */}
                                    <InputsContainer />
                                </Grid>
                            </TabPanel>
                        )}

                        {currentTabIndex === "1" && (
                            <TabPanel value="1">
                                <Box
                                    container="true"
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        padding: 2,
                                    }}
                                >
                                    <div>
                                        <Grid item>
                                            <Summary
                                                tenantDeals={[tenantResults]}
                                                landlordDeals={[
                                                    landlordResults,
                                                ]}
                                            />
                                        </Grid>
                                    </div>
                                </Box>
                            </TabPanel>
                        )}

                        {currentTabIndex === "2" && (
                            <TabPanel value="2" style={{ width: "100%" }}>
                                <Box
                                    container="true"
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        // padding: 2,
                                        width: "100wh",
                                    }}
                                >
                                    <div>
                                        <Grid item>
                                            <DealTablesContainer
                                                deals={calculatedDeals}
                                            />
                                        </Grid>
                                    </div>
                                </Box>
                            </TabPanel>
                        )}
                    </Grid>
                </TabContext>
            </Box>
        </AppContext>
    );
};

export default DealsContainer;
