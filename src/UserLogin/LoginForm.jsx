//이상훈 - 현재 사용하지 않는 라이브러리는 주석처리 하였습니다.
import React, { useRef/*, useState */} from "react";
import login from "../apis/signin";
import { useHistory } from "react-router";


export default function LoginForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  /*
  const password2Ref = useRef();
 const nickmaneRef = useRef();
*/

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const formData = {
      email,
      password,
    };

    const loggedInUserInfo = await login(formData);

    if(!loggedInUserInfo){//이상훈 - 로그인 실패 시 처리
      alert("아이디 또는 패스워드를 확인해 주세요.")
    }
    else {//이상훈 - 로그인 성공
      window.sessionStorage.setItem('loggedInUserNickname', loggedInUserInfo.nickname)
      window.sessionStorage.setItem('loggedInUserPhoto', loggedInUserInfo.photo)

      //이상훈 - 로그인 성공시 닉네임을 불러줌
      alert(loggedInUserInfo.nickname + "님 환영합니다.")

      history.push('/main')
    }
  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            placeholder="메일을 입력해주세요."
            required
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">비밀번호</label>
          <input
            required
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </fieldset>
        <button type="submit" onClick={submitForm}>
          로그인
        </button>
      </form>
    </div>
  );
}
