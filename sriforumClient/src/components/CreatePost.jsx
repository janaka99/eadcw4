import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthContext/AuthContext";
import CreatePostContainer from "./CreatePostContainer";
import ProfileImage from "./ProfileImage";

const CreatePost = ({ setfeedScroll, loadPosts }) => {
  const [createPostView, setCreatePostView] = useState(false);

  const { user } = useContext(AuthContext);

  const handleCreatePostWindowView = () => {
    setCreatePostView(true);
  };

  return (
    <Container>
      <Top>
        <ProfileImage size={35} link={user != null ? user.profileUrl : ""} />
        <Input onClick={handleCreatePostWindowView}>What's on your mind?</Input>
      </Top>
      <hr className="hrLine" />
      <Bottom>
        <Button onClick={handleCreatePostWindowView}>Ask New Quection ?</Button>
      </Bottom>
      <CreatePostWindow createPostView={createPostView}>
        <CreatePostContainer
          setCreatePostView={setCreatePostView}
          loadPosts={loadPosts}
        />
      </CreatePostWindow>
    </Container>
  );
};

export default CreatePost;

const Container = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  padding: 20px;
  border-radius: 5px;

  .hrLine {
    height: 1px;
    background-color: #393e46;
    border: none;
    margin: 15px auto;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.div`
  background-color: #393e46;
  flex-grow: 1;
  margin-left: 15px;
  letter-spacing: 1.2px;
  padding-inline: 15px;
  height: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  border-radius: 30px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  flex-grow: 1;
  padding: 15px 15px;
  text-align: center;
  border-radius: 5px;
  border: none;
  color: #eeeeee;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #393e46;
    transition: all 0.2s ease-in-out;
  }
`;

const CreatePostWindow = styled.div`
  display: ${(props) => (props.createPostView ? "block" : "none")};
`;
