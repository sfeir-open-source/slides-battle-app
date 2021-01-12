import { IPlayerConfiguration } from './player.interface';
import { ITopicConfiguration } from './topic.interface';

export interface IConfiguration {
    topics: ReadonlyArray<ITopicConfiguration>;
    players: ReadonlyArray<IPlayerConfiguration>;
};