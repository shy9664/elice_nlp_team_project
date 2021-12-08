import axios from "axios";
import getUrl from "./getUrl";

/**
 * 회원가입 요청
 * @param {{email: string, password: string, passwordCheck: string, nickname: string}} signupData
 */
const signup = async (signupData) => {
    const url = getUrl("/api/signup");
    try {
        const response = await axios.post(url, signupData, {
            withCredentials: true,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};
export default signup;
