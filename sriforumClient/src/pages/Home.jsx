import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Main>
          <H1>
            Welcome to <span>SriHub</span>
          </H1>
          <P>
            Connect with friends and family, share your interests, and join
            communities of like-minded individuals.
          </P>
          <Link href="#" class="button">
            Join Now
          </Link>
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Home;

const Container = styled.section`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.main`
  width: 90%;
  max-width: 1440px;
  height: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const H1 = styled.h1`
  font-size: 45px;
  letter-spacing: 1.9px;
  font-weight: bold;

  span {
    color: #0084b4;
  }
`;

const P = styled.p`
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #ffffffd5;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #00adb5;
  background-color: #222831;
  padding: 10px 8px;
  border-radius: 4px;
  letter-spacing: 1.4px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  border: 5px solid #00adb5;
  &:hover {
    color: #04cdd8;
    border: 5px solid #04cdd8;
    background-color: #222831;
    transition: all 0.2s ease-in-out;
  }
`;
