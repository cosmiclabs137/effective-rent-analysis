import React, { useState } from "react";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";

const IndexPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

    const axis = {
        data: ["Deal 1", "Deal 2", "Deal 3"],
        scaleType: "band",
    };
    const sizingProps = { width: 600, height: 500 };
    console.log(axis);
    console.log(sizingProps);

    const tenantColumns = [
        {
            field: "rowTitle",
            headerName: "Tenant Summary",
            minWidth: 150,
            editable: false,
        },
        {
            field: "value1",
            headerName: "Deal 1",
            width: 150,
            editable: false,
        },
        {
            field: "value2",
            headerName: "Deal 2",
            width: 150,
            editable: false,
        },
        {
            field: "value3",
            headerName: "Deal 3",
            width: 150,
            editable: false,
        },
    ];
    const tenantRows = [
        {
            id: 0,
            rowTitle: "Total Cost For Occupancy",
            value1: "$621,792.69",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 1,
            rowTitle: "Present Value",
            value1: "$509,096.26",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 2,
            rowTitle: "Net Effective Rate per Annum",
            value1: "$112,542.82",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 3,
            rowTitle: "Net Effective Rate per Month",
            value1: "$9,378.57",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 4,
            rowTitle: "Net Effective Rate per Annum/SF",
            value1: "$40.28",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 5,
            rowTitle: "Net Effective Rate per Month/SF",
            value1: "$3.36",
            value2: "$0.00",
            value3: "$0.00",
        },
    ];
    const ownerColumns = [
        {
            field: "rowTitle",
            headerName: "Owner Summary",
            width: 150,
            editable: false,
        },
        {
            field: "value1",
            headerName: "Deal 1",
            width: 150,
            editable: false,
        },
        {
            field: "value2",
            headerName: "Deal 2",
            width: 150,
            editable: false,
        },
        {
            field: "value3",
            headerName: "Deal 3",
            width: 150,
            editable: false,
        },
    ];
    const ownerRows = [
        {
            id: 0,
            rowTitle: "Total Cost For Occupancy",
            value1: "$621,792.69",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 1,
            rowTitle: "Present Value",
            value1: "$509,096.26",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 2,
            rowTitle: "Net Effective Rate per Annum",
            value1: "$112,542.82",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 3,
            rowTitle: "Net Effective Rate per Month",
            value1: "$9,378.57",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 4,
            rowTitle: "Net Effective Rate per Annum/SF",
            value1: "$40.28",
            value2: "$0.00",
            value3: "$0.00",
        },
        {
            id: 5,
            rowTitle: "Net Effective Rate per Month/SF",
            value1: "$3.36",
            value2: "$0.00",
            value3: "$0.00",
        },
    ];

    return (
        <React.Fragment>
            <Tabs value={currentTabIndex} onChange={handleTabChange}>
                <Tab label="Tab 1" />
                <Tab label="Tab 2" />
                <Tab label="Tab 3" />
                <Tab label="Tab 4" />
            </Tabs>

            {/* Tab 1 contents */}
            {currentTabIndex === 0 && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Tab 1 Content</Typography>
                    <Typography variant="p">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </Typography>
                    <BarChart
                        xAxis={[axis]}
                        series={[
                            { data: [4, 3, 5] },
                            { data: [1, 6, 3] },
                            { data: [2, 5, 6] },
                        ]}
                        width={800}
                        height={600}
                    />
                </Box>
            )}

            {/* Tab 2 contents */}
            {currentTabIndex === 1 && (
                <>
                    {/* <Box sx={{ m: 5, height: 20 }} /> */}
                    <Box
                        sx={{
                            p: 3,
                            height: 200,
                            width: 500,
                            marginLeft: 5,
                            marginTop: 10,
                        }}
                    >
                        <DataGrid
                            rows={tenantRows}
                            columns={tenantColumns}
                            autosizeOptions={{
                                columns: [
                                    "Tenant Summary",
                                    "Deal 1",
                                    "Deal 2",
                                    "Deal 3",
                                ],
                                includeOutliers: true,
                                includeHeaders: false,
                            }}
                        />
                    </Box>

                    <Box sx={{ p: 3, height: 300, marginTop: 10 }}>
                        <DataGrid
                            rows={ownerRows}
                            columns={ownerColumns}
                            autosizeOptions={{
                                columns: [
                                    "Ten Summary",
                                    "Deal 1",
                                    "Deal 2",
                                    "Deal 3",
                                ],
                                includeOutliers: true,
                                includeHeaders: false,
                            }}
                        />
                    </Box>
                </>
            )}

            {/* Tab 3 contents */}
            {currentTabIndex === 2 && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Tab 3 Content</Typography>
                    <Typography variant="p">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                    </Typography>
                </Box>
            )}

            {/* Tab 4 contents */}
            {currentTabIndex === 3 && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Tab 4 Content</Typography>
                    <Typography variant="p">
                        The standard chunk of Lorem Ipsum used since the 1500s
                        is reproduced below for those interested. Sections
                        1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
                        by Cicero are also reproduced in their exact original
                        form, accompanied by English versions from the 1914
                        translation by H. Rackham.
                    </Typography>
                </Box>
            )}
        </React.Fragment>
    );
};

export default IndexPage;
