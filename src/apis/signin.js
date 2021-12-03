import axios from "axios";
import getUrl from "./getUrl";

/**
 * 로그인 api 요청
 *
 * @param signinData  {{email: string, password: string}} loginData
 * @returns
 */
const signin = async (signinData) => {
    const url = getUrl("/login");
    try {
        const response = await axios.post(url, signinData, {
            withCredentials: true,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export default signin;
