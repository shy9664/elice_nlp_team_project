import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BasicEditor from "../components/BasicEditor";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import DiaryDateInput from "../components/DiaryDateInput";
import DiaryWriteButtons from "../components/DiaryWriteButtons";

const DiaryWrite = () => {
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
                        <Grid item>
                            <DiaryDateInput />
                        </Grid>
                        <Grid item sx={{}}>
                            <Paper
                                sx={{
                                    width: "100%",
                                    height: 550,
                                    overflow: "scroll",
                                }}
                                elevation={5}
                            >
                                <BasicEditor />
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                alignItems: "flex-end",
                            }}
                        >
                            <DiaryWriteButtons />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default DiaryWrite;
