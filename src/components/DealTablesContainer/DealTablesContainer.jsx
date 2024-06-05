import React from "react";

import { Box, Tab, Tabs } from "@mui/material";

import DealTable from "../DealTable/DealTable";
import { columns } from "../../constants/columns";

const DealPanel = ({ children, value, index }) =>
    value === index && <Box>{children}</Box>;

const DealTablesContainer = ({ deals }) => {
    const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

    const handleTabChange = (e, tabIndex) => {
        console.log("clicked tab!");
        setCurrentTabIndex(tabIndex);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: "#f8f8ff",
                minHeight: "90vh",
                padding: 0,
            }}
        >
            <Tabs
                onChange={handleTabChange}
                value={currentTabIndex}
                allowScrollButtonsMobile
                centered
            >
                {deals.map((deal, index) => (
                    <Tab label={deal[0].name} key={index} wrapped />
                ))}
            </Tabs>
            {deals.map((deal, index) => (
                <DealPanel key={index} value={currentTabIndex} index={index}>
                    <DealTable rows={deal} columns={columns} />
                </DealPanel>
            ))}
        </Box>
    );
};

export default DealTablesContainer;
