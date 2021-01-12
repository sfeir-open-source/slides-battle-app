import { IItemConfiguration } from "./item-configuration.interface";
import { IItemGame } from "./item-game.interface";

export interface ITopicConfiguration extends IItemConfiguration { };

export interface ITopicGame extends ITopicConfiguration, IItemGame { };