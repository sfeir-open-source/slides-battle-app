import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { ITopicConfiguration } from '../../interfaces';

@Component({
    tag: 'app-configurations-topic',
    styleUrl: 'app-configurations-topic.css',
    shadow: true
})
export class AppConfigurationsTopic {

    @Prop() topic: ITopicConfiguration;

    @State() isRenamingMode: boolean = false;

    @Event({
        eventName: 'app-configurations-topic_topic-change'
    }) topicChanged: EventEmitter<ITopicConfiguration>;

    @Event({
        eventName: 'app-configurations-topic_topic-delete'
    }) topicDeleted: EventEmitter<string>;

    private textInput!: HTMLInputElement;

    private handleRenamingMode = () => {
        this.isRenamingMode = true;
    }

    private handleNameChange = () => {
        this.isRenamingMode = false;
        this.topicChanged.emit({
            ...this.topic,
            label: this.textInput.value
        });
    }

    private handleAvailabilityChange = () => {
        this.topicChanged.emit({
            ...this.topic,
            isAvailable: !this.topic.isAvailable
        });
    }

    private handleDelete = () => {
        this.topicDeleted.emit(this.topic.id);
    }

    componentDidRender() {
        if (this.isRenamingMode) {
            this.textInput.value = this.topic.label;
        }
    }

    render() {
        return (<Host>
            <li>
                {this.isRenamingMode ?
                    <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} /> :
                    <p>{this.topic.label}</p>
                }
                {this.isRenamingMode ?
                    <button onClick={this.handleNameChange}>Save</button> :
                    <button onClick={this.handleRenamingMode}>Rename</button>
                }
                <button onClick={this.handleAvailabilityChange}>{this.topic.isAvailable ? 'Deactivate' : 'Activate'}</button>
                <button onClick={this.handleDelete}>Delete</button>
            </li>
        </Host>);
    }

}