/**
 * 백엔드에 요청을 보내기 위한 Url 생성
 * 
 * @param {string} path
 * @returns modified url full path
 */
const getUrl = (path) => {
    return `${process.env.REACT_APP_BACKEND_URL}${path}`;
};

export default getUrl;
