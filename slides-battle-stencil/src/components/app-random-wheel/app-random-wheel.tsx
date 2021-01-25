import { Component, h, Host, Method, Prop, Watch } from "@stencil/core";
import { IItemConfiguration } from "../../interfaces";
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

    @Prop({

    }) data: ReadonlyArray<IItemConfiguration> = [];

    @Prop() padding: number = 2;

    @Prop() cursorSize: number = 5;

    @Prop() radius: number = 50;

    @Prop() width: number = 500;

    @Prop() height: number = 500;

    @Prop() rotationDuration: number = 3;

    @Watch('data')
    handler(newValue: ReadonlyArray<IItemConfiguration>, oldValue: ReadonlyArray<IItemConfiguration>) {
        const isSame = oldValue.every(({ id }) => newValue.some(item => item.id === id));
        this.hasToResetRotation = !isSame;
    }

    private wheelRotableContainerEl: SVGGElement;

    private hypCursor: number;

    private viewBoxSize: number;

    private rotationDeg: number;

    private hasToResetRotation: boolean;

    @Method()
    async draw(): Promise<IItemConfiguration> {
        const randomIndex = Math.floor(Math.random() * this.data.length + 1) - 1;
        const result = this.data[randomIndex];
        const duration = this.rotationDuration * 1000;
        const randomTurnNumber = Math.floor(Math.random() * 20);
        this.rotationDeg =
            360 *
            ((Math.random() - randomIndex - 1) / this.data.length -
                5 -
                randomTurnNumber);
        this.switchRotation(true);
        return new Promise(resolve => setTimeout(resolve, duration, result));
    }

    componentWillRender() {
        this.hypCursor = Math.sqrt(
            Math.pow(this.cursorSize, 2) - Math.pow(this.cursorSize / 2, 2)
        );
        this.viewBoxSize = 2 * this.padding + 2 * this.radius + this.hypCursor;
    }

    componentDidRender() {
        /**
         * @TODO Rethink rotatation reset
         */
        if (this.hasToResetRotation) {
            this.hasToResetRotation = false;
            this.switchRotation(false);
        }
    }

    private switchRotation(bool: boolean) {
        const transition = `transition: transform ${this.rotationDuration}s cubic-bezier(0, 0, 0, 1);`;
        const transform = `transform : rotate(${this.rotationDeg}deg);`;
        this.wheelRotableContainerEl.setAttribute('style', bool ? transition + transform : '');
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
            <textPath href={`#${value}`}>{this.data[index].label}</textPath>
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
                    <g ref={(el) => this.wheelRotableContainerEl = el as SVGGElement}>
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