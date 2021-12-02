import axios from "axios";
import BACKEND_URL from "../env";

const signup = async(signupData) => {
    const url = `${BACKEND_URL}/signup`
    await axios.post(url, signupData)
}
export default signup