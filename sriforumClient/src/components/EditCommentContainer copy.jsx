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

const EditCommentContainer = ({ setEditCommentForm, comment, loadPosts }) => {
  const containerRef = useRef();
  const fullContainerRef = useRef();
  const formRef = useRef();

  const [editCommentText, setEditCommentText] = useState(comment.text);
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

  const { user } = useContext(AuthContext);

  const handleView = (e) => {
    if (containerRef.current.contains(e.target)) {
    } else {
      if (loading == false) {
        setEditCommentForm(false);
        formRef.current.reset();
      }
    }
  };

  const closeThisWindow = () => {
    setEditCommentForm(false);
    formRef.current.reset();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editCommentText == "") {
      console.log("Form can not be empty!");
      setLoading(false);
    } else {
      API.put("comment/update-comment", {
        comment: editCommentText,
        comment_id: comment.id,
      })
        .then((response) => {
          console.log(response);
          loadPosts();
          setLoading(false);
          setEditCommentForm(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    }
  };

  return (
    <Container onClick={(e) => handleView(e)} ref={fullContainerRef}>
      <Content ref={containerRef}>
        <Form action="" ref={formRef} onSubmit={(e) => handleFormSubmit(e)}>
          <TitleContainer>
            <p>Edit Your Comment</p>
            <div className="close-btn">
              <AiOutlineCloseCircle
                className="item"
                onClick={closeThisWindow}
              />
            </div>
          </TitleContainer>
          <Hr />
          <CreatePost>
            <Profile>
              <ProfileImage
                size={35}
                link={user != null ? user.profileUrl : ""}
              />
              <p>{user != null ? user.name : ""}</p>
            </Profile>
            <Audience></Audience>
            <TextArea>
              <textarea
                onChange={(e) => setEditCommentText(e.target.value)}
                defaultValue={comment.text}
              ></textarea>
            </TextArea>

            <Button style={{ marginTop: "20px" }} type="submit">
              Update
            </Button>
          </CreatePost>
        </Form>
        <LoadingScreen Loader={Loader} isLoading={loading}>
          <div className="loading-icon"></div>
        </LoadingScreen>
      </Content>
    </Container>
  );
};

export default EditCommentContainer;
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
  max-width: 500px;
  width: 500px;
  z-index: 1111;
  position: relative;
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

const Form = styled.form`
  width: calc(100% - 40px);
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  padding: 20px;
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
const Hr = styled.hr`
  margin-bottom: 20px;
`;

const CreatePost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;

  p {
    margin-left: 10px;
  }
`;
const Audience = styled.div``;
const TextArea = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: #393e46;
  margin-bottom: 10px;
  textarea {
    flex-grow: 1;
    min-height: 100px;
    overflow-x: hidden;
    outline: none;
    background-color: #393e46;
    color: #eeeeee;
    border: none;
    padding: 10px;
    resize: none;
  }
`;
const Input = styled.input`
  visibility: hidden;
`;
const Label = styled.label`
  background-color: #393e46;
  padding: 10px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .fileImage {
    font-size: 50px;
  }
`;
const Button = styled.button`
  text-decoration: none;
  color: #eeeeee;
  background-color: #00adb5;
  padding: 15px 8px;
  border-radius: 4px;
  letter-spacing: 1.4px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: contain;
  margin-top: 40px;
`;
