import { injectable } from "inversify";
import { ITopicConfiguration } from "../../interfaces";
import { ITopicsConfigurationService } from "./topics-configuration.interface";

@injectable()
export class TopicsConfigurationMock implements ITopicsConfigurationService {
    getTopicsConfiguration() {
        console.log("[TopicsConfigurationMock] getTopicsConfiguration");
        return [];
    }
    addTopic(label: string) {
        console.log("[TopicsConfigurationMock] addTopic", label);
        return [];
    }
    modifyTopic(Topic: ITopicConfiguration) {
        console.log("[TopicsConfigurationMock] addTopic", Topic);
        return [];
    }
    removeTopic(id: string) {
        console.log("[TopicsConfigurationMock] removeTopic", id);
        return [];
    }
}