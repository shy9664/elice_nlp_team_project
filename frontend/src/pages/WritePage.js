import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";



//뒤로가기 


//CKEditor 불러오기
const WritePage = () => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data='<p>CKEditor 사용입니다</p>'
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
        }}
      />
      
      <Link to="/main"><button>뒤로가기</button></Link>
      
      <Link to="/list"><button>일기쓰기</button></Link>
    </div>
  );
};

export default WritePage;