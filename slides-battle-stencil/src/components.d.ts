/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IItemConfiguration, IPlayerConfiguration, IPlayerGame, ITopicConfiguration, ITopicGame } from "./interfaces";
import { RouterHistory } from "@stencil/router";
import { GameStatusEnum } from "./enums";
export namespace Components {
    interface AppConfigurationPlayers {
    }
    interface AppConfigurationTopics {
    }
    interface AppConfigurations {
    }
    interface AppConfigurationsPlayer {
        "player": IPlayerConfiguration;
    }
    interface AppConfigurationsTopic {
        "topic": ITopicConfiguration;
    }
    interface AppGame {
        "history": RouterHistory;
    }
    interface AppGameActions {
        "disabledButton": () => Promise<void>;
        "enabledButton": () => Promise<void>;
        "gameStatus": GameStatusEnum;
        "isReadyForNextTurn": boolean;
    }
    interface AppGameHeader {
        "currentPlayer": IPlayerGame;
        "currentTopic": ITopicGame;
        "gameStatus": GameStatusEnum;
        "isReadyForNextTurn": boolean;
    }
    interface AppGameTopicSelector {
        "topics": ReadonlyArray<ITopicGame>;
    }
    interface AppGameWheels {
        "drawNextRound": () => Promise<{ player: IPlayerGame; topic: ITopicGame; }>;
        "players": ReadonlyArray<IPlayerGame>;
        "topics": ReadonlyArray<ITopicGame>;
    }
    interface AppHeader {
    }
    interface AppHome {
    }
    interface AppRandomWheel {
        "cursorSize": number;
        "data": ReadonlyArray<IItemConfiguration>;
        "draw": () => Promise<IItemConfiguration>;
        "height": number;
        "padding": number;
        "radius": number;
        "rotationDuration": number;
        "width": number;
    }
    interface AppRoot {
    }
}
declare global {
    interface HTMLAppConfigurationPlayersElement extends Components.AppConfigurationPlayers, HTMLStencilElement {
    }
    var HTMLAppConfigurationPlayersElement: {
        prototype: HTMLAppConfigurationPlayersElement;
        new (): HTMLAppConfigurationPlayersElement;
    };
    interface HTMLAppConfigurationTopicsElement extends Components.AppConfigurationTopics, HTMLStencilElement {
    }
    var HTMLAppConfigurationTopicsElement: {
        prototype: HTMLAppConfigurationTopicsElement;
        new (): HTMLAppConfigurationTopicsElement;
    };
    interface HTMLAppConfigurationsElement extends Components.AppConfigurations, HTMLStencilElement {
    }
    var HTMLAppConfigurationsElement: {
        prototype: HTMLAppConfigurationsElement;
        new (): HTMLAppConfigurationsElement;
    };
    interface HTMLAppConfigurationsPlayerElement extends Components.AppConfigurationsPlayer, HTMLStencilElement {
    }
    var HTMLAppConfigurationsPlayerElement: {
        prototype: HTMLAppConfigurationsPlayerElement;
        new (): HTMLAppConfigurationsPlayerElement;
    };
    interface HTMLAppConfigurationsTopicElement extends Components.AppConfigurationsTopic, HTMLStencilElement {
    }
    var HTMLAppConfigurationsTopicElement: {
        prototype: HTMLAppConfigurationsTopicElement;
        new (): HTMLAppConfigurationsTopicElement;
    };
    interface HTMLAppGameElement extends Components.AppGame, HTMLStencilElement {
    }
    var HTMLAppGameElement: {
        prototype: HTMLAppGameElement;
        new (): HTMLAppGameElement;
    };
    interface HTMLAppGameActionsElement extends Components.AppGameActions, HTMLStencilElement {
    }
    var HTMLAppGameActionsElement: {
        prototype: HTMLAppGameActionsElement;
        new (): HTMLAppGameActionsElement;
    };
    interface HTMLAppGameHeaderElement extends Components.AppGameHeader, HTMLStencilElement {
    }
    var HTMLAppGameHeaderElement: {
        prototype: HTMLAppGameHeaderElement;
        new (): HTMLAppGameHeaderElement;
    };
    interface HTMLAppGameTopicSelectorElement extends Components.AppGameTopicSelector, HTMLStencilElement {
    }
    var HTMLAppGameTopicSelectorElement: {
        prototype: HTMLAppGameTopicSelectorElement;
        new (): HTMLAppGameTopicSelectorElement;
    };
    interface HTMLAppGameWheelsElement extends Components.AppGameWheels, HTMLStencilElement {
    }
    var HTMLAppGameWheelsElement: {
        prototype: HTMLAppGameWheelsElement;
        new (): HTMLAppGameWheelsElement;
    };
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppRandomWheelElement extends Components.AppRandomWheel, HTMLStencilElement {
    }
    var HTMLAppRandomWheelElement: {
        prototype: HTMLAppRandomWheelElement;
        new (): HTMLAppRandomWheelElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-configuration-players": HTMLAppConfigurationPlayersElement;
        "app-configuration-topics": HTMLAppConfigurationTopicsElement;
        "app-configurations": HTMLAppConfigurationsElement;
        "app-configurations-player": HTMLAppConfigurationsPlayerElement;
        "app-configurations-topic": HTMLAppConfigurationsTopicElement;
        "app-game": HTMLAppGameElement;
        "app-game-actions": HTMLAppGameActionsElement;
        "app-game-header": HTMLAppGameHeaderElement;
        "app-game-topic-selector": HTMLAppGameTopicSelectorElement;
        "app-game-wheels": HTMLAppGameWheelsElement;
        "app-header": HTMLAppHeaderElement;
        "app-home": HTMLAppHomeElement;
        "app-random-wheel": HTMLAppRandomWheelElement;
        "app-root": HTMLAppRootElement;
    }
}
declare namespace LocalJSX {
    interface AppConfigurationPlayers {
    }
    interface AppConfigurationTopics {
    }
    interface AppConfigurations {
    }
    interface AppConfigurationsPlayer {
        "onApp-configurations-player_player-change"?: (event: CustomEvent<IPlayerConfiguration>) => void;
        "onApp-configurations-player_player-delete"?: (event: CustomEvent<string>) => void;
        "player"?: IPlayerConfiguration;
    }
    interface AppConfigurationsTopic {
        "onApp-configurations-topic_topic-change"?: (event: CustomEvent<ITopicConfiguration>) => void;
        "onApp-configurations-topic_topic-delete"?: (event: CustomEvent<string>) => void;
        "topic"?: ITopicConfiguration;
    }
    interface AppGame {
        "history": RouterHistory;
    }
    interface AppGameActions {
        "gameStatus"?: GameStatusEnum;
        "isReadyForNextTurn"?: boolean;
        "onApp-game-actions-click"?: (event: CustomEvent<void>) => void;
    }
    interface AppGameHeader {
        "currentPlayer"?: IPlayerGame;
        "currentTopic"?: ITopicGame;
        "gameStatus"?: GameStatusEnum;
        "isReadyForNextTurn"?: boolean;
    }
    interface AppGameTopicSelector {
        "onApp-game-topic-selection"?: (event: CustomEvent<ITopicGame>) => void;
        "topics"?: ReadonlyArray<ITopicGame>;
    }
    interface AppGameWheels {
        "players"?: ReadonlyArray<IPlayerGame>;
        "topics"?: ReadonlyArray<ITopicGame>;
    }
    interface AppHeader {
    }
    interface AppHome {
    }
    interface AppRandomWheel {
        "cursorSize"?: number;
        "data"?: ReadonlyArray<IItemConfiguration>;
        "height"?: number;
        "padding"?: number;
        "radius"?: number;
        "rotationDuration"?: number;
        "width"?: number;
    }
    interface AppRoot {
    }
    interface IntrinsicElements {
        "app-configuration-players": AppConfigurationPlayers;
        "app-configuration-topics": AppConfigurationTopics;
        "app-configurations": AppConfigurations;
        "app-configurations-player": AppConfigurationsPlayer;
        "app-configurations-topic": AppConfigurationsTopic;
        "app-game": AppGame;
        "app-game-actions": AppGameActions;
        "app-game-header": AppGameHeader;
        "app-game-topic-selector": AppGameTopicSelector;
        "app-game-wheels": AppGameWheels;
        "app-header": AppHeader;
        "app-home": AppHome;
        "app-random-wheel": AppRandomWheel;
        "app-root": AppRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-configuration-players": LocalJSX.AppConfigurationPlayers & JSXBase.HTMLAttributes<HTMLAppConfigurationPlayersElement>;
            "app-configuration-topics": LocalJSX.AppConfigurationTopics & JSXBase.HTMLAttributes<HTMLAppConfigurationTopicsElement>;
            "app-configurations": LocalJSX.AppConfigurations & JSXBase.HTMLAttributes<HTMLAppConfigurationsElement>;
            "app-configurations-player": LocalJSX.AppConfigurationsPlayer & JSXBase.HTMLAttributes<HTMLAppConfigurationsPlayerElement>;
            "app-configurations-topic": LocalJSX.AppConfigurationsTopic & JSXBase.HTMLAttributes<HTMLAppConfigurationsTopicElement>;
            "app-game": LocalJSX.AppGame & JSXBase.HTMLAttributes<HTMLAppGameElement>;
            "app-game-actions": LocalJSX.AppGameActions & JSXBase.HTMLAttributes<HTMLAppGameActionsElement>;
            "app-game-header": LocalJSX.AppGameHeader & JSXBase.HTMLAttributes<HTMLAppGameHeaderElement>;
            "app-game-topic-selector": LocalJSX.AppGameTopicSelector & JSXBase.HTMLAttributes<HTMLAppGameTopicSelectorElement>;
            "app-game-wheels": LocalJSX.AppGameWheels & JSXBase.HTMLAttributes<HTMLAppGameWheelsElement>;
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-random-wheel": LocalJSX.AppRandomWheel & JSXBase.HTMLAttributes<HTMLAppRandomWheelElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
        }
    }
}
