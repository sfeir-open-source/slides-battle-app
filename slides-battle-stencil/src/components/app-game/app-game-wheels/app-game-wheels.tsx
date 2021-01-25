import { Component, Host, h, Prop, Method } from "@stencil/core";
import { IPlayerGame, ITopicGame } from "../../../interfaces";

@Component({
    tag: 'app-game-wheels',
    styleUrl: 'app-game-wheels.css',
    shadow: true
})
export class AppGameWheels {

    @Prop() players: ReadonlyArray<IPlayerGame>;

    @Prop() topics: ReadonlyArray<ITopicGame>

    private playersWheelEl: HTMLAppRandomWheelElement;

    private topicsWheelEl: HTMLAppRandomWheelElement;

    private hasEnoughPlayers: boolean;

    private hasEnoughTopics: boolean;

    @Method()
    async drawNextRound(): Promise<{
        player: IPlayerGame,
        topic: ITopicGame
    }> {
        if (!this.hasEnoughPlayers && !this.hasEnoughTopics) {
            return Promise.reject('Not enough data to draw a round.');
        }

        if (this.hasEnoughPlayers && this.hasEnoughTopics) {
            const drawResults = await this.drawBoth();
            return {
                topic: drawResults[0] as ITopicGame,
                player: drawResults[1] as IPlayerGame
            };
        } else if (!this.hasEnoughPlayers && this.hasEnoughTopics) {
            return {
                topic: (await this.drawOnlyTopic()) as ITopicGame,
                player: undefined
            };
        } else if (this.hasEnoughPlayers && !this.hasEnoughTopics) {
            return {
                topic: undefined,
                player: (await this.drawOnlyPlayer()) as IPlayerGame
            };
        }
        return Promise.reject('Something went wrong.');
    }

    componentWillRender() {
        this.hasEnoughPlayers = this.players.length >= 2;
        this.hasEnoughTopics = this.topics.length >= 2;
    }

    private async drawBoth() {
        return Promise.all([
            this.topicsWheelEl.draw(),
            this.playersWheelEl.draw()
        ]);
    }

    private async drawOnlyPlayer() {
        return this.playersWheelEl.draw();
    }

    private async drawOnlyTopic() {
        return this.topicsWheelEl.draw();
    }

    render() {
        return (<Host>
            {this.hasEnoughTopics &&
                <app-random-wheel
                    ref={(el) => this.topicsWheelEl = el}
                    data={this.topics.filter(({ hasBeenPlayed }) => !hasBeenPlayed)}
                ></app-random-wheel>
            }
            {this.hasEnoughPlayers &&
                <app-random-wheel
                    ref={(el) => this.playersWheelEl = el}
                    data={this.players.filter(({ hasBeenPlayed }) => !hasBeenPlayed)}>
                </app-random-wheel>
            }
        </Host>);
    }
}