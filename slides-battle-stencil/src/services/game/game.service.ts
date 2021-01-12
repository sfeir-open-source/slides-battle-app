import { inject, injectable } from "inversify";
import { combinaison, uuidv4 } from "../../helpers";
import { IGame, IPlayerConfiguration, IPlayerGame, ITopicConfiguration, ITopicGame } from "../../interfaces";
import { IPlayersConfigurationService, PLAYERS_CONFIGURATION_SERVICE } from "../players-configuration";
import { ITopicsConfigurationService, TOPICS_CONFIGURATION_SERVICE } from "../topics-configuration";
import { IGameService } from "./game.interface";

@injectable()
export class GameService implements IGameService {

    @inject(PLAYERS_CONFIGURATION_SERVICE) private playersConfigurationSrv: IPlayersConfigurationService;

    @inject(TOPICS_CONFIGURATION_SERVICE) private topicsConfigurationSrv: ITopicsConfigurationService;

    private games: ReadonlyArray<IGame> = [];

    async createGame(numberOfPlayers: number) {

        if (numberOfPlayers <= 1) {
            return Promise.reject(`There should be at least 2 players.`)
        }

        const availablePlayers = this.playersConfigurationSrv.getPlayersConfiguration()
            .filter(player => player.isAvailable);
        const availableTopics = this.topicsConfigurationSrv.getTopicsConfiguration()
            .filter(topic => topic.isAvailable);

        console.log(availablePlayers, availableTopics)

        if (availablePlayers.length < numberOfPlayers) {
            return Promise.reject(`There is not enough players in the configuration to generate a game. Players available : ${availablePlayers.length}`);
        }
        if (availableTopics.length < numberOfPlayers + 1) {
            return Promise.reject(`There is not enough topics in the configuration to generate a game. Topics available : ${availableTopics.length}`);
        }

        const selectedPlayers = combinaison<IPlayerConfiguration>(availablePlayers, numberOfPlayers);
        const selectedTopics: ReadonlyArray<ITopicConfiguration> = [
            ...combinaison<ITopicConfiguration>(availableTopics, numberOfPlayers),
            {
                id: uuidv4(),
                label: `Speaker's Choice`,
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: `Public's Choice`,
                isAvailable: true
            }
        ];

        const game: IGame = {
            id: uuidv4(),
            currentPlayerId: undefined,
            currentTopicId: undefined,
            players: selectedPlayers.map<IPlayerGame>(player => ({
                ...player,
                hasBeenPlayed: false
            })),
            topics: selectedTopics.map<ITopicGame>(topic => ({
                ...topic,
                hasBeenPlayed: false
            }))
        };

        this.games = [...this.games, game];

        return Promise.resolve<IGame>(game);
    }

    //@ts-ignore
    retrieveGame(id: string) {
        return undefined;
    }
}