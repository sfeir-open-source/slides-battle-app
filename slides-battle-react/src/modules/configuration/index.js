import { useState } from "react";
import { useItemsManager } from "../items";

export const useConfigurationManager = ({
  defaultPlayers = [],
  defaultThemes = [],
}) => {
  const {
    items: players,
    add: addPlayer,
    update: updatePlayer,
    remove: removePlayer,
  } = useItemsManager(defaultPlayers);

  const {
    items: themes,
    add: addTheme,
    update: updateTheme,
    remove: removeTheme,
  } = useItemsManager(defaultThemes);

  const [isConfigurationOpened, setConfigurationOpened] = useState(false);

  const closeConfiguration = () => setConfigurationOpened(false);

  const openConfiguration = () => setConfigurationOpened(true);

  return {
    players,
    addPlayer,
    updatePlayer,
    removePlayer,
    themes,
    addTheme,
    updateTheme,
    removeTheme,
    isConfigurationOpened,
    closeConfiguration,
    openConfiguration,
  };
};
