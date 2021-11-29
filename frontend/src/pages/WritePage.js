import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
      <button>일기쓰기</button>
    </div>
  );
};

export default WritePage;