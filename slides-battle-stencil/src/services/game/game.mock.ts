import { injectable } from "inversify";
import { IGameService } from "./game.interface";

@injectable()
export class GameMock implements IGameService {
    createGame(numberOfPlayers: number) {
        console.log("[GameMock] createGame", numberOfPlayers);
        return undefined;
    }
    retrieveGame(id: string) {
        console.log("[GameMock] retrieveGame", id);
        return undefined;
    }
}
