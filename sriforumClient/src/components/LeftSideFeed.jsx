import React, { useContext } from "react";
import { AiOutlineGroup } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../context/AuthContext/AuthContext";
import ProfileImage from "./ProfileImage";

const LeftSideFeed = () => {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <Item>
        <ItemLink>
          <ProfileImage size={35} link={user != null ? user.currentUrl : ""} />
          <p>
            {user != null ? user.firstname : ""}{" "}
            {user != null ? user.lastname : ""}
          </p>
        </ItemLink>
      </Item>
      <Item>
        <ItemLink>
          <BsPeopleFill className="icons" />
          <p>Friends</p>
        </ItemLink>
      </Item>
      <Item>
        <ItemLink>
          <HiOutlineUserGroup className="icons" />
          <p>Groups</p>
        </ItemLink>
      </Item>
    </Container>
  );
};

export default LeftSideFeed;

const Container = styled.div`
  width: 100%;
  font-size: 13px;
`;

const Item = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  border-radius: 5px;
  padding: 10px;
  height: 44px;
  padding: 5px;
  margin-bottom: 10px;
  p {
    letter-spacing: 1.2px;
    margin-left: 10px;
  }
  .icons {
    font-size: 35px;
  }
`;
const ItemLink = styled(NavLink)`
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  height: calc(100% - 10px);
  color: #eeeeee;
  padding: 5px;
  &:hover {
    background-color: #393e46;
    transition: all 0.2s ease-in-out;
  }
`;
