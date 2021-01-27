import { useItemsManager } from "../items";

export const useConfigurationManager = (
  defaultPlayers = [
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
  ],
  defaultThemes = [
    {
      id: 1,
      name: "Speaker's Choice",
      isEnabled: true,
      isLocked: true,
    },
    {
      id: 2,
      name: "Public's Choice",
      isEnabled: true,
      isLocked: true,
    },
    {
      id: 3,
      name: "Comics",
      isEnabled: true,
    },
    {
      id: 4,
      name: "Movies",
      isEnabled: true,
    },
    {
      id: 3,
      name: "Culture",
      isEnabled: true,
    },
    {
      id: 4,
      name: "Medical",
      isEnabled: true,
    },
  ]
) => {
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

  return {
    players,
    addPlayer,
    updatePlayer,
    removePlayer,
    themes,
    addTheme,
    updateTheme,
    removeTheme,
  };
};
