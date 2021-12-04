import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";

const DiaryDateInput = () => {
    const [value, setValue] = React.useState(() => {
        return new Date();
    });
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="오늘의 날짜"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EditIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default DiaryDateInput;
