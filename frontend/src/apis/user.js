import axios from "axios";
import getUrl from "./getUrl";

/**
 * 쿠키 토대로 유저 정보 불러오기
 *
 * @param {string} date
 * @returns {{photo: string, email: string, nickname: string}}
 */
export const readUser = async () => {
    const url = getUrl(`/api/user`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 쿠키 토대로 유저 정보 불러오기
 *
 * @param {{photo: string, password: string, password_check: string}} userData
 * @returns {{description: 'OK'}}
 */
export const updateUser = async (userData) => {
    const url = getUrl(`/api/user`);
    try {
        const res = await axios.patch(url, userData);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
