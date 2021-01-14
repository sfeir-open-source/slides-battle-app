import { useCallback, useEffect, useMemo, useState } from "react";

const getRandomNumber = (values) =>
  Math.floor(Math.random() * 10 * values.length);

const pickRandom = (range, setRange) => {
  const index = getRandomNumber(range);
  const value = range[index % range.length];

  setRange(range.filter((x) => x.id !== value.id));

  return value;
};

export const useBattleManager = (themes = [], players = []) => {
  const [isBattlePlaying, setBattlePlaying] = useState(false);
  const [battle, setBattle] = useState([]);
  const [round, setRound] = useState(0);
  const [availableThemes, setThemes] = useState([]);
  const [availablePlayers, setPlayers] = useState([]);

  const reset = useCallback(() => {
    setBattlePlaying(false);
    setBattle([]);
    setRound(0);

    setThemes([...themes.filter((x) => x.isEnabled)]);
    setPlayers([...players.filter((x) => x.isEnabled)]);
  }, [
    setBattle,
    setRound,
    players,
    themes,
    setThemes,
    setPlayers,
    setBattlePlaying,
  ]);

  useEffect(() => reset(), [reset, players, themes]);

  const isBattleEnabled = useMemo(
    () =>
      themes.filter((x) => x.isEnabled).length >=
      players.filter((x) => x.isEnabled).length + 3,
    [themes, players]
  );

  const startBattle = useCallback(() => {
    setBattlePlaying(true);
  }, [setBattlePlaying]);

  const startRound = useCallback(() => {
    const player = pickRandom(availablePlayers, setPlayers);
    const theme = pickRandom(availableThemes, setThemes);

    const newRound = {
      id: battle.length + 1,
      player,
      theme,
    };

    setRound(newRound);
    setBattle([...battle, newRound]);
  }, [setRound, setBattle, availablePlayers, availableThemes, battle]);

  return {
    isBattleEnabled,
    isBattlePlaying,
    startBattle,
    stopBattle: reset,
    battle,
    round,
    startRound,
    availableThemes,
    availablePlayers,
  };
};
