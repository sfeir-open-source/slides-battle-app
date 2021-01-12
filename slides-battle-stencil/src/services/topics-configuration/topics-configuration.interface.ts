import { ITopicConfiguration } from "../../interfaces";

export interface ITopicsConfigurationService {
    getTopicsConfiguration: () => ReadonlyArray<ITopicConfiguration>;
    addTopic: (label: string) => ReadonlyArray<ITopicConfiguration>;
    modifyTopic: (player: ITopicConfiguration) => ReadonlyArray<ITopicConfiguration>;
    removeTopic: (id: string) => ReadonlyArray<ITopicConfiguration>;
}