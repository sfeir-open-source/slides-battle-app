import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'app-configurations',
    styleUrl: 'app-configurations.css',
    shadow: true
})
export class AppConfigurations {

    render() {
        return (<Host>
            <h1>Configurations</h1>
            <app-configuration-topics></app-configuration-topics>
            <app-configuration-players></app-configuration-players>
        </Host>);
    }

}