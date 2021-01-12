import { btnAddClicked, setEditedItemState } from "../actions/ListItemsActions";

describe("List Items Actions", () => {

	it("should execute btnAddClicked action", (done) => {

		const expected = {
			type: "BTN_ADD_CLICKED",
            value: true,
            typeOfItem: "topics"
		};

		expect(btnAddClicked(true, "topics", "BTN_ADD_CLICKED")).toEqual(expected);

		done();
	});

	it("should execute setEditedItemState action", (done) => {

		const editedItemState = {
            type: 'EDITED_ITEM_STATE',
            editedItemState: {
                item: {},
                input: {
                    value: '',
                    isVisible: false,
                    isError: false
                },
                index: null
                }
            }
		const expected = {
			type: "SET_EDITED_ITEM_STATE",
            editedItemState
		};

		expect(setEditedItemState(editedItemState, "SET_EDITED_ITEM_STATE")).toEqual(expected);

		done();
	});

});