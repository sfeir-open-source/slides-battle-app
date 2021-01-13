import React from "react";
import { Card, IconButton, Typography } from "@material-ui/core";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { ConfigurationHeader } from "./ConfigurationHeader";
import { Close } from "@material-ui/icons";

export const Configuration = ({
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
}) => {
  // Do not display the Configuration
  if (!isConfigurationOpened) return null;

  return (
    <div
      style={{
        backgroundColor: "#8080804d",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Card
        variant="outlined"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-250px",
          marginLeft: "-250px",
          zIndex: 1,
          minWidth: 500,
        }}
      >
        <ConfigurationHeader backgroundColor="#433826">
          <Typography
            style={{ flex: "1 1 100%" }}
            variant="h6"
            color="secondary"
            component="div"
          >
            Configuration
          </Typography>

          <IconButton
            color="secondary"
            aria-label="close"
            onClick={closeConfiguration}
          >
            <Close />
          </IconButton>
        </ConfigurationHeader>
        <ConfigurationPanel
          header="Themes"
          values={themes}
          remove={removeTheme}
          update={updateTheme}
          add={addTheme}
        />
        <ConfigurationPanel
          header="Players"
          values={players}
          remove={removePlayer}
          update={updatePlayer}
          add={addPlayer}
        />
      </Card>
    </div>
  );
};
