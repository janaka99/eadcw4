import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Flash from "./Flash";

const Header = () => {
  const navRef = useRef();

  const [hide, setHide] = useState(true);

  const handleNavBarVisibility = () => {
    setHide(!hide);
    if (hide === true) {
      navRef.current.classList.add("show");
    } else {
      navRef.current.classList.remove("show");
    }
  };

  return (
    <HeaderBar>
      <Flash />
      <Div>
        <Logo href="/">Sri Forum</Logo>
        <Nav ref={navRef}>
          <Ul>
            <Li>
              <Link href="#">Home</Link>
            </Li>
            <Li>
              <Link href="#">About</Link>
            </Li>
            <Li>
              <Link href="#">Contact</Link>
            </Li>
          </Ul>
        </Nav>
        <BurgerMenuItems onClick={handleNavBarVisibility}>
          {hide ? <BurgerMenu /> : <LineClose />}
        </BurgerMenuItems>
      </Div>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  background-color: #222831;
  color: #eeeeee;

  text-align: center;
  height: 70px;
  width: 100%;
  position: relative;
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

const Logo = styled.a`
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  color: #00adb5;
`;

const Nav = styled.nav`
  display: flex;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 70px;
    width: 100%;
    background-color: #0084b4;

    transition: all 0.2s ease-in-out;
    height: calc(100vh - 70px);
    left: 0;
    transform: translateX(100%);
  }
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    gap: 0px;
  }
`;

const Li = styled.li``;

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
  }
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
