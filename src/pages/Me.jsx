import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import MyInfo from "../components/MyInfo";
import MyInfoButtons from "../components/MyInfoButtons";

const Me = () => {
    return (
        <>
            <AppHeader />
            <Container>
                <Grid
                    sx={{ mt: 2, width: "100%", height: "80vh" }}
                    container
                    item
                    spacing={2}
                >
                    <Grid item xs={12} sm={3}>
                        <Paper
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            elevation={3}
                        >
                            <Sidebar />
                        </Paper>
                    </Grid>
                    <Grid container item spacing={2} xs={12} sm={9}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContents: "space-between",
                                    alignItems: "center",
                                    p: 10,
                                }}
                            >
                                <MyInfo />
                                <Grid item xs={12}>
                                    <MyInfoButtons />
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Me;
