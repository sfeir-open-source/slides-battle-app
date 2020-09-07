export const btnAddClicked = (value, typeOfItem, BTN_ADD_CLICKED) => ({
	type: BTN_ADD_CLICKED,
	value,
	typeOfItem
});

export const setEditedItemState = (editedItemState, SET_EDITED_ITEM_STATE) => ({
	type: SET_EDITED_ITEM_STATE,
	editedItemState
});