import React, { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import AuthContext from "../context/AuthContext/AuthContext";

const Flash = ({ msg, type }) => {
  const [visible, setVisible] = useState(false);

  const { flashError, flashSuccess } = useContext(AuthContext);

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const handleFlashClose = () => {
    setVisible(false);
  };

  const handleErrors = () => {
    if (flashError != null || flashSuccess != null) {
      setInterval(() => {
        setVisible(true);
      }, 1000);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    handleErrors();
    console.log("11");
  }, [flashError, flashSuccess]);
  return (
    <Container
      visible={visible}
      type={
        flashError != null ? "error" : flashSuccess != null ? "success" : ""
      }
    >
      <Message>
        <P>{flashError != null ? flashError : flashSuccess}</P>
        <FillCloseCircle size={25} onClick={handleFlashClose} />
      </Message>
    </Container>
  );
};

export default Flash;

const Container = styled.div`
  position: absolute;
  top: 75px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50px;
  display: ${(props) => (props.visible == true ? "" : "none")};
`;

const Message = styled.div`
  background-color: ${(props) => (props.type == "error" ? "red" : "green")};
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
`;

const P = styled.p``;

const FillCloseCircle = styled(AiFillCloseCircle)`
  cursor: pointer;
`;
