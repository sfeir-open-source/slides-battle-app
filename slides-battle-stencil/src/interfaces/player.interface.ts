import { IItemConfiguration } from "./item-configuration.interface";
import { IItemGame } from "./item-game.interface";

export interface IPlayerConfiguration extends IItemConfiguration { };

export interface IPlayerGame extends IPlayerConfiguration, IItemGame { };
