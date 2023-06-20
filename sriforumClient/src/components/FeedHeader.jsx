import React, { useContext, useRef, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import ProfileImage from "./ProfileImage";
import CreatePostContainer from "./CreatePostContainer";
import Flash from "./Flash";
import AuthContext from "../context/AuthContext/AuthContext";

const FeedHeader = () => {
  const navRef = useRef();
  const profileDivRef = useRef();

  const { logOut, user, isAuthenticated } = useContext(AuthContext);

  const [hide, setHide] = useState(true);
  const [profileActive, setProfileActive] = useState(false);
  const [profileDataHidden, setProfileDataHidden] = useState(true);

  const handleNavBarVisibility = () => {
    setHide(!hide);
    if (hide === true) {
      navRef.current.classList.add("show");
    } else {
      navRef.current.classList.remove("show");
    }
  };

  const handleProfileContainerView = () => {
    setProfileDataHidden(!profileDataHidden);
  };

  return (
    <HeaderBar>
      <Flash />
      <Div>
        <LogoDiv>
          <Logo href="/">Sri Forum</Logo>
        </LogoDiv>
        <Nav ref={navRef}>
          <Ul>
            {isAuthenticated ? (
              <Li>
                <div onClick={handleProfileContainerView}>
                  <ProfileImage
                    size={35}
                    link={user != null ? user.profileUrl : ""}
                  />
                </div>

                {profileDataHidden ? (
                  <></>
                ) : (
                  <ProfileDiv ref={profileDivRef}>
                    <TopContainer to="/profile">
                      <ProfileImage
                        size={35}
                        link={user != null ? user.profileUrl : ""}
                      />
                      <p>{user != null ? user.name : ""}</p>
                    </TopContainer>
                    <HrLine />
                    <BottomContainer>
                      <ul>
                        <PrLink to="/settings">
                          <li>Settings </li>
                        </PrLink>

                        <li onClick={logOut}>Log Out</li>
                      </ul>
                    </BottomContainer>
                  </ProfileDiv>
                )}
              </Li>
            ) : (
              <>
                <Li>
                  {" "}
                  <PrLink to="/register">Register</PrLink>
                </Li>
                <Li>
                  <PrLink to="/login">Log In</PrLink>
                </Li>
              </>
            )}
          </Ul>
        </Nav>
        {/* <BurgerMenuItems onClick={handleNavBarVisibility}>
          {hide ? <BurgerMenu /> : <LineClose />}
        </BurgerMenuItems> */}
      </Div>
    </HeaderBar>
  );
};

export default FeedHeader;

const HeaderBar = styled.header`
  background-color: #222831;
  color: #eeeeee;
  z-index: 111;
  text-align: center;
  height: 70px;
  width: 100%;
  position: fixed;
`;
const Div = styled.div`
  width: 90%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: auto;
  height: 100%;

  .show {
    transform: translateX(0);
    transition: all 0.2s ease-in-out;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.a`
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  color: #00adb5;
`;

const Input = styled.input`
  padding: 15px 25px;
  margin-left: 20px;
  background-color: #393e46;
  outline: none;
  color: darkgray;
  border: none;
  border-radius: 32px;
  min-width: 200px;
  font-size: 16px;
`;

const Nav = styled.nav`
  display: flex;

  /* @media screen and (max-width: 768px) {
    position: absolute;
    top: 70px;
    width: 100%;
    background-color: #0084b4;

    transition: all 0.2s ease-in-out;
    height: calc(100vh - 70px);
    left: 0;
    transform: translateX(100%);
  } */
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;

  /* @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    gap: 0px;
  } */
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #eeeeee;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.9px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #00adb5;
    transition: all 0.2s ease-in-out;
    &::after {
      display: block;
      content: "search";
      padding: 5px 20px;
      background-color: #00adb5;
      position: absolute;
      color: #fff;
      font-size: 14px;
      text-transform: lowercase;
      border-radius: 4px;
      margin-left: -10px;
      margin-top: 10px;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const ProfileDiv = styled.div`
  background-color: #454b56;
  position: absolute;
  top: 55px;

  right: 0;
  max-width: 300px;
  width: 260px;
  height: fit-content;
  padding: 20px;
  box-shadow: 0px 0px 5px 3px #353942;
`;

const TopContainer = styled(NavLink)`
  /* background-color: red; */
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px 3px #353942;
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  p {
    letter-spacing: 1.2px;
    font-weight: 500;
    text-align: left;
  }
  &:hover {
    background-color: #393e46;
    transition: all 0.2s ease-in-out;
  }
`;

const HrLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #393d45;
`;

const BottomContainer = styled.div`
  margin-top: 20px;

  ul {
    list-style: none;
    width: calc(100%);
    li {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #393e46;
        transition: all 0.2s ease-in-out;
      }
    }
  }
`;

const PrLink = styled(NavLink)`
  color: #eeeeee;
  text-decoration: none;
`;

const BurgerMenuItems = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const BurgerMenu = styled(GiHamburgerMenu)`
  font-size: 45px;
`;

const LineClose = styled(AiOutlineClose)`
  font-size: 45px;
`;
