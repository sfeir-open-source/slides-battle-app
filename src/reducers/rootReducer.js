const TOPICS = ['Histoire', 'Cinéma', 'Bande dessiné', 'Series US'];
const PLAYERS = ['Batman', 'Catwoman', 'Superman', 'Supergirl'];
const initialState = {
    topics: TOPICS,
    players: PLAYERS,
    selectedTopics: []
};

const rootReducer = (state = initialState, action) => {
    let newTopics = [];
    let newPlayers = [];
    let newSelectedTopics = [];

    switch( action.type ) {
        case 'DELETE_TOPIC':
            newTopics = state.topics.filter( (topic) => {
                return action.item !== topic;
            });
            return {
                ...state,
                topics: newTopics
            }
        case 'ADD_TOPIC':
            state.topics.push(action.item);
            return {
                ...state,
                topics: state.topics
            }
        case 'DELETE_SELECTED_ITEM':
            newSelectedTopics = state.selectedTopics.filter( (selectedTopic) => {
                return action.item !== selectedTopic;
            });
            return {
                ...state,
                selectedTopics: newSelectedTopics
            }
        case 'ADD_SELECTED_ITEM':
            state.selectedTopics.push(action.item);
            return {
                ...state,
                selectedTopics: state.selectedTopics
            }
        case 'DELETE_PLAYER':
            newPlayers = state.players.filter( (player) => {
                return action.item !== player;
            });
            return {
                ...state,
                players: newPlayers
            }
        case 'ADD_PLAYER':
            state.players.push(action.item);
            return {
                ...state,
                players: state.players
        }
        default:
            return state;
    }
}

export default rootReducer;