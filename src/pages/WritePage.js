import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createArticle } from "../apis/article";
import { useHistory } from "react-router-dom";

const WritePage = () => {
    const history = useHistory();

    const [text, setText] = useState();

    const handleChange = (e, editor) => {
        const data = editor.getData();
        setText(data);
    };

    const handleSubmit = async () => {
        alert(text);
        const writeData = {
            text,
            date: 20211128, // 임시
        };
        await createArticle(writeData);
        history.push("/list");
    };

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data="<p>CKEditor 사용입니다</p>"
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>일기쓰기</button>
        </div>
    );
};

export default WritePage;
