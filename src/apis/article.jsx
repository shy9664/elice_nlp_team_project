//이상훈 - 현재 사용하지 않는 라이브러리는 주석처리 하였습니다.
import axios from "axios";
// import BACKEND_URL from "../env";

export const createArticle = async(writeData) => {
    //이상훈 - package.json 파일에 "proxy": "http://localhost:5000"을 추가함으로써 도메인을 붙이지 않아도 자동으로 처리됨
    const url = `/article`;
    await axios.post(url, writeData)
        .then(function (response) {
            console.log("일기 생성 요청 성공 => ", response)
        }).catch(function (error) {
            console.log("일기 생성 요청 실패 => ", error)
        })
}

export const getArticle = async (date) => {
    //이상훈 - package.json 파일에 "proxy": "http://localhost:5000"을 추가함으로써 도메인을 붙이지 않아도 자동으로 처리됨
    const url = `/article/${date}`
    let result

    await axios.get(url)
        .then(function (response) {
            result = response.data
            console.log("일기 날짜로 조회 성공 => ", result)
        }).catch(function (error) {
            console.log("일기 날짜로 조회 실패 => ", error)
        })

    return result

}

export const getMyArticleList = async () => {
    //이상훈 - package.json 파일에 "proxy": "http://localhost:5000"을 추가함으로써 도메인을 붙이지 않아도 자동으로 처리됨
    const url = `/article/my-list`
    let result

    await axios.get(url)
        .then(function (response) {
            result = response.data
            console.log("내 일기 조회 성공 => ", result)
        }).catch(function (error) {
            console.log("내 일기 조회 실패 => ", error)
        })

    return result
}