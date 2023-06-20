import { clear } from "@testing-library/user-event/dist/clear";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import styled from "styled-components";
import FeedHeader from "../components/FeedHeader";
import Login from "./Login";
import Register from "./Register";
import ProfileAvatar from "../assets/profileAvatar.png";
import AuthContext from "../context/AuthContext/AuthContext";

const Settings = () => {
  const nameRef = useRef();

  const [file, setfile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [nameError, setNameError] = useState(null);

  const { user, checkUser } = useContext(AuthContext);

  const API = axios.create({
    baseURL: "http://localhost:8080/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("sri_forum_user")) {
      req.headers.authorization = `Bearer ${JSON.parse(
        localStorage.getItem("sri_forum_user")
      )}`;
    }
    return req;
  });

  const setPreview = (file) => {
    console.log(file);
    if (file == null) {
      setPreviewUrl(null);
    } else {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file[0]);
      // console.log(objectUrl);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      // setPreviewUrl(objectUrl.slice(5));
    }
  };

  const handleProfilePictureUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file[0]);
    API.put("user/update-user-profile", formData)
      .then((res) => {
        console.log(res);
        checkUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUsernameUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;

    if (name.length <= 0) {
      setNameError("Firstname cannot be empty");
    } else {
      API.put("user/update-user-name", { name: name })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const handleUserDelete = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;

    API.put("user/update-user-name", { name: name })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <FeedHeader />
      <Container>
        <Item>
          <Title>Update Profile Picture</Title>
          <Form onSubmit={(e) => handleProfilePictureUpdate(e)}>
            <ProfileImageArea>
              <UploadLabel htmlFor="uploaded-img">
                <AiFillFileImage size={30} />
              </UploadLabel>
              <ProfileImage>
                <img
                  src={
                    previewUrl == null
                      ? user != null
                        ? user.profileUrl
                        : ProfileAvatar
                      : previewUrl
                  }
                  alt=""
                />
              </ProfileImage>
            </ProfileImageArea>

            <UploadInput
              type="file"
              id="uploaded-img"
              onChange={(e) => {
                setPreview(e.target.files);
                setfile(e.target.files);
              }}
            />

            <Button type="submit">Update</Button>
          </Form>
        </Item>
        <Item>
          <Row>
            <Label>Email</Label>
            <DetailLabel>{user != null ? user.email : ""}</DetailLabel>
          </Row>
          <Row>
            <Label>Joined at</Label>
            <DetailLabel>
              {user != null ? user.created_at.slice(0, 10) : ""}
            </DetailLabel>
          </Row>
        </Item>
        <Item>
          <Title>Update Your Name</Title>
          <Form onSubmit={(e) => handleUsernameUpdate(e)}>
            <Row>
              <Input
                type="text"
                ref={nameRef}
                defaultValue={user != null ? user.name : ""}
              />
            </Row>

            <Button type="submit">Update</Button>
          </Form>
        </Item>
        <Item>
          <Title>Remove your account</Title>
          <p style={{ marginBottom: "20px" }}>
            Remember when you delete your account all the posts and comments
            will be deleted
          </p>
          <Button onClick={handleUserDelete} type="submit">
            Delete
          </Button>
        </Item>
      </Container>
    </>
  );
};

export default Settings;

const Container = styled.div`
  padding-top: 120px;
  /* position: absolute; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const Item = styled.div`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  padding: 20px;
  max-width: 768px;
  width: calc(90% - 40px);
`;

const Title = styled.h2`
  margin: 10px 0 15px 0;
  letter-spacing: 1.2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImageArea = styled.div`
  display: flex;
  gap: 20px;
`;

const ProfileImage = styled.div`
  height: 90px;
  width: 90px;
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
  }
`;

const UploadLabel = styled.label`
  box-shadow: 0px 0px 5px 3px #353942;
  background-color: #454b56;
  padding: 20px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
`;

const UploadInput = styled.input`
  visibility: hidden;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-grow: 1;
  font-weight: 600;
`;

const DetailLabel = styled.label`
  display: flex;
  flex-grow: 1;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  letter-spacing: 1.2px;
`;

const Input = styled.input`
  display: flex;
  flex-grow: 1;
  margin-bottom: 15px;
  margin-top: 5px;
  outline: none;
  border: none;
  padding: 10px 15px;
`;

const Button = styled.button`
  text-decoration: none;
  background-color: #00adb5;
  color: #222831;
  padding: 10px 8px;
  border-radius: 4px;
  letter-spacing: 1.4px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #04cdd8;

    color: #222831;
    transition: all 0.2s ease-in-out;
  }
`;
