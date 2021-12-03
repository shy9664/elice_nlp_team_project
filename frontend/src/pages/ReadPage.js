//page 4 글완성 페이지 - 사이드바, 공유, 수정, 삭제, 목록으로(ListPage)
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';
import Sidebar from "../components/Sidebar";

const ReadPage = () => {
    return (
    
      <div>
          <Sidebar />
      </div>
    );
  };
  
  export default ReadPage;