import React, { useContext } from "react";
import { AiOutlineGroup } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../context/AuthContext/AuthContext";
import ProfileImage from "./ProfileImage";

const RightSideFeed = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Item>
        <ItemLink>
          <BsPeopleFill className="icons" />

          <p>Your Friends</p>
        </ItemLink>
      </Item>
      <ItemList>
        {items.map((item) => (
          <ItemLink>
            <ProfileImage size={35} link={"asdasd"} />
            <p>James Conver</p>
          </ItemLink>
        ))}

        {/* <hr /> */}
      </ItemList>
    </Container>
  );
};

export default RightSideFeed;

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
const ItemList = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  border-radius: 5px;
  padding: 10px;

  margin-bottom: 10px;
  p {
    letter-spacing: 1.2px;
    margin-left: 10px;
  }
  .icons {
    font-size: 35px;
  }

  a {
    border-top: 1px solid #353942;
  }

  a:nth-child(1) {
    border-top: none;
  }
`;
