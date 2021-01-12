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
                label: 'Player 1',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Player 2',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Player 3',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Player 4',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Player 5',
                isAvailable: false
            },
            {
                id: uuidv4(),
                label: 'Player 6',
                isAvailable: true
            },
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