import { Component, Event, EventEmitter, h, Host, Method, Prop, State } from "@stencil/core";
import { GameStatusEnum } from "../../../enums";

type B_LABEL = "Prepare next turn"
    | "Run next turn"
    | "Run last turn"
    | "Go back to homepage";

@Component({
    tag: 'app-game-actions',
    styleUrl: 'app-game-actions.css',
    shadow: true
})
export class AppGameActions {

    @Prop() gameStatus: GameStatusEnum;

    @Prop() isReadyForNextTurn: boolean;

    @State() isDrawButtonDisabled: boolean = false;

    @Method()
    async disabledButton() {
        this.isDrawButtonDisabled = true;
        return;
    }

    @Method()
    async enabledButton() {
        this.isDrawButtonDisabled = false;
        return;
    }

    @Event({
        eventName: 'app-game-actions-click'
    }) clickEvent: EventEmitter<void>;

    private buttonLabel: B_LABEL;

    private handleClick = () => {
        this.clickEvent.emit();
    }

    componentWillRender() {
        if (this.isReadyForNextTurn) {
            switch (this.gameStatus) {
                case GameStatusEnum.ENDED:
                    this.buttonLabel = "Go back to homepage";
                    break;
                case GameStatusEnum.LAST_TURN:
                    this.buttonLabel = "Run last turn";
                    break;
                case GameStatusEnum.ON_GOING:
                    this.buttonLabel = "Run next turn";
                    break;
            }
        } else {
            this.buttonLabel = "Prepare next turn";
        }
    }

    render() {
        return (<Host>
            <button
                onClick={this.handleClick}
                disabled={this.isDrawButtonDisabled}>
                {this.buttonLabel}
            </button>
        </Host>);
    }

}