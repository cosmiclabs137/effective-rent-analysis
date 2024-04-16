import React from "react";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const DealTab = ({ tabs, tabNames }) => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="tabs">
                        {tabNames.map((name, index) => (
                            <Tab label={name} value={index + 1} />
                        ))}
                    </TabList>
                </Box>
                {tabs.map((tab, index) => (
                    <TabPanel value={index + 1}>{tab}</TabPanel>
                ))}
            </TabContext>
        </Box>
    );
};

export default DealTab;
