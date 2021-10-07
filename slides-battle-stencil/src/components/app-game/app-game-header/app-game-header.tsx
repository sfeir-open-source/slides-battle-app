import { Component, Host, Prop, h } from "@stencil/core";
import { GameStatusEnum } from "../../../enums";
import { IPlayerGame, ITopicGame } from "../../../interfaces";

@Component({
    tag: 'app-game-header',
    styleUrl: 'app-game-header.css',
    shadow: true
})
export class AppGameHeader {

    @Prop() gameStatus: GameStatusEnum;

    @Prop() currentPlayer: IPlayerGame;

    @Prop() currentTopic: ITopicGame;

    @Prop() isReadyForNextTurn: boolean;

    render() {
        return (<Host>
            {
                this.gameStatus !== GameStatusEnum.ENDED ?
                    this.isReadyForNextTurn ?
                        <p>The game is ready to draw the next round.</p> :
                        <div>
                            <p>Player selected: <span class="emphasis">{this.currentPlayer?.label}</span></p>
                            <p>Topic selected: <span class="emphasis">{this.currentTopic?.label}</span></p>
                        </div> :
                    <p>This game is over.</p>
            }
        </Host>)
    }

}