const TOPICS = ['Histoire', 'Cinéma', 'Bande dessiné', 'Series US'];
const PLAYERS = ['Batman', 'Catwoman', 'Superman', 'Supergirl'];
const initialState = {
    topics: TOPICS,
    players: PLAYERS,
    selectedTopics: []
};

const rootReducer = (state = initialState, action) => {
    return state;
}

export default rootReducer;