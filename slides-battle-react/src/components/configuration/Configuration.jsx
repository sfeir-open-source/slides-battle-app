import React from "react";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { ConfigurationHeader } from "./ConfigurationHeader";

export const Configuration = ({
  players,
  themes,
  removePlayer,
  removeTheme,
  updatePlayer,
  updateTheme,
  addPlayer,
  addTheme,
  onClose,
}) => {
  return (
    <>
      <ConfigurationHeader backgroundColor="#433826" onClick={onClose} />
      <div style={{ display: "flex", flexDirection: "row" }}>
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
      </div>
    </>
  );
};
