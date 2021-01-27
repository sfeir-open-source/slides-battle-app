import React from "react";
import { IconButton } from "@material-ui/core";
import { Settings, Close } from "@material-ui/icons";
import { Header } from "../layout/Header";

export const ConfigurationHeader = ({ backgroundColor, onClick }) => (
  <Header
    backgroundColor={backgroundColor}
    left={<Settings color="secondary" />}
    header="Configuration"
    right={
      <IconButton color="secondary" aria-label="close" onClick={onClick}>
        <Close />
      </IconButton>
    }
  />
);
