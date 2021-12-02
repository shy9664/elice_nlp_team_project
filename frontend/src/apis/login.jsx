import axios from "axios";
import BACKEND_URL from "../env";

const login = async(loginData) => {
    const url = `${BACKEND_URL}/login`
    const res = await axios.post(url, loginData)

    console.log(res.data)
    return res.data
}
export default login