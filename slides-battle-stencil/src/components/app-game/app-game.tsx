import { Component, h, Host } from "@stencil/core";
import { lazyInject } from "../../services/container.ioc";
import { GAME_SERVICE, IGameService } from "../../services/game";

@Component({
    tag: 'app-game',
    styleUrl: 'app-game.css',
    shadow: true
})
export class AppHome {

    @lazyInject(GAME_SERVICE) private gameSrv: IGameService;

    async componentWillLoad() {
        console.log(await this.gameSrv.createGame(3));
    }

    render() {
        return (<Host>
            Your game here
        </Host>);
    }
}