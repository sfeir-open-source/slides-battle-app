import { IPlayerGame } from "./player.interface";
import { ITopicGame } from "./topic.interface";

export interface IGame {
    id: string;
    players: ReadonlyArray<IPlayerGame>;
    topics: ReadonlyArray<ITopicGame>;
    lastPlayerId: string;
    lastTopicId: string;
}