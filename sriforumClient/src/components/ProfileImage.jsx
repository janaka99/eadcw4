import React from "react";
import styled from "styled-components";
import ProfileAvatar from "../assets/profileAvatar.png";

const ProfileImage = ({ link, size }) => {
  return (
    <Image
      width={size}
      height={size}
      src={
        link == null || link.length <= 0 || link == undefined
          ? ProfileAvatar
          : link
      }
    />
  );
};

export default ProfileImage;

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  background-color: #0c6267;
  padding: 2px;
`;
