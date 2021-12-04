import React from "react";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

export const Calendar = () => {
    const [value, setValue] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                shouldDisableDate={isWeekend}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                // sx={{ width: "100%" }}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
