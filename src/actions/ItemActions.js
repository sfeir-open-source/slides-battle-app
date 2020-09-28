import * as actionTypes from "../actions/actionTypes";
import createUUID from "../helper";

export const deleteItem = (item, type) => {
	const action =
		type === "topics"
			? actionTypes.DELETE_TOPIC
			: actionTypes.DELETE_PLAYER;
	return {
		type: action,
		item,
	};
};

export const addItem = (item, type) => {
	item.id = createUUID();
	const action =
		type === "topics" ? actionTypes.ADD_TOPIC : actionTypes.ADD_PLAYER;
	return {
		type: action,
		item,
	};
};
