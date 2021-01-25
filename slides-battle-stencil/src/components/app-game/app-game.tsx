import { Component, h, Host, Listen, Prop, State } from "@stencil/core";
import { RouterHistory } from "@stencil/router";
import { GameStatusEnum } from "../../enums";
import { IGame, IPlayerGame, ITopicGame } from "../../interfaces";
import { lazyInject } from "../../services/container.ioc";
import { GAME_SERVICE, IGameService } from "../../services/game";

@Component({
    tag: 'app-game',
    styleUrl: 'app-game.css',
    shadow: true
})
export class AppGame {

    @lazyInject(GAME_SERVICE) private gameSrv: IGameService;

    @Prop() history!: RouterHistory;

    @State() game: IGame;

    @State() isReadyForNextTurn: boolean = true;

    private gameStatus: GameStatusEnum;

    private currentPlayer: IPlayerGame;

    private currentTopic: ITopicGame;

    private wheelsEl: HTMLAppGameWheelsElement;

    private actionsEl: HTMLAppGameActionsElement;

    @Listen('app-game-actions-click')
    async onActionTriggered() {
        if (this.isReadyForNextTurn) {
            await this.performTurn();
        } else {
            await this.prepareNextTurn();
        }
    }

    async componentWillLoad() {
        this.game = await this.gameSrv.createGame(3);
        this.gameStatus = await this.gameSrv.getGameStatus(this.game.id);
    }

    private async performTurn() {
        await this.actionsEl.disabledButton();

        if (this.gameStatus !== GameStatusEnum.ENDED) {
            const { player, topic } = await this.wheelsEl.drawNextRound();
            if (this.gameStatus !== GameStatusEnum.LAST_TURN) {
                this.currentPlayer = this.game.players.find(({ id }) => player?.id === id);
            }
            this.currentTopic = this.game.topics.find(({ id }) => topic?.id === id);
            await this.actionsEl.enabledButton();
            this.isReadyForNextTurn = false;
        }
    }

    private async prepareNextTurn() {
        const newGameState = await this.gameSrv.updateGameState(this.game.id)(this.currentPlayer.id, [this.currentTopic.id]);
        const newGameStatus = await this.gameSrv.getGameStatus(this.game.id);

        if (newGameStatus === GameStatusEnum.ENDED) {
            this.gameSrv.deleteGame(this.game.id);
            this.history.push('/', {});
        }

        this.game = newGameState;
        this.gameStatus = newGameStatus;
        this.currentTopic = undefined;
        this.currentPlayer = this.gameStatus === GameStatusEnum.LAST_TURN ?
            this.game.players.filter(({ hasBeenPlayed }) => !hasBeenPlayed)[0] :
            undefined;
        this.isReadyForNextTurn = true;
    }

    render() {
        return (<Host>
            <app-game-header
                gameStatus={this.gameStatus}
                currentPlayer={this.currentPlayer}
                currentTopic={this.currentTopic}
                isReadyForNextTurn={this.isReadyForNextTurn}
            ></app-game-header>
            {this.gameStatus !== GameStatusEnum.ENDED &&
                <app-game-wheels
                    ref={(el) => this.wheelsEl = el}
                    players={this.game.players.filter(({ hasBeenPlayed }) => !hasBeenPlayed)}
                    topics={this.game.topics.filter(({ hasBeenPlayed }) => !hasBeenPlayed)}
                >
                </app-game-wheels>
            }
            <app-game-actions
                ref={(el) => this.actionsEl = el}
                gameStatus={this.gameStatus}
                isReadyForNextTurn={this.isReadyForNextTurn}
            ></app-game-actions>
        </Host>);
    }
}