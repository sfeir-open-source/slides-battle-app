import React from "react";
import { CircularProgress } from "@material-ui/core";
import styled, { css } from "styled-components";
import { Typography } from "@material-ui/core";
import img from "../../assets/images/vintage-mic.jpg";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${img});
  background-size: cover;
  min-height: 100vh;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-size: cover;
  background-position: center;
  color: white;
  background-color: rgba(25, 17, 6, 0.5);
  padding: calc(3.333% + 10px) 0 10px;

  --mask-path: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,200 L0,0 A373.333,373.333 0 0 0 100,0 L100,200 Z' /%3E%3C/svg%3E");
  -webkit-mask-image: var(--mask-path);
  mask-image: var(--mask-path);
  -webkit-mask-position: top;
  mask-position: top;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-clip: padding;
  mask-clip: padding-box;

  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(25, 17, 6, 0.5);
  background-position: center;
  padding: 10px 0 calc(3.333% + 10px);

  --mask-path: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,200 A373.333,373.333 0 0 1 100,200 L100,0 Z' /%3E%3C/svg%3E");
  -webkit-mask-image: var(--mask-path);
  mask-image: var(--mask-path);
  -webkit-mask-position: bottom;
  mask-position: bottom;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-clip: padding;
  mask-clip: padding-box;

  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Page = ({ children }) => (
  <Background>
    <Header>
      <Typography
        style={{ flex: "1 1 100%" }}
        variant="h6"
        color="secondary"
        component="div"
      >
        Slides Battle
      </Typography>
    </Header>
    <Content>{children}</Content>
    <Footer>
      <Typography variant="h6" color="secondary" component="div">
        SFEIR 2021
      </Typography>
    </Footer>
  </Background>
);

const LoaderContainer = styled.div`
  left: 50%;
  top: 50%;
  position: absolute;
  width: 80px;
  margin-left: -40px;
  height: 80px;
  margin-top: -40px;

  ${(props) =>
    !props.isLoading &&
    css`
      display: none;
    `};
`;

export const Loader = ({ isLoading }) => (
  <LoaderContainer isLoading={isLoading}>
    <CircularProgress />
  </LoaderContainer>
);
