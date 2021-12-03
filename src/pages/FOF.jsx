import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const FOF = () => {
    return (
        <Box>
            <Modal open={true}>
                <Paper
                    sx={{
                        outline: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        maxWidth: 400,
                    }}
                >
                    <Typography sx={{ mb: 4 }} variant="h4">
                        존재하지 않는 페이지
                    </Typography>
                    <Link to="/">
                        <Button variant="contained"> 돌아가기</Button>
                    </Link>
                </Paper>
            </Modal>
        </Box>
    );
};

export default FOF;
