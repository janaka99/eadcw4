import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import FeedHeader from "../components/FeedHeader";
import Post from "../components/Post";
import ProfileImage from "../components/ProfileImage";
import AuthContext from "../context/AuthContext/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

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
    API.get("post/get-my-all-posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setpostLoadingError(err.response.data.error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <FeedHeader />
      <Container>
        <ProfileContainer>
          <ProfileImage size={150} link={user != null ? user.profileUrl : ""} />
          <Item>
            <Row>
              <Label>Name</Label>
              <DetailLabel>{user != null ? user.name : ""}</DetailLabel>
            </Row>
            <Row>
              <Label>Email</Label>
              <DetailLabel>{user != null ? user.email : ""}</DetailLabel>
            </Row>
            <Row>
              <Label>Member since</Label>
              <DetailLabel>
                {user != null ? user.created_at.slice(0, 10) : ""}
              </DetailLabel>
            </Row>
          </Item>
        </ProfileContainer>

        <FeedContainer>
          {posts.map((post) => (
            <Post loadPosts={loadPosts} post={post} key={post.id} />
          ))}
        </FeedContainer>
      </Container>
    </>
  );
};

export default Profile;

const Container = styled.div`
  /* position: absolute; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  padding-top: 120px;
  margin-bottom: 50px;
`;

const ProfileContainer = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  /* padding: 20px; */
  padding-block: 20px;
  max-width: 768px;
  width: calc(90% - 40px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FeedContainer = styled.div`
  max-width: 768px;
  width: calc(90% - 40px);
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  padding: 20px;
  max-width: 768px;
  width: calc(90% - 40px);
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-grow: 1;
  font-weight: 600;
`;

const DetailLabel = styled.label`
  display: flex;
  flex-grow: 1;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  letter-spacing: 1.2px;
`;
