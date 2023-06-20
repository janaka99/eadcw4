import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import DeleteCommentContainer from "./DeleteCommentContainer";
import AuthContext from "../context/AuthContext/AuthContext";
import EditCommentContainer from "./EditCommentContainer copy";

const Comment = ({ cm, loadPosts, post_id }) => {
  const replyRef = useRef();

  const [replyText, setReplyText] = useState(null);
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  const { isAuthenticated, user } = useContext(AuthContext);

  const API = axios.create({
    baseURL: "http://localhost:5000/api/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("srihub_user")) {
      req.headers.authorization = `Bearer ${JSON.parse(
        localStorage.getItem("srihub_user")
      )}`;
    }
    return req;
  });

  const handleCommentDeleteWindow = () => {
    setDeleteComment(!deleteComment);
  };

  const handleEdit = () => {
    setEditCommentForm(!editCommentForm);
  };

  return (
    <CommentSection>
      <ComProfile>
        <ProfileImage
          size={35}
          link={cm.profileUrl != null ? cm.profileUrl : null}
        />
      </ComProfile>
      <ComDetails>
        <ComDetailsTopBar>
          <div>
            <p className="name">{cm.owner}</p>
            <CommentTime>
              <Time className="time">{cm.created_at.slice(0, 10)}</Time>
            </CommentTime>
          </div>

          {isAuthenticated ? (
            <>
              {user.id == cm.userId ? (
                <ProfileRight>
                  <PostItem>
                    <BsThreeDots onClick={handleEdit} className="item" />
                  </PostItem>
                  <PostItem>
                    <AiOutlineClose
                      className="item"
                      onClick={handleCommentDeleteWindow}
                    />
                  </PostItem>
                </ProfileRight>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </ComDetailsTopBar>

        <ComDesc>{cm.text}</ComDesc>

        <ComHr />
      </ComDetails>
      <EditComment editCommentForm={editCommentForm}>
        <EditCommentContainer
          setEditCommentForm={setEditCommentForm}
          comment={cm}
          loadPosts={loadPosts}
        />
      </EditComment>
      <DeleteComment deleteComment={deleteComment}>
        <DeleteCommentContainer
          setDeleteComment={setDeleteComment}
          post_id={post_id}
          cm={cm}
          loadPosts={loadPosts}
        />
      </DeleteComment>
    </CommentSection>
  );
};

export default Comment;

const CommentSection = styled.div`
  display: flex;
  align-items: start;
  /* margin-top: 10px; */
  margin-left: 10px;

  .reply {
    padding-right: 0;
  }
`;
const ComProfile = styled.div`
  display: flex;
  align-items: start;
  /* flex-direction: column; */
`;

const ComHr = styled.div`
  height: 1px;
  background-color: #393e46;
  border: none;
  /* margin: 5px auto; */
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ComDetails = styled.div`
  padding: 5px 0 5px 10px;
  flex-grow: 1;

  .name {
    color: #f3eeee;
    font-weight: 600;
    font-size: 14px;
  }
  .time {
    margin-bottom: 5px;
    color: darkgray;
  }
`;

const ComDetailsTopBar = styled.div`
  display: flex;
  justify-content: space-between;

  .name {
    font-size: 13px;
  }
`;

const CommentTime = styled.div``;

const ComDesc = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 14px;
  color: #f3eeee;
  margin: 10px 0;
`;

const Container = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  border-radius: 5px;
  width: calc(100% - 40px);
  padding: 20px;

  .com-section {
    box-shadow: 0px 0px 5px 3px #353942;
    background-color: #454b56;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;

  .hrAbouveCmSection {
    height: 1px;
    background-color: #393e46;
    border: none;
    margin: 5px auto;
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProfileLeft = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const ProfileRight = styled.div`
  display: flex;
  justify-content: end;
  .item {
    font-size: 20px;
    cursor: pointer;
  }
`;

const PostDetails = styled.div`
  margin-left: 10px;
`;

const Name = styled.p`
  font-size: 13px;
  letter-spacing: 1.2px;
  font-weight: 600;
`;
const DateDetails = styled.div`
  display: flex;
  margin-top: 2px;
  color: darkgray;
`;

const Time = styled.p`
  font-size: 15px;
  margin-right: 10px;
`;

const Visibility = styled.div``;

const PostItem = styled.div`
  margin-left: 10px;
`;

const PostContent = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const PostDesc = styled.div`
  font-size: 14px;
`;

const PostImage = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const LikeCountSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .likes {
    display: flex;
    align-items: center;
  }

  .comments {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .blue {
    font-size: 20px;
    color: #00adb5;
    z-index: 1;
  }

  .red {
    font-size: 20px;
    color: red;
  }

  span {
    margin-left: 13px;
  }
  span:nth-child(1) {
    font-weight: 600;
  }
  span:nth-child(2) {
    font-weight: 600;
  }
`;

const LikeCountIcons = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  .like-count-icon:nth-child(1) {
    z-index: 111;
    position: relative;
  }

  .like-count-icon:nth-child(2) {
    position: absolute;
    left: 10px;
    z-index: 0;
  }
`;

const LikeSection = styled.div`
  display: flex;
  gap: 20px;

  .post-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 10px 15px;
    border-radius: 30px;
    gap: 5px;
    background-color: #00adb5;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
  .post-btn-icon {
    font-size: 16px;
  }
`;

const LikeButton = styled.button``;

const CommentButton = styled.button``;

const ShareButton = styled.button``;

const MakeComment = styled.div`
  display: flex;
  align-items: start;
  display: ${(props) => (props.replyBar ? "flex" : "none")};
`;

const CommentInput = styled(TextareaAutosize)`
  flex-grow: 1;
  margin: auto 0;

  margin-left: 20px;
  border: none;
  border-radius: 30px 0 0 30px;
  outline: none;
  padding: 10px 15px;
  resize: none;
  overflow: hidden;
`;

const CommentSubmitBtn = styled.button`
  width: fit-content;
  padding: 9.9px 15px;
  border: none;
  background-color: #00adb5;
  border-radius: 0 30px 30px 0;
  margin: auto 0;
`;

const EditComment = styled.div`
  display: ${(props) => (props.editCommentForm ? "" : "none")};
`;

const DeleteComment = styled.div`
  display: ${(props) => (props.deleteComment ? "" : "none")};
`;
