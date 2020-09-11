const TOPICS = [
	{
		id: "1",
		label: "Histoire",
		available: false,
	},
	{
		id: "2",
		label: "Cinéma",
		available: false,
	},
	{
		id: "3",
		label: "Bande dessiné",
		available: false,
	},
	{
		id: "4",
		label: "Séries US",
		available: false,
	},
];
const PLAYERS = [
	{
		id: "1",
		label: "Batman",
		available: false,
	},
	{
		id: "2",
		label: "Catwoman",
		available: false,
	},
	{
		id: "3",
		label: "Superman",
		available: false,
	},
	{
		id: "4",
		label: "Supergirl",
		available: false,
	},
];
const initialState = {
	topics: TOPICS,
	players: PLAYERS,
	selectedTopics: [],
	editedItemState: {
		item: null,
		input: {
			value: "",
			isVisible: false,
		},
		index: null,
		type: null,
	},
	clickedButtonContext: {
		typeOfItem: null,
		isBtnAddClicked: false,
	},
};

const rootReducer = (state = initialState, action) => {
	let newTopics = [];
	let newPlayers = [];

	switch (action.type) {
		case "DELETE_TOPIC":
			newTopics = state.topics.filter((topic) => {
				return action.item !== topic;
			});
			return {
				...state,
				topics: newTopics,
			};
		case "ADD_TOPIC":
			return {
				...state,
				topics: [...state.topics, action.item],
			};
		case "DELETE_SELECTED_ITEM":
			// newSelectedTopics = state.selectedTopics.filter((selectedTopic) => {
			// 	return action.item !== selectedTopic;
			// });
			return {
				...state,
				topics: state.topics,
			};
		case "ADD_SELECTED_ITEM":
			return {
				...state,
				topics: state.topics,
			};
		case "DELETE_PLAYER":
			newPlayers = state.players.filter((player) => {
				return action.item !== player;
			});
			return {
				...state,
				players: newPlayers,
			};
		case "ADD_PLAYER":
			return {
				...state,
				players: [...state.players, action.item],
			};
		case "BTN_ADD_CLICKED":
			return {
				...state,
				clickedButtonContext: {
					isBtnAddClicked: action.value,
					typeOfItem: action.typeOfItem,
				},
			};
		case "NEW_ITEM":
			return {
				...state,
				newItem: action.value,
			};
		case "EDITED_ITEM_STATE":
			return {
				...state,
				editedItemState: action.editedItemState,
			};
		default:
			return state;
	}
};

export default rootReducer;
