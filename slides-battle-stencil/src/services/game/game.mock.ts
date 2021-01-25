import { injectable } from "inversify";
import { IGameService } from "./game.interface";

@injectable()
export class GameMock implements IGameService {
    async createGame(numberOfPlayers: number) {
        console.log("[GameMock] createGame", numberOfPlayers);
        return undefined;
    }
    async retrieveGame(id: string) {
        console.log("[GameMock] retrieveGame", id);
        return undefined;
    }

    async deleteGame(id: string) {
        console.log("[GameMock] deleteGame", id);
        return undefined;
    }

    updateGameState(id: string) {
        return async (playerId: string, topicsId: ReadonlyArray<string>) => {
            console.log("[GameMock] updateGameState", id, playerId, topicsId);
            return undefined;
        };
    }

    async getGameStatus(id: string) {
        console.log("[GameMock] getGameStatus", id);
        return undefined;
    }

    async isDefaultTopic(id: string) {
        console.log("[GameMock] isDefaultTopic", id);
        return true;
    }
}
