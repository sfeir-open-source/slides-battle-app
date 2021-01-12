import { container } from './container.ioc';
import { GameService, GAME_SERVICE, IGameService } from './game';
import { IPlayersConfigurationService, PlayersConfigurationService, PLAYERS_CONFIGURATION_SERVICE } from './players-configuration';
import { ITopicsConfigurationService, TopicsConfigurationService, TOPICS_CONFIGURATION_SERVICE } from './topics-configuration';

container.bind<IPlayersConfigurationService>(PLAYERS_CONFIGURATION_SERVICE).to(PlayersConfigurationService);
container.bind<ITopicsConfigurationService>(TOPICS_CONFIGURATION_SERVICE).to(TopicsConfigurationService);
container.bind<IGameService>(GAME_SERVICE).to(GameService);