import createUUID from "../helper";

const TOPICS = [
	{
		label: "Histoire",
		available: false,
	},
	{
		label: "Cinéma",
		available: false,
	},
	{
		label: "Bande dessiné",
		available: false,
	},
	{
		label: "Séries US",
		available: false,
	},
];
const PLAYERS = [
	{
		label: "Batman",
		available: false,
	},
	{
		label: "Catwoman",
		available: false,
	},
	{
		label: "Superman",
		available: false,
	},
	{
		label: "Supergirl",
		available: false,
	},
];

TOPICS.map((topic) => (topic.id = createUUID()));
PLAYERS.map((player) => (player.id = createUUID()));

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
