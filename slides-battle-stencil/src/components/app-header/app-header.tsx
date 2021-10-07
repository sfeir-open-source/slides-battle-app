import { Component, getAssetPath, h, Host } from "@stencil/core";

@Component({
    tag: 'app-header',
    styleUrl: 'app-header.css',
    shadow: true,
    assetsDirs: ['assets']
})
export class AppHeader {

    render() {
        return (<Host>
            <header>
                <stencil-route-link url="/" exact={true}>
                    <img
                        src={getAssetPath('../assets/Logo.jpg')}
                        alt="Slides Battle"
                    />
                </stencil-route-link>
            </header>
        </Host>);
    }

}