import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import AppHeader from "../components/AppHeader";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import MainChart from "../components/MainChart";
import MainDiaries from "../components/MainDiaries";

const Main = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const navigate = useNavigate();

    useEffect(() => {
        const p = localStorage.getItem("photo");
        const ni = localStorage.getItem("nickname");

        if (p && ni) {
            setPhoto(p);
            setNickname(ni);
            console.log(nickname);
            console.log(photo);
            return;
        }
        navigate("/signin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <Grid item container spacing={2} xs={12} sm={9}>
                        <Grid item xs={12} sm={5}>
                            <Paper
                                sx={{ width: "100%", height: "100%" }}
                                elevation={3}
                            >
                                <Calendar />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Paper
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                }}
                                elevation={3}
                            >
                                <MainChart />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ minHeight: 300 }}>
                            <Paper
                                sx={{ width: "100%", height: "100%" }}
                                elevation={3}
                            >
                                <MainDiaries />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Main;
