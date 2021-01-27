import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const HeaderContainer = styled.div`
  display: flex;
  padding-left: 15px;
  min-height: 50px;
  align-items: center;
  ${({ backgroundColor = "white" }) => `background-color: ${backgroundColor}`}
`;

export const Header = ({ left, header, right, backgroundColor }) => (
  <HeaderContainer backgroundColor={backgroundColor}>
    {left}

    <Typography
      style={{ flex: "1 1 100%", marginLeft: left ? "15px" : "0" }}
      variant="h6"
      color="secondary"
      component="div"
    >
      {header}
    </Typography>

    {right}
  </HeaderContainer>
);
