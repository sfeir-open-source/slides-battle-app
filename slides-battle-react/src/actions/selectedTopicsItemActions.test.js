import { deleteSelectedTopicsItem, addSelectedTopicsItem } from "./selectedTopicsItemActions";

describe("List Items Actions", () => {

	it("should execute addSelectedTopicsItem action", () => {

		const expected = {
			type: "ADD_SELECTED_ITEM",
			item : {
				label: "Histoire",
				available: false,
				id: "1"
			}
		};

		expect(addSelectedTopicsItem(expected.item, "ADD_SELECTED_ITEM")).toEqual(expected);

	});

	it("should execute deleteSelectedTopicsItem action", () => {

		const expected = {
			type: "DELETE_SELECTED_ITEM",
			item : {
				label: "Histoire",
				available: false,
				id: "1"
			}
		};

		expect(deleteSelectedTopicsItem(expected.item, "DELETE_SELECTED_ITEM")).toEqual(expected);
	});

});