import React from "react";
import Box from "@mui/material/Box";
import Title_logo from "../img/moodmood_logo.png"

/**
 * 로고 이미지 컴포넌트
 * @returns
 */
const Logo = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <img
                width="100%"
                height="auto"
                // sx={{ width: "auto", height: "100%", objectFit: "fill" }}
                src={Title_logo}
                alt="logo"
            />
        </Box>
    );
};

export default Logo;
