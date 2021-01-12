import { injectable } from "inversify";
import { IPlayerConfiguration } from "../../interfaces";
import { IPlayersConfigurationService } from "./players-configuration.interface";

@injectable()
export class PlayersConfigurationMock implements IPlayersConfigurationService {
    getPlayersConfiguration() {
        console.log("[PlayersConfigurationMock] getPlayersConfiguration");
        return [];
    }
    addPlayer(label: string) {
        console.log("[PlayersConfigurationMock] addPlayer", label);
        return [];
    }
    modifyPlayer(player: IPlayerConfiguration) {
        console.log("[PlayersConfigurationMock] addPlayer", player);
        return [];
    }
    removePlayer(id: string) {
        console.log("[PlayersConfigurationMock] removePlayer", id);
        return [];
    }
}