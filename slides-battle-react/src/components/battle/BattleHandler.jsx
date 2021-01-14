import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import { useBattleManager } from "../../modules/battle";
import { Configuration } from "../configuration";
import { useConfigurationManager } from "../../modules/configuration";
import { Battle } from "./Battle";

const displayMode = {
  battle: 1,
  configuration: 2,
};

export const BattleHandler = () => {
  const {
    themes,
    players,
    addTheme,
    addPlayer,
    updateTheme,
    updatePlayer,
    removeTheme,
    removePlayer,
  } = useConfigurationManager();

  const {
    isBattleEnabled,
    isBattlePlaying,
    startBattle,
    stopBattle,
    startRound,
    round,
    availablePlayers,
  } = useBattleManager(themes, players);

  useEffect(() => {
    if (isBattlePlaying && !round.id) {
      startRound();
    }
  }, [startRound, isBattlePlaying, round]);

  const [display, switchDisplay] = useState(displayMode.battle);

  const switchBattle = useCallback(() => switchDisplay(displayMode.battle), [
    switchDisplay,
  ]);

  const switchConfiguration = useCallback(
    () => switchDisplay(displayMode.configuration),
    [switchDisplay]
  );

  return (
    <Modal zIndex={1} margin="-250px 0 0 -400px" backgroundColor="transparent">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 800,
          height: 400,
        }}
      >
        {display === displayMode.battle ? (
          <Battle
            isBattleEnabled={isBattleEnabled}
            isBattlePlaying={isBattlePlaying}
            startBattle={startBattle}
            stopBattle={stopBattle}
            round={round}
            startRound={startRound}
            availablePlayers={availablePlayers}
            switchConfiguration={switchConfiguration}
          />
        ) : null}
        {display === displayMode.configuration ? (
          <Configuration
            players={players}
            themes={themes}
            removePlayer={removePlayer}
            removeTheme={removeTheme}
            updatePlayer={updatePlayer}
            updateTheme={updateTheme}
            addPlayer={addPlayer}
            addTheme={addTheme}
            onClose={switchBattle}
          />
        ) : null}
      </div>
    </Modal>
  );
};
