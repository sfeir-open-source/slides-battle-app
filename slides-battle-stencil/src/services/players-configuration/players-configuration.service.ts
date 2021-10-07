import { injectable } from "inversify";
import { uuidv4 } from "../../helpers";
import { IPlayerConfiguration } from "../../interfaces";
import { IPlayersConfigurationService } from "./players-configuration.interface";

@injectable()
export class PlayersConfigurationService implements IPlayersConfigurationService {

    private playersConfiguration: ReadonlyArray<IPlayerConfiguration>;

    constructor() {
        this.playersConfiguration = [
            {
                id: uuidv4(),
                label: 'Jean-François',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Célia',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Aziz',
                isAvailable: true
            },
            //{
            //    id: uuidv4(),
            //    label: 'Mystery speaker',
            //    isAvailable: true
            //},
        ];
    }

    getPlayersConfiguration() {
        return this.playersConfiguration;
    }
    addPlayer(label: string) {
        this.playersConfiguration = [
            ...this.playersConfiguration,
            {
                id: uuidv4(),
                label,
                isAvailable: true
            }
        ]
        return this.playersConfiguration;
    }
    modifyPlayer(player: IPlayerConfiguration) {
        this.playersConfiguration = [
            ...this.playersConfiguration.filter(playerConfiguration => playerConfiguration.id !== player.id),
            player
        ];
        return this.playersConfiguration;
    }
    removePlayer(id: string) {
        this.playersConfiguration = this.playersConfiguration.filter(playerConfiguration => playerConfiguration.id !== id);
        return this.playersConfiguration;
    }
}