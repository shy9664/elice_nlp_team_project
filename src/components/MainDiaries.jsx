import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const MainDiaries = () => {
    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 100,
        maxColumns: 6,
    });

    return (
        <div style={{ height: 300, width: "100%" }}>
            <DataGrid
                {...data}
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    );
};

export default MainDiaries;
