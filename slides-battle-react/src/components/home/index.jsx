import React from "react";
import { useConfigurationManager } from "../../modules/configuration";
import { Configuration } from "../configuration";
import { Page } from "../layout";
import { Button } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

const defaultPlayers = [
  {
    id: 1,
    name: "Batman",
    isEnabled: true,
  },
  {
    id: 2,
    name: "Joker",
    isEnabled: true,
  },
  {
    id: 3,
    name: "Harley Quinn",
    isEnabled: true,
  },
];

const defaultThemes = [
  {
    id: 1,
    name: "Comics",
    isEnabled: true,
  },
  {
    id: 2,
    name: "Movies",
    isEnabled: true,
  },
  {
    id: 3,
    name: "Culture",
    isEnabled: false,
  },
  {
    id: 4,
    name: "Medical",
    isEnabled: true,
  },
];

export const Home = () => {
  const {
    players,
    themes,
    removePlayer,
    removeTheme,
    updatePlayer,
    updateTheme,
    addPlayer,
    addTheme,
    isConfigurationOpened,
    closeConfiguration,
    openConfiguration,
  } = useConfigurationManager({
    defaultPlayers,
    defaultThemes,
  });

  const configurationProps = {
    players,
    themes,
    removePlayer,
    removeTheme,
    updatePlayer,
    updateTheme,
    addPlayer,
    addTheme,
    isConfigurationOpened,
    closeConfiguration,
  };

  return (
    <Page>
      <div>
        <Button
          variant="contained"
          aria-label="open"
          color="primary"
          startIcon={<Settings />}
          onClick={openConfiguration}
        >
          Configuration
        </Button>
      </div>
      <Configuration {...configurationProps} />
    </Page>
  );
};
