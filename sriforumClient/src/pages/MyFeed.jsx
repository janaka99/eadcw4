import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/CreatePost";
import FeedHeader from "../components/FeedHeader";
import LeftSideFeed from "../components/LeftSideFeed";
import Post from "../components/Post";
import RightSideFeed from "../components/RightSideFeed";
import AuthContext from "../context/AuthContext/AuthContext";

const MyFeed = () => {
  const [feedScroll, setfeedScroll] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postLoadingError, setpostLoadingError] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

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

  const loadPosts = async () => {
    API.get("post/get-all-posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setpostLoadingError(err.response.data.error);
      });
  };

  useEffect(() => {
    loadPosts();
    console.log(isAuthenticated);
  }, []);

  return (
    <>
      <FeedHeader />
      <FeedSection>
        <MiddleBar>
          <CreatePost setfeedScroll={setfeedScroll} loadPosts={loadPosts} />

          {posts.map((post) => (
            <Post loadPosts={loadPosts} post={post} key={post._id} />
          ))}
        </MiddleBar>
      </FeedSection>
    </>
  );
};

export default MyFeed;

const FeedSection = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  width: 90%;
`;
const LeftBar = styled.div`
  margin-top: 85px;
  overflow-x: hidden;
  position: fixed;
  width: 200px;
  max-height: calc(100vh - 85px);
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
const LeftDiv = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
  overflow-y: hidden;
  @media screen and (max-width: 1068px) {
    display: none;
  }
`;
const MiddleBar = styled.div`
  margin-top: 85px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* position: fixed;
  width: 300px; */
  max-width: 768px;
  margin-inline: auto;
`;

const RightBar = styled.div`
  margin-top: 85px;
  overflow-x: hidden;
  position: fixed;
  width: 200px;
  max-height: calc(100vh - 85px);
  overflow-x: hidden;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

const RightDiv = styled.div`
  width: 100%;
  position: relative;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
