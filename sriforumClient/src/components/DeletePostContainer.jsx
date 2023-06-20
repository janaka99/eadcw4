import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillClockCircle,
  AiOutlineCloseCircle,
  AiOutlineFileImage,
  AiOutlineProfile,
} from "react-icons/ai";
import styled, { keyframes } from "styled-components";
import AuthContext from "../context/AuthContext/AuthContext";
import ProfileImage from "./ProfileImage";
import Loader from "../assets/loader.png";
import axios from "axios";
import _ from "lodash";

const DeletePostContainer = ({ setDeletePost, post, loadPosts }) => {
  const containerRef = useRef();

  const [loading, setLoading] = useState(false);

  const API = axios.create({
    baseURL: "http://localhost:8080/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("sri_forum_user")) {
      req.headers.authorization = `Bearer ${JSON.parse(
        localStorage.getItem("sri_forum_user")
      )}`;
    }
    return req;
  });

  const handleView = (e) => {
    if (containerRef.current.contains(e.target)) {
    } else {
      if (loading == false) {
        setDeletePost(false);
      }
    }
  };

  const closeThisWindow = () => {
    setDeletePost(false);
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    API.delete("post/delete-post", {
      params: { post_id: post.id },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        loadPosts();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        loadPosts();
      });
  };

  return (
    <Container onClick={(e) => handleView(e)}>
      <Content ref={containerRef}>
        <TitleContainer>
          <p>Delete Post</p>
          <div className="close-btn">
            <AiOutlineCloseCircle className="item" onClick={closeThisWindow} />
          </div>
        </TitleContainer>
        <ButtonContainer>
          <Button onClick={closeThisWindow}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </ButtonContainer>
        <LoadingScreen Loader={Loader} isLoading={loading}>
          <div className="loading-icon"></div>
        </LoadingScreen>
      </Content>
    </Container>
  );
};

export default DeletePostContainer;
const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1111111111;
  background-color: #393e465f;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  inline-size: 100%;
  overflow: hidden;
  /* overflow-y: scroll; */
  .item {
    font-size: 30px;
  }
`;
const Content = styled.div`
  max-width: 250px;
  width: 250px;
  z-index: 1111;
  position: relative;
  width: calc(100% - 40px);
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  padding: 20px;
`;

const LoadingScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.5;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.isLoading ? "" : "none")};
  div {
    z-index: 11111;
    height: 80px;
    width: 80px;
    background-image: url(${(props) => props.Loader});
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  .close-btn {
    cursor: pointer;
  }
  p {
    font-size: 18px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  text-decoration: none;
  color: #eeeeee;
  background-color: #323232ab;
  padding: 15px 8px;
  width: 100px;
  border-radius: 4px;
  letter-spacing: 1.4px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #323232d3;
  }
`;
