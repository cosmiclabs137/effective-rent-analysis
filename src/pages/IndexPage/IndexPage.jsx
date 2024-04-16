import React, { useState } from "react";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const IndexPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum finibus odio eget orci bibendum, ac hendrerit
                        mi porta. Nullam volutpat libero tempus leo lacinia
                        ornare. In hac habitasse platea dictumst. Pellentesque
                        facilisis ex eget vulputate tincidunt. Curabitur
                        fringilla ultrices commodo.
                    </Typography>
                </Box>
            )}

            {/* Tab 2 contents */}
            {currentTabIndex === 1 && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Tab 2 Content</Typography>
                    <Typography variant="p">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </Typography>
                </Box>
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
