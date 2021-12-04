import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Calendar from "../components/Calendar";
import MainChart from "../components/MainChart";
import MainDiaries from "../components/MainDiaries";

import BasicLayout from "../layouts/BasicLayout";

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
        <BasicLayout>
            <Grid item xs={12} lg={5}>
                <Paper sx={{ width: "100%", height: "100%" }} elevation={3}>
                    <Calendar />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={7}>
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
            <Grid item xs={12}>
                <Paper sx={{ width: "100%", height: "100%" }} elevation={3}>
                    <MainDiaries />
                </Paper>
            </Grid>
        </BasicLayout>
    );
};

export default Main;
