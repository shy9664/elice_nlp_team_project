import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const SideBox1 = styled.div`
  background-color: black;
  
`;

function Sidebar() {
  
  return (
    <SideBox1>
      <div>
      <Link to="/detail"><ul> 내 정보</ul></Link>
      <Link to="/"><ul> 로그아웃</ul></Link>
      <Link to="/write"><ul> 일기쓰기</ul></Link>
      <Link to="/list"><ul> 목록</ul></Link>
      <Link to="/"><ul> 공감한 게시글</ul></Link>
      <Link to="/"><ul> 열린게시판</ul></Link>
      </div>
    </SideBox1>
    
  );
}

export default Sidebar;