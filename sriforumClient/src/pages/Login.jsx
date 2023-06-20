import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import FeedHeader from "../components/FeedHeader";
import AuthContext from "../context/AuthContext/AuthContext";

const Login = () => {
  const { login, error } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState({
    type: null,
    message: null,
  });
  const [pw1Error, setPw1Error] = useState({
    type: null,
    message: null,
  });

  const setEveryErrorStateToNull = () => {
    setEmailError({ type: null, message: null });
    setPw1Error({ type: null, message: null });
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    setEveryErrorStateToNull();
    if (password.length <= 0 || email == null) {
      if (password.length <= 0) {
        setPw1Error({
          type: "error",
          message: "Password must not be empty",
        });
      }
      if (password.length > 0) {
        setPw1Error({ type: null, message: null });
      }
      if (email == null) {
        setEmailError({
          type: "error",
          message: "Email must not be empty",
        });
      }
    } else {
      setEveryErrorStateToNull();
      console.log(email, password);
      const user = {
        email: email,
        password: password,
      };
      login(user);
    }
  };

  return (
    <>
      <FeedHeader />
      <Container>
        <Content>
          <Form onSubmit={(e) => handleLoginForm(e)}>
            <Row>
              <h1>Login User</h1>
            </Row>
            <Row>
              <Label>Email</Label>
              <Input
                placeholder="Email.."
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error == null ? (
                <ErrorMessage eType={emailError.type}>
                  {emailError.message} &nbsp;
                </ErrorMessage>
              ) : (
                error.map((err) => {
                  if (err.path == "email") {
                    return (
                      <ErrorMessage eType={"error"}>
                        {err.message}
                        &nbsp;
                      </ErrorMessage>
                    );
                  }
                })
              )}
            </Row>
            <Row>
              <Label>Password</Label>
              <Input
                placeholder="Password.."
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error == null ? (
                <ErrorMessage eType={pw1Error.type}>
                  {pw1Error.message} &nbsp;
                </ErrorMessage>
              ) : (
                error.map((err) => {
                  if (err.path == "password") {
                    return (
                      <ErrorMessage eType={"error"}>
                        {err.message}
                        &nbsp;
                      </ErrorMessage>
                    );
                  }
                })
              )}
            </Row>

            <Row>
              <Button type="submit">Login</Button>
            </Row>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  max-width: 500px;
  padding: 20px;
  flex-grow: 1;
  min-width: 300px;
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  position: relative;
  margin-bottom: 15px;
  h1 {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1.2px;
  }
`;

const Input = styled.input`
  margin-left: 10px;
  flex-grow: 1;
  padding: 10px 5px;
  background-color: #454b56;
  color: #eeeeee;
  outline: none;
`;

const Label = styled.label`
  letter-spacing: 1.2px;
  font-size: 15px;
  font-weight: 500;
`;

const Button = styled.button`
  text-decoration: none;
  color: #00adb5;
  background-color: #222831;
  padding: 10px 8px;
  border-radius: 4px;
  letter-spacing: 1.4px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  border: 5px solid #00adb5;
  margin-top: 20px;
  &:hover {
    color: #04cdd8;
    border: 5px solid #04cdd8;
    background-color: #222831;
    transition: all 0.2s ease-in-out;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  position: absolute;
  bottom: -20px;
  right: 0;
  font-weight: 500;
  color: ${(props) => (props.eType == "error" ? "#ea0000e8" : "#02ff02a1")};
`;
