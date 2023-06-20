import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineComment,
  AiOutlineGlobal,
  AiOutlineLike,
  AiOutlineSend,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import TextareaAutosize from "react-textarea-autosize";
import AuthContext from "../context/AuthContext/AuthContext";
import axios from "axios";
import Comment from "./Comment";
import CreatePostContainer from "./CreatePostContainer";
import EditPostContainer from "./EditpostContainer";
import DeletePostContainer from "./DeletePostContainer";
import { NavLink } from "react-router-dom";

const Post = ({ image, post, loadPosts }) => {
  const commentRef = useRef();

  const { user, isAuthenticated } = useContext(AuthContext);

  const [commentText, setCommentText] = useState(null);
  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

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

  const handleComment = async () => {
    if (commentText == null || commentText == "") {
      console.log(" empty comment  ");
    } else {
      API.post("comment/add-new-comment", {
        post_id: post.id,
        text: commentText,
      })
        .then((res) => {
          console.log(res);
          // setPosts(res.data);
          loadPosts();
          commentRef.current.value = "";
        })
        .catch((err) => {
          loadPosts();
          commentRef.current.value = "";
          console.log(err);
          // setpostLoadingError(err.response.data.error);
        });
    }
  };

  const handlePostEdit = () => {
    setEditPost(!editPost);
  };
  const handlePostDeleteWindow = () => {
    setDeletePost(!deletePost);
  };

  return (
    <Container>
      <Content>
        <ProfileContainer>
          <ProfileLeft>
            <ProfileImage
              size={35}
              link={post.profileUrl != null ? post.profileUrl : null}
            />
            <PostDetails>
              <Name>{post.owner}</Name>
              <DateDetails>
                <Time>{post.created_at.slice(0, 10)}</Time>
                <Visibility>
                  <AiOutlineGlobal />
                </Visibility>
              </DateDetails>
            </PostDetails>
          </ProfileLeft>
          <ProfileRight>
            {isAuthenticated ? (
              <>
                {user.id == post.userId ? (
                  <>
                    <PostItem>
                      <BsThreeDots onClick={handlePostEdit} className="item" />
                    </PostItem>
                    <PostItem>
                      <AiOutlineClose
                        onClick={handlePostDeleteWindow}
                        className="item"
                      />
                    </PostItem>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </ProfileRight>
        </ProfileContainer>
        <PostContent>
          <PostDesc>{post.post}</PostDesc>
        </PostContent>

        <LikeSection>
          <CommentButton className="post-btn">
            {post.comments.length} <span>Comments</span>
            <AiOutlineComment className="post-btn-icon" />
          </CommentButton>
        </LikeSection>

        {post.comments.map((cm) => (
          <div key={cm.id}>
            <ComHr />
            <Comment post_id={post._id} loadPosts={loadPosts} cm={cm} />
          </div>
        ))}
        <div className="hrAbouveCmSection" />
        <MakeComment>
          {isAuthenticated ? (
            <>
              <ProfileImage
                size={35}
                link={user != null ? user.profileUrl : ""}
              />
              <CommentInput
                ref={commentRef}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment.."
              />
              <CommentSubmitBtn type="button" onClick={handleComment}>
                <AiOutlineSend className="comment-send-icon" />
              </CommentSubmitBtn>
            </>
          ) : (
            <>
              <PostNavLink to="/login">Give answer ?</PostNavLink>
            </>
          )}
        </MakeComment>
      </Content>
      <EditPost editPost={editPost}>
        <EditPostContainer
          setEditPost={setEditPost}
          post={post}
          loadPosts={loadPosts}
        />
      </EditPost>
      <DeletePost deletePost={deletePost}>
        <DeletePostContainer
          setDeletePost={setDeletePost}
          post={post}
          loadPosts={loadPosts}
        />
      </DeletePost>
    </Container>
  );
};

export default Post;

// const CommentSection = styled.div`
//   display: flex;
//   align-items: start;
//   /* margin-top: 10px; */

//   .reply {
//     padding-right: 0;
//   }
// `;
// const ComProfile = styled.div`
//   display: flex;
//   align-items: start;
//   /* flex-direction: column; */
// `;

const ComHr = styled.div`
  height: 1px;
  background-color: #393e46;
  border: none;
  /* margin: 5px auto; */
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`;

// const ComDetails = styled.div`
//   padding: 5px 10px;
//   margin-left: 10px;
//   flex-grow: 1;

//   .name {
//     color: #f3eeee;
//     font-weight: 600;
//     font-size: 14px;
//   }
//   .time {
//     margin-bottom: 5px;
//     color: darkgray;
//   }
// `;

// const ComDetailsTopBar = styled.div`
//   display: flex;
//   justify-content: space-between;

//   .name {
//     font-size: 13px;
//   }
// `;

// const CommentTime = styled.div``;

// const ComDesc = styled.div`
//   font-weight: 500;
//   margin-bottom: 5px;
//   font-size: 14px;
//   color: #f3eeee;
// `;
// const ComReply = styled.div`
//   display: flex;
//   justify-content: end;
//   div {
//     text-align: right;
//     font-size: 14px;
//     font-weight: 600;
//     cursor: pointer;
//     width: fit-content;
//   }
// `;

// const ComReplies = styled.div`
//   margin: 10px 0;
// `;

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
  margin: 10px 0;
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

// const ShareButton = styled.button``;

const MakeComment = styled.div`
  display: flex;
  align-items: start;
`;

const PostNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ffffff44;
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

const EditPost = styled.div`
  display: ${(props) => (props.editPost ? "" : "none")};
`;

const DeletePost = styled.div`
  display: ${(props) => (props.deletePost ? "" : "none")};
`;
