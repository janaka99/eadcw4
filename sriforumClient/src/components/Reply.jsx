import React, { useRef, useState } from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import DeleteReplyContainer from "./DeletReplyContainer";

const Reply = ({ rp, loadPosts, comment_id }) => {
  const [deleteReply, setDeleteReply] = useState(false);

  const handleReplyDeleteWindow = () => {
    setDeleteReply(!deleteReply);
  };

  return (
    <>
      <CommentSection>
        <ComProfile>
          <ProfileImage
            size={35}
            link={rp.author.currentUrl ? rp.author.currentUrl.url : null}
          />
        </ComProfile>
        <ComDetails className="reply">
          <ComDetailsTopBar>
            <p className="name">
              {rp.author.firstname + " " + rp.author.lastname}
            </p>
            <ProfileRight>
              <PostItem>
                <BsThreeDots className="item" />
              </PostItem>
              <PostItem>
                <AiOutlineClose
                  className="item"
                  onClick={handleReplyDeleteWindow}
                />
              </PostItem>
            </ProfileRight>
          </ComDetailsTopBar>
          <CommentTime>
            <Time className="time">6h</Time>
          </CommentTime>
          <ComDesc>{rp.text}</ComDesc>
        </ComDetails>
      </CommentSection>
      <ComHr />
      <DeleteReply deleteReply={deleteReply}>
        <DeleteReplyContainer
          setDeleteReply={setDeleteReply}
          comment_id={comment_id}
          rp={rp}
          loadPosts={loadPosts}
        />
      </DeleteReply>
    </>
  );
};

export default Reply;

const CommentSection = styled.div`
  display: flex;
  align-items: start;
  /* margin-top: 10px; */

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
  padding: 5px 10px;
  margin-left: 10px;
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
`;
const ComReply = styled.div`
  display: flex;
  justify-content: end;
  div {
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    width: fit-content;
  }
`;

const ComReplies = styled.div`
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
const DeleteReply = styled.div`
  display: ${(props) => (props.deleteReply ? "" : "none")};
`;
