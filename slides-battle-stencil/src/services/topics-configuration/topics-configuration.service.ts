import { injectable } from "inversify";
import { uuidv4 } from "../../helpers";
import { ITopicConfiguration } from "../../interfaces";
import { ITopicsConfigurationService } from "./topics-configuration.interface";

@injectable()
export class TopicsConfigurationService implements ITopicsConfigurationService {

    private topicsConfiguration: ReadonlyArray<ITopicConfiguration>;

    constructor() {
        this.topicsConfiguration = [
            {
                id: uuidv4(),
                label: 'Topic 1',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Topic 2',
                isAvailable: false
            },
            {
                id: uuidv4(),
                label: 'Topic 3',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Topic 4',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Topic 5',
                isAvailable: true
            },
        ];
    }

    getTopicsConfiguration() {
        return this.topicsConfiguration;
    }
    addTopic(label: string) {
        this.topicsConfiguration = [
            ...this.topicsConfiguration,
            {
                id: uuidv4(),
                label,
                isAvailable: true
            }
        ]
        return this.topicsConfiguration;
    }
    modifyTopic(Topic: ITopicConfiguration) {
        this.topicsConfiguration = [
            ...this.topicsConfiguration.filter(topicConfiguration => topicConfiguration.id !== Topic.id),
            Topic
        ];
        return this.topicsConfiguration;
    }
    removeTopic(id: string) {
        this.topicsConfiguration = this.topicsConfiguration.filter(topicConfiguration => topicConfiguration.id !== id);
        return this.topicsConfiguration;
    }
}