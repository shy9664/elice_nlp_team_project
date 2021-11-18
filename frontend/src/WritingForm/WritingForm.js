import React, { Component } from "react";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
 
class Write2 extends Component {
  editorRef = React.createRef();
 
  constructor() {
    super();
    this.state = {
      content: "",
    };
  }

  handleClick = () => {
    this.setState({
      content: this.editorRef.current.getInstance().getHtml(),
    });
  };

  render() {
    return (
      <>
        <Editor
          previewStyle="vertical"
          height="300px"
          initialEditType="wysiwyg"
          placeholder="글쓰기"
          ref={this.editorRef}
        />
        <button onClick={this.handleClick}>저장</button>
      </>
    );
  }
}

export default Write2;