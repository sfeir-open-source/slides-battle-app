import { addItem, deleteItem } from "../actions/ItemActions";


const TOPICS = [
	{
		label: "Histoire",
		available: false,
		id: "1"
	},
	{
		label: "Cinéma",
		available: false,
		id: "2"
	},
	{
		label: "Bande dessiné",
		available: false,
		id: "3"
	},
	{
		label: "Séries US",
		available: false,
		id: "4"
	},
];
const PLAYERS = [
	{
		label: "Batman",
		available: false,
		id: "1"
	},
	{
		label: "Catwoman",
		available: false,
		id: "2"
	},
	{
		label: "Superman",
		available: false,
		id: "3"
	},
	{
		label: "Supergirl",
		available: false,
		id: "4"
	},
];

describe("Item Actions", () => {

	it("should execute deleteItem action - topics", (done) => {
		const item = {
			label: "Bande dessiné",
			available: true,
			id: "3",
		}
		const expected = {
			type: "DELETE_TOPIC",
			item,
		};

		expect(deleteItem(item, "topics")).toEqual(expected);

		done();
	});

		it("should execute deleteItem action - players", (done) => {
		const item = {
			label: "Superman",
			available: true,
			id: "3",
		}
		const expected = {
			type: "DELETE_PLAYER",
			item,
		};

		expect(deleteItem(item, "players")).toEqual(expected);

		done();
	});

	it("should execute addItem action - players", (done) => {
		const item = {
			label: "Bart Simpson",
			available: true,
			id: "5",
		}
		const expected = {
			type: "ADD_PLAYER",
			item,
		};

		expect(addItem(item, "players")).toEqual(expected);

		done();
	});

	it("should execute addItem action - topics", (done) => {
		const item = {
			label: "Astronomie",
			available: true,
			id: "5",
		}
		const expected = {
			type: "ADD_TOPIC",
			item,
		};

		expect(addItem(item, "topics")).toEqual(expected);

		done();
	});


});