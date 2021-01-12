import { Component, h, Host, Listen, State } from "@stencil/core";
import { IPlayerConfiguration } from "../../interfaces";
import { lazyInject } from "../../services/container.ioc";
import { IPlayersConfigurationService, PLAYERS_CONFIGURATION_SERVICE } from "../../services/players-configuration";

@Component({
    tag: 'app-configuration-players',
    styleUrl: 'app-configuration-players.css',
    shadow: true
})
export class AppConfigurationPlayers {

    @lazyInject(PLAYERS_CONFIGURATION_SERVICE) private playersConfigurationSrv: IPlayersConfigurationService;

    @State() playersConfiguration: ReadonlyArray<IPlayerConfiguration>;

    @Listen('app-configurations-player_player-change')
    onPlayerChange(event: CustomEvent<IPlayerConfiguration>) {
        this.playersConfiguration = this.playersConfigurationSrv.modifyPlayer(event.detail);
    }

    @Listen('app-configurations-player_player-delete')
    onPlayerDelete(event: CustomEvent<string>) {
        this.playersConfiguration = this.playersConfigurationSrv.removePlayer(event.detail);
    }

    private textInput!: HTMLInputElement;

    private handleClick = () => {
        this.playersConfiguration = this.playersConfigurationSrv.addPlayer(this.textInput.value);
    }

    componentWillLoad() {
        this.playersConfiguration = this.playersConfigurationSrv.getPlayersConfiguration();
    }

    render() {
        return (<Host>
            <h2>Players</h2>
            <ul>
                {this.playersConfiguration.map((player) => <app-configurations-player
                    player={player}
                ></app-configurations-player>)}
            </ul>
            <label>
                New player name:
                <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} />
            </label>
            <button onClick={this.handleClick}>Add player</button>
        </Host>);
    }

}