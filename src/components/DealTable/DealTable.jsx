import { DataGrid } from "@mui/x-data-grid";

import ErrorBoundary from "../../errorBoundary";

const DealTable = ({
    columns,
    rows,
    style = { minHeight: 300, width: "100%", backgroundColor: "white" },
}) => {
    return (
        <ErrorBoundary fallback={<p>Looks like something went wrong!</p>}>
            <div style={style}>
                <DataGrid
                    density="compact"
                    columns={columns}
                    rows={rows}
                    className="MuiPaper-root"
                    sx={{ p: 1 }}
                    getRowId={(row) => row.month - 1}
                    autoHeight={true}
                />
            </div>
        </ErrorBoundary>
    );
};

export default DealTable;
