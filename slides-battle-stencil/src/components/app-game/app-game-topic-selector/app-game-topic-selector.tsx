import { Component, EventEmitter, h, Host, Prop, Event } from "@stencil/core";
import { ITopicGame } from "../../../interfaces";

@Component({
    tag: 'app-game-topic-selector',
    styleUrl: 'app-game-topic-selector.css',
    shadow: true
})
export class AppGameTopicSelector {

    @Prop() topics: ReadonlyArray<ITopicGame>;

    @Event({
        eventName: 'app-game-topic-selection'
    })
    selectionEvent: EventEmitter<ITopicGame>;

    private handleClick = (topic: ITopicGame) => () => {
        this.selectionEvent.emit(topic);
    }

    render() {
        return (<Host>
            {this.topics.map(topic => <button onClick={this.handleClick(topic)}>{topic.label}</button>)}
        </Host>);
    }
}