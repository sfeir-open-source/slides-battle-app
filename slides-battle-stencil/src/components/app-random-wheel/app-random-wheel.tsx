import { Component, h, Host, Method, Prop, State } from "@stencil/core";
import { generatePieSectionPathAttributes, generateTextDefPathAttributes, generateTextIds } from "./app-randon-wheel.utils";

const COLORS = [
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'brown',
    'grey',
    'black'
];

@Component({
    tag: 'app-random-wheel',
    styleUrl: 'app-random-wheel.css',
    shadow: true
})
export class AppRandomWheel {

    @Prop() data: ReadonlyArray<string> = [];

    @Prop() padding: number = 2;

    @Prop() cursorSize: number = 5;

    @Prop() radius: number = 50;

    @Prop() width: number = 500;

    @Prop() height: number = 500;

    @Prop() rotationDuration: number = 3;

    @State() activateRotation: boolean = false;

    private hypCursor: number;

    private viewBoxSize: number;

    private rotationDeg: number;

    @Method()
    async draw() {
        return (new Promise((resolve, reject) => {
            try {
                const randomIndex = Math.floor(Math.random() * this.data.length + 1) - 1;
                const randomTurnNumber = Math.floor(Math.random() * 20);
                this.rotationDeg =
                    360 *
                    ((Math.random() - randomIndex - 1) / this.data.length -
                        5 -
                        randomTurnNumber);

                this.activateRotation = true;

                setTimeout(() => {
                    resolve(this.data[randomIndex]);
                }, this.rotationDuration * 1000);
            } catch (error) {
                reject(error);
            }
        }));
    }

    componentWillRender() {
        this.hypCursor = Math.sqrt(
            Math.pow(this.cursorSize, 2) - Math.pow(this.cursorSize / 2, 2)
        );
        this.viewBoxSize = 2 * this.padding + 2 * this.radius + this.hypCursor;
    }

    private getRotableElementStyle() {
        const styles: { [key: string]: string } = {
            transition: `transform ${this.rotationDuration}s cubic-bezier(0, 0, 0, 1)`,
        };
        if (this.activateRotation) {
            styles.transform = `rotate(${this.rotationDeg}deg)`;
        }
        return styles;
    }

    private renderPathsAttributes() {
        return generatePieSectionPathAttributes(COLORS)(this.radius)(this.data.length)
            .map((value) => <path {...value}></path>) as ReadonlyArray<SVGPathElement>;
    }

    private renderDef() {
        return (<defs>
            {generateTextDefPathAttributes(this.radius)(this.data.length).map(value => (<path {...value}></path>)) as ReadonlyArray<SVGPathElement>}
        </defs>);
    }

    private renderText() {
        return generateTextIds(this.data.length).map((value, index) => (<text dominant-baseline="middle">
            <textPath href={`#${value}`}>{this.data[index]}</textPath>
        </text>)) as ReadonlyArray<SVGTextElement>;
    }

    private renderCursor() {
        return (<g id="cursor-container" transform={`translate(${this.padding + 2 * this.radius}, ${this.padding + this.radius})`}>
            <path d={`M 0 0 L ${this.hypCursor} ${this.cursorSize / 2} L ${this.hypCursor} ${-this.cursorSize / 2} Z`}></path>
        </g>) as SVGGElement;
    }

    render() {
        return (<Host>
            <svg width={this.width} height={this.height} viewBox={`0 0 ${this.viewBoxSize} ${this.viewBoxSize}`}>
                <g id="wheel-main-container" transform={`translate(${this.padding + this.radius}, ${this.padding + this.radius})`}>
                    <g id="wheel-rotable-container" style={this.getRotableElementStyle()}>
                        {this.renderDef()}
                        {...this.renderPathsAttributes()}
                        {...this.renderText()}
                    </g>
                </g>
                {this.renderCursor()}
            </svg>
        </Host>);
    }
}