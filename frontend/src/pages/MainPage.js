// 유저 메인 페이지 - 사이드바, 캘린더, 그래프, 하단 글쓰기
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";

//react-calendar 라이브러리 입니다.
function MainPage() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
export default MainPage;