import { Component, h, Host } from "@stencil/core";

@Component({
    tag: 'app-header',
    styleUrl: 'app-header.css',
    shadow: true
})
export class AppHeader {

    render() {
        return (<Host>
            <header>
                <stencil-route-link url="/" exact={true}>Slides Battle</stencil-route-link>
            </header>
        </Host>);
    }

}