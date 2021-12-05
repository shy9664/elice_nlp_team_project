import axios from "axios";
import getUrl from "./getUrl";

/**
 * 글 작성
 *
 * @param writeData  {{text: string, date: number}}  콘텐츠 데이터
 * @returns
 */
export const createArticle = async (writeData) => {
    const url = getUrl(`/article`);
    try {
        const response = await axios.post(url, writeData);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 글 수정 (아니 그런데 어떻게 datetype 이 integer 죠? 진짜 화나네...)
 *
 * @param {string} date
 * @param {string} writeData
 * @returns
 */
export const updateArticle = async (date, writeData) => {
    const url = getUrl(`/article/${date}`);
    try {
        const response = await axios.patch(url, { text: writeData });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 글 삭제
 *
 * @param {string} date
 * @returns
 */
export const deleteArticle = async (date) => {
    const url = getUrl(`/article/${date}`);
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 글 읽기
 *
 * @param {string} date
 * @returns
 */
export const readArticle = async (date) => {
    const url = getUrl(`/article/${date}`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getArticle = async (date) => {
    //이상훈 - package.json 파일에 "proxy": "http://localhost:5000"을 추가함으로써 도메인을 붙이지 않아도 자동으로 처리됨
    const url = `/article/${date}`;
    let result;

    await axios
        .get(url)
        .then(function (response) {
            result = response.data;
            console.log("일기 날짜로 조회 성공 => ", result);
        })
        .catch(function (error) {
            console.log("일기 날짜로 조회 실패 => ", error);
        });

    return result;
};

export const getMyArticleList = async () => {
    //이상훈 - package.json 파일에 "proxy": "http://localhost:5000"을 추가함으로써 도메인을 붙이지 않아도 자동으로 처리됨
    const url = `/article/my-list`;
    let result;

    await axios
        .get(url)
        .then(function (response) {
            result = response.data;
            console.log("내 일기 조회 성공 => ", result);
        })
        .catch(function (error) {
            console.log("내 일기 조회 실패 => ", error);
        });

    return result;
};
