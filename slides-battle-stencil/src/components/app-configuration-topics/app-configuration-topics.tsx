import { Component, h, Host, Listen, State } from "@stencil/core";
import { ITopicConfiguration } from "../../interfaces";
import { lazyInject } from "../../services/container.ioc";
import { ITopicsConfigurationService, TOPICS_CONFIGURATION_SERVICE } from "../../services/topics-configuration";

@Component({
    tag: 'app-configuration-topics',
    styleUrl: 'app-configuration-topics.css',
    shadow: true
})
export class AppConfigurationTopics {

    @lazyInject(TOPICS_CONFIGURATION_SERVICE) private topicsConfigurationSrv: ITopicsConfigurationService;

    @State() topicsConfiguration: ReadonlyArray<ITopicConfiguration>;

    @Listen('app-configurations-topic_topic-change')
    onTopicChange(event: CustomEvent<ITopicConfiguration>) {
        this.topicsConfiguration = this.topicsConfigurationSrv.modifyTopic(event.detail);
    }

    @Listen('app-configurations-topic_topic-delete')
    onTopicDelete(event: CustomEvent<string>) {
        this.topicsConfiguration = this.topicsConfigurationSrv.removeTopic(event.detail);
    }

    private textInput!: HTMLInputElement;

    private handleClick = () => {
        this.topicsConfiguration = this.topicsConfigurationSrv.addTopic(this.textInput.value);
    }

    componentWillLoad() {
        this.topicsConfiguration = this.topicsConfigurationSrv.getTopicsConfiguration();
    }

    render() {
        return (<Host>
            <h2>Topics</h2>
            <ul>
                {this.topicsConfiguration.map((topic) => <app-configurations-topic
                    topic={topic}
                ></app-configurations-topic>)}
            </ul>
            <label>
                New topic name:
                <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} />
            </label>
            <button onClick={this.handleClick}>Add topic</button>
        </Host>);
    }

}