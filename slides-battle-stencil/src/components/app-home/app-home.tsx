import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome text for slide battle
        </p>

        <stencil-route-link url='/game'>
          <button>
            Lancer une partie
          </button>
        </stencil-route-link>
        <stencil-route-link url='/configurations'>
          <button>
            Configuration
          </button>
        </stencil-route-link>
      </div>
    );
  }
}
