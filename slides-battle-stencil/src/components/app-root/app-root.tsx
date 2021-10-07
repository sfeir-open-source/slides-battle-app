import { Component, h, Host } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (<Host>
      <stencil-router>
        <app-header></app-header>
        <main>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} />
            <stencil-route url='/game' component='app-game' />
            <stencil-route url='/configurations' component='app-configurations' />
          </stencil-route-switch>
        </main>
      </stencil-router>
    </Host>
    );
  }
}
