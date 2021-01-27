import React, { useEffect } from "react";
import { Button, Card } from "@material-ui/core";
import { BattleHeader } from "./BattleHeader";
import {
  PlayCircleOutline,
  HighlightOff,
  NavigateNext,
} from "@material-ui/icons";
import { Header } from "../layout/Header";

export const Battle = ({
  isBattleEnabled,
  isBattlePlaying,
  startBattle,
  stopBattle,
  round,
  startRound,
  availablePlayers,
  switchConfiguration,
}) => {
  useEffect(() => {
    if (isBattlePlaying && !round.id) {
      startRound();
    }
  }, [startRound, isBattlePlaying, round]);

  return (
    <>
      <BattleHeader backgroundColor="#433826" onClick={switchConfiguration} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {!isBattlePlaying ? (
          <Button
            style={{ margin: 10 }}
            variant="contained"
            aria-label="startBattle"
            color="primary"
            startIcon={<PlayCircleOutline />}
            onClick={startBattle}
            disabled={!isBattleEnabled}
          >
            Start Battle
          </Button>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{ margin: 10 }}
                variant="contained"
                aria-label="stopBattle"
                color="primary"
                startIcon={<HighlightOff />}
                onClick={stopBattle}
              >
                Stop Battle
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                flex: "1 1 100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!round.id ? null : (
                <Card>
                  <Header
                    header={`Round ${round.id}`}
                    backgroundColor="#654f30"
                  />
                  <div
                    style={{
                      padding: "10px",
                      display: "grid",
                      width: 300,
                      gridTemplate: "auto / 100px auto",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Player</span>
                    <span>{round.player.name}</span>
                    <span style={{ fontWeight: "bold" }}>Theme</span>
                    <span>{round.theme.name}</span>
                  </div>
                </Card>
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{ margin: 10 }}
                variant="contained"
                aria-label="nextRound"
                color="primary"
                startIcon={<NavigateNext />}
                onClick={startRound}
                disabled={availablePlayers.length === 0}
              >
                Next Round
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
