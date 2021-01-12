import { IPlayerConfiguration } from "../../interfaces";

export interface IPlayersConfigurationService {
    getPlayersConfiguration: () => ReadonlyArray<IPlayerConfiguration>;
    addPlayer: (label: string) => ReadonlyArray<IPlayerConfiguration>;
    modifyPlayer: (player: IPlayerConfiguration) => ReadonlyArray<IPlayerConfiguration>;
    removePlayer: (id: string) => ReadonlyArray<IPlayerConfiguration>;
}