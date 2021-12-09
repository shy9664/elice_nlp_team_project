import React from "react";
import isWeekend from "date-fns/isWeekend";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

import { useRecoilState } from "recoil";
import { selectedDateMainAtom } from "../recoils/cal";

export const Calendar = () => {
    const [value, setValue] = useRecoilState(selectedDateMainAtom);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
