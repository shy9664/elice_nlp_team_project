import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#7e57c2",
            light: "#b085f5",
            dark: "#4d2c91",
        },
        secondary: {
            main: "#880e4f",
            light: "#bc477b",
            dark: "#560027",
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
