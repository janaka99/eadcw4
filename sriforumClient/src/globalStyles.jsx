import styled from "styled-components";

import React from "react";

const globalStyles = () => {
  return <Button>global.css</Button>;
};

export default globalStyles;

const button = styled.a`
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

const headerLinkstyl = styled.div``;
