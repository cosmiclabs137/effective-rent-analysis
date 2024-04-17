import React from "react";

import {
    Box,
    // Paper
} from "@mui/material";
import {
    BarChart,
    // ChartsXAxis,
    // ResponsiveChartContainer
} from "@mui/x-charts";

const SummaryChart = ({ axis, sizingProps, dataset = [] }) => {
    // console.log(series);
    return (
        <Box sx={{ width: "100%" }}>
            {/* <Paper>
                <ResponsiveChartContainer
                    series={series}
                    {...sizingProps}
                >
                    <BarChart />
                </ResponsiveChartContainer>
            </Paper> */}
            <BarChart
                // series={series}
                // xAxis={axis}
                dataset={dataset}
                {...sizingProps}
            />
        </Box>
    );
};

export default SummaryChart;
