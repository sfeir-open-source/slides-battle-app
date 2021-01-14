import React from "react";
import { IconButton } from "@material-ui/core";
import { Settings, VideogameAsset } from "@material-ui/icons";
import { Header } from "../layout/Header";

export const BattleHeader = ({ backgroundColor, onClick }) => (
  <Header
    backgroundColor={backgroundColor}
    left={<VideogameAsset color="secondary" />}
    header="Battle"
    right={
      <IconButton color="secondary" aria-label="settings" onClick={onClick}>
        <Settings />
      </IconButton>
    }
  />
);
