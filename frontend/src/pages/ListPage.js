//page 5 글목록 페이지, 사이드바 추가, 드롭다운 감정선택, 체크박스

import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';


//임시 간단쓰기

const ListPage = () => {
  const [post, setPost] = useState({
    id: 0,
    title: "",
    content: "",
  });

  const [posts, setPosts] = useState([
    ]);

  const handleWrite = (e) => {
    e.preventDefault(); 
    console.log(1, post.id);

    console.log(2, post.id);
    setPosts([...posts, { ...post, id: post.id + 1 }]);
    console.log(3, post.id);
    setPost({ ...post, id: post.id + 1 });
  };

  const handleForm = (e) => {

    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  

  return (
    <div>
      <h1>일기 보기</h1>
      <form onSubmit={handleWrite}>
        <input
          type='text'
          placeholder='제목'
          value={post.title}
          onChange={handleForm}
          name='title'
        />
        {/* <input
          type='text'
          placeholder='내용'
          value={post.content}
          onChange={handleForm}
          name='content'
        />
        <button type='submit'>간단일기쓰기</button> */}
      </form>
      <hr />
      
      {posts.map((post) => (
        <Box1>
        <Link to="/read">
          <div>
            날짜? : {post.id} / 제목 : {post.title} / 내용 : {post.content}
          </div>
        </Link>
        </Box1>
      ))}
      
        <Link to="/write">
            <button>더 쓰러 갈래!</button>
        </Link>
      <button>다른 일기 보기</button>
    </div>
  );
};

//양 끝으로
const Box1 = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
  height: 100px;
  margin: 20px;
  align-items: center;
`;

export default ListPage;