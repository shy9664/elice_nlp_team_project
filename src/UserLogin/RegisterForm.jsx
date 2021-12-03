//이상훈 - 현재 사용하지 않는 라이브러리는 주석처리 하였습니다.
import React, { useRef/*, useState */} from "react";
import signup from "../apis/signup";
import { useHistory } from "react-router";


export default function RegisterForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const passwordConfirmRef = useRef();
  const nicknameRef = useRef();

  /* 주석처리해둔 부분은 register 등록은 되는데 login이 제대로 작동하지 않아서 임시로 막아뒀습니다 ㅠ
  const password2Ref = useRef();
  const nicknameRef = useRef();
  */
  
  const history = useHistory()

  //이상훈 - 비밀번호, 비밀번호 확인값을 받아 일치하는지 확인
  const isPasswordSame = (password, passwordConfirm) => {
      return password === passwordConfirm;
  }

  const submitForm = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    const nickname = nicknameRef.current.value;

    //이상훈 - 비밀번호 일치 검사
    if(isPasswordSame(password, passwordConfirm)){
      const formData = {
        email,
        password,
        password_check: password,  // 이상훈 - 백에서 입력받는지 아닌지 몰라 그대로 두었습니다.
        nickname: nickname
      };

      //이상훈 - 만약 백에서 회원가입 실패(아이디, 닉네임 중복) 응답이 따로 있는경우 로그인쪽과 같이 조건문으로 처리하시면 됩니다. - 지금은 반환값이 없음.
      signup(formData);

      history.push('/login')
    }
    else {
      alert("비밀번호가 일치하지 않습니다.")
    }

  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            
            required ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="이메일을 입력해주세요."
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">비밀번호</label>
          <input
              required ref={passwordRef}
              id="password"
              type="password"
              name="password"
              placeholder="아니면 밑에 작게 글씨 뜨는게 나을까요??"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
              required ref={passwordConfirmRef}
              id="passwordConfirm"
              type="password"
              name="password"
              placeholder="아니면 밑에 작게 글씨 뜨는게 나을까요??"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="nickname">닉네임</label>
          <input
              required ref={nicknameRef}
              id="nickname"
              type="nickname"
              name="nickname"
              placeholder="닉네임 입력"
          />
        </fieldset>

        {/*
        <fieldset>
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            required
            ref={password2Ref}
            type="password"
            name="password2"
            placeholder="비밀번호를 확인해주세요"
          />
        </fieldset>


        <fieldset>
          <label htmlFor="nickname">닉네임</label>
          <input
            required
            ref={nicknameRef}

            name="nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </fieldset>
        */}
        <button onClick={submitForm}>회원가입</button>
      </form>
    </div>
  );
}