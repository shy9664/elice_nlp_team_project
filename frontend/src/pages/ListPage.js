import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


//캘린더 라이브러리? 간단쓰기 제목 없애는게 나을까요

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

  // 삭제
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
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
        <input
          type='text'
          placeholder='내용'
          value={post.content}
          onChange={handleForm}
          name='content'
        />
        <button type='submit'>간단일기쓰기</button>
      </form>
      <hr />
      {posts.map((post) => (
        <Box1>
          <div>
            날짜? : {post.id} / 제목 : {post.title} / 내용 : {post.content}
          </div>
          <button onClick={() => handleDelete(post.id)}>삭제</button>
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