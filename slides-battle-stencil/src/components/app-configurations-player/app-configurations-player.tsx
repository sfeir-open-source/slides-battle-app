import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { IPlayerConfiguration } from '../../interfaces';

@Component({
    tag: 'app-configurations-player',
    styleUrl: 'app-configurations-player.css',
    shadow: true
})
export class AppConfigurationsPlayer {

    @Prop() player: IPlayerConfiguration;

    @State() isRenamingMode: boolean = false;

    @Event({
        eventName: 'app-configurations-player_player-change'
    }) playerChanged: EventEmitter<IPlayerConfiguration>;

    @Event({
        eventName: 'app-configurations-player_player-delete'
    }) playerDeleted: EventEmitter<string>;

    private textInput!: HTMLInputElement;

    private handleRenamingMode = () => {
        this.isRenamingMode = true;
    }

    private handleNameChange = () => {
        this.isRenamingMode = false;
        this.playerChanged.emit({
            ...this.player,
            label: this.textInput.value
        });
    }

    private handleAvailabilityChange = () => {
        this.playerChanged.emit({
            ...this.player,
            isAvailable: !this.player.isAvailable
        });
    }

    private handleDelete = () => {
        this.playerDeleted.emit(this.player.id);
    }

    componentDidRender() {
        if (this.isRenamingMode) {
            this.textInput.value = this.player.label;
        }
    }

    render() {
        return (<Host>
            <li>
                {this.isRenamingMode ?
                    <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} /> :
                    <p>{this.player.label}</p>
                }
                {this.isRenamingMode ?
                    <button onClick={this.handleNameChange}>Save</button> :
                    <button onClick={this.handleRenamingMode}>Rename</button>
                }
                <button onClick={this.handleAvailabilityChange}>{this.player.isAvailable ? 'Deactivate' : 'Activate'}</button>
                <button onClick={this.handleDelete}>Delete</button>
            </li>
        </Host>);
    }

}