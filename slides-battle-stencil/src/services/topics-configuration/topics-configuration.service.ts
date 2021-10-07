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
                label: 'Lancement de produit',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Discours de mariage',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Séminaire d\'entraide',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Pitch émission de télé-réalité',
                isAvailable: true
            },
            {
                id: uuidv4(),
                label: 'Pitch de thèse',
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