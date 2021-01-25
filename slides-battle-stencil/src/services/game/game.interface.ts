import { GameStatusEnum } from "../../enums";
import { IGame } from "../../interfaces";

export interface IGameService {
    createGame: (numberOfPlayers: number) => Promise<IGame>;
    retrieveGame: (id: string) => Promise<IGame | undefined>;
    deleteGame: (id: string) => Promise<void>;
    updateGameState: (id: string) => (playerId: string, topicsId: ReadonlyArray<string>) => Promise<IGame>;
    getGameStatus: (id: string) => Promise<GameStatusEnum>;
    isDefaultTopic: (id: string) => Promise<Boolean>;
}