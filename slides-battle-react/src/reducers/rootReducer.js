import helper from "../helper";

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

TOPICS.map((topic) => (topic.id = helper.createUUID()));
PLAYERS.map((player) => (player.id = helper.createUUID()));

export const initialState = {
	topics: TOPICS,
	players: PLAYERS,
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

export const rootReducer = (state = initialState, action = {}) => {
	let newTopics = [];
	let newPlayers = [];
	switch (action.type) {
		case "DELETE_TOPIC":
			newTopics = state.topics.filter((topic) => {
				return action.item.id !== topic.id;
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
		case "ADD_SELECTED_ITEM":
			newTopics = state.topics.map(topic =>
				topic.id === action.item.id
					? { ...topic, available: true }
					: topic);
			return {
				...state,
				topics: newTopics,
			};
		case "DELETE_SELECTED_ITEM":
			newTopics = state.topics.map(topic =>
				topic.id === action.item.id
					? { ...topic, available: false }
					: topic);
			return {
				...state,
				topics: newTopics,
			};
		case "DELETE_PLAYER":
			newPlayers = state.players.filter((player) => {
				return action.item.id !== player.id;
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
