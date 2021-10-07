import { inject, injectable } from "inversify";
import { GameStatusEnum } from "../../enums";
import { combinaison, uuidv4 } from "../../helpers";
import { IGame, IPlayerConfiguration, IPlayerGame, ITopicConfiguration, ITopicGame } from "../../interfaces";
import { IPlayersConfigurationService, PLAYERS_CONFIGURATION_SERVICE } from "../players-configuration";
import { ITopicsConfigurationService, TOPICS_CONFIGURATION_SERVICE } from "../topics-configuration";
import { IGameService } from "./game.interface";

const DEFAULT_TOPIC: ReadonlyArray<ITopicConfiguration> = [
    {
        id: uuidv4(),
        label: `Choix du Speaker`,
        isAvailable: true
    },
    {
        id: uuidv4(),
        label: `Choix du public`,
        isAvailable: true
    }
];

@injectable()
export class GameService implements IGameService {

    @inject(PLAYERS_CONFIGURATION_SERVICE) private playersConfigurationSrv: IPlayersConfigurationService;

    @inject(TOPICS_CONFIGURATION_SERVICE) private topicsConfigurationSrv: ITopicsConfigurationService;

    private games: Map<string, IGame> = new Map<string, IGame>();

    async createGame(numberOfPlayers: number) {

        if (numberOfPlayers <= 1) {
            return Promise.reject(`There should be at least 2 players.`)
        }

        const availablePlayers = this.playersConfigurationSrv.getPlayersConfiguration()
            .filter(player => player.isAvailable);
        const availableTopics = this.topicsConfigurationSrv.getTopicsConfiguration()
            .filter(topic => topic.isAvailable);

        //if (availablePlayers.length < numberOfPlayers) {
        //    return Promise.reject(`There is not enough players in the configuration to generate a game. Players available : ${availablePlayers.length}`);
        //}
        //if (availableTopics.length < numberOfPlayers + 1) {
        //    return Promise.reject(`There is not enough topics in the configuration to generate a game. Topics available : ${availableTopics.length}`);
        //}

        //const selectedPlayers = combinaison<IPlayerConfiguration>(availablePlayers, numberOfPlayers);
        //const selectedTopics: ReadonlyArray<ITopicConfiguration> = [
        //    ...combinaison<ITopicConfiguration>(availableTopics, numberOfPlayers),
        //    ...DEFAULT_TOPIC
        //];

        const selectedPlayers = availablePlayers;
        const selectedTopics = [...availableTopics, ...DEFAULT_TOPIC];

        const game: IGame = {
            id: uuidv4(),
            lastPlayerId: undefined,
            lastTopicId: undefined,
            players: selectedPlayers.map<IPlayerGame>(player => ({
                ...player,
                hasBeenPlayed: false
            })),
            topics: selectedTopics.map<ITopicGame>(topic => ({
                ...topic,
                hasBeenPlayed: false
            }))
        };

        this.games.set(game.id, game);

        return Promise.resolve<IGame>(game);
    }

    async retrieveGame(id: string) {
        return Promise.resolve(this.games.get(id));
    }

    async deleteGame(id: string) {
        if (!this.games.has(id)) {
            return Promise.reject('There is no game corresponding');
        }
        this.games.delete(id);
    }

    updateGameState(id: string) {
        if (!this.games.has(id)) {
            return () => Promise.reject('There is no game corresponding');
        }
        return async (playerId: string, topicsId: ReadonlyArray<string>) => {
            const oldGameState = this.games.get(id);
            const newGameState = {
                ...oldGameState,
                lastPlayerId: playerId,
                lastTopicId: topicsId[0],
                players: oldGameState.players.map<IPlayerGame>(player => player.id === playerId ? {
                    ...player,
                    hasBeenPlayed: true
                } : player),
                topics: oldGameState.topics.map<ITopicGame>(topic => topicsId.includes(topic.id) ? {
                    ...topic,
                    hasBeenPlayed: true
                } : topic),
            };
            this.games.set(id, newGameState);
            return Promise.resolve(newGameState);
        }
    }

    async getGameStatus(id: string) {
        if (!this.games.has(id)) {
            return Promise.reject('There is no game corresponding');
        }
        const game = this.games.get(id);
        if (game.players.every(({ hasBeenPlayed }) => hasBeenPlayed)) {
            return Promise.resolve(GameStatusEnum.ENDED);
        } else if (game.players.filter(({ hasBeenPlayed }) => !hasBeenPlayed).length === 1) {
            return Promise.resolve(GameStatusEnum.LAST_TURN);
        }
        return Promise.resolve(GameStatusEnum.ON_GOING);
    }

    isDefaultTopic(id: string) {
        return DEFAULT_TOPIC.map(({ id }) => id).includes(id);
    }
}