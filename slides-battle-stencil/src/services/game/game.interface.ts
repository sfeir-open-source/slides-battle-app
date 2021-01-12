import { IGame } from "../../interfaces";

export interface IGameService {
    createGame: (numberOfPlayers: number) => Promise<IGame>
    retrieveGame: (id: string) => IGame;
}