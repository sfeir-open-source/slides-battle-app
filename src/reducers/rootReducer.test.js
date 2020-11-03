import rootReducer from "./rootReducer";
import helper from "../helper";

describe("Root reducer", () => {
    let initialState;
    const TOPICS = [
        {
            label: "Histoire",
            available: false,
            id: "1",
        },
        {
            label: "Cinéma",
            available: false,
            id: "2",
        },
        {
            label: "Bande dessiné",
            available: false,
            id: "3",
        },
        {
            label: "Séries US",
            available: false,
            id: "4",
        },
    ];
    const PLAYERS = [
        {
            label: "Batman",
            available: false,
            id: "1",
        },
        {
            label: "Catwoman",
            available: false,
            id: "2",
        },
        {
            label: "Superman",
            available: false,
            id: "3",
        },
        {
            label: "Supergirl",
            available: false,
            id: "4",
        },
    ];

    beforeEach(() => {
		initialState = {
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
	});

    it("should return initial state", (done) => {

        const actual = rootReducer(undefined);
        actual.topics.map((topic, index) => (topic.id = index + 1 + ""));
        actual.players.map((player, index) => (player.id = index + 1 + ""));

        const expected = initialState;

        expect(actual).toEqual(expected);

        done();
    });

    it("should execute DELETE_TOPIC action", (done) => {
		const item = {
			label: "Séries US",
			available: false,
			id: "4",
		}
		const action = {
			type: "DELETE_TOPIC",
			item
		};

        const actual = rootReducer(initialState, action);
        const expected = {...initialState, topics: [
			{ label: 'Histoire', available: false, id: "1" },
			{ label: 'Cinéma', available: false, id: "2" },
			{ label: 'Bande dessiné', available: false, id: "3"},
		]};

		expect(actual).toEqual(expected);

		done();
	});

    it("should execute ADD_TOPIC action", (done) => {
		const item = {
			label: "Séries FR",
			available: false,
			id: "5",
		}
		const action = {
			type: "ADD_TOPIC",
			item
		};

        const actual = rootReducer(initialState, action);
        const expected = {...initialState, topics: [
			{ label: 'Histoire', available: false, id: "1" },
			{ label: 'Cinéma', available: false, id: "2" },
			{ label: 'Bande dessiné', available: false, id: "3"},
			{ label: 'Séries US', available: false, id: "4"},
			{ label: 'Séries FR', available: false, id: "5"},
		]};

		expect(actual).toEqual(expected);

		done();
	});

    it("should execute DELETE_PLAYER action", (done) => {
		const item = {
			label: "Catwoman",
			available: false,
			id: "2",
		}
		const action = {
			type: "DELETE_PLAYER",
			item
		};

        const actual = rootReducer(initialState, action);
        const expected = {...initialState, players: [
        {
            label: "Batman",
            available: false,
            id: "1"
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
    ]};

		expect(actual).toEqual(expected);

		done();
	});

    it("should execute ADD_PLAYER action", (done) => {
		const item = {
			label: "Bart Simpson",
			available: false,
			id: "5",
		}
		const action = {
			type: "ADD_PLAYER",
			item
		};

        const actual = rootReducer(initialState, action);
        const expected = {...initialState, players: [
			{ label: 'Batman', available: false, id: "1" },
			{ label: 'Catwoman', available: false, id: "2" },
			{ label: 'Superman', available: false, id: "3"},
			{ label: 'Supergirl', available: false, id: "4"},
			{ label: 'Bart Simpson', available: false, id: "5"},
		]};

		expect(actual).toEqual(expected);

		done();
	});

    it("should execute ADD_SELECTED_ITEM action", (done) => {
        const item = {
			label: "Cinéma",
			available: false,
			id: "2",
		}
		const action = {
			type: "ADD_SELECTED_ITEM",
			item
		};
        const actual = rootReducer(initialState, action);
        const expected = {...initialState, topics: [
			{ label: 'Histoire', available: false, id: "1" },
			{ label: 'Cinéma', available: true, id: "2" },
			{ label: 'Bande dessiné', available: false, id: "3"},
			{ label: 'Séries US', available: false, id: "4"},
		]};

        expect(actual).toEqual(expected);

        done();
    })

    it("should execute DELETE_SELECTED_ITEM action", (done) => {
        const item = {
			label: "Bande dessiné",
			available: true,
			id: "3",
		}
		const action = {
			type: "DELETE_SELECTED_ITEM",
			item
		};
        const actual = rootReducer(initialState, action);
        const expected = {...initialState, topics: [
			{ label: 'Histoire', available: false, id: "1" },
			{ label: 'Cinéma', available: false, id: "2" },
			{ label: 'Bande dessiné', available: false, id: "3"},
			{ label: 'Séries US', available: false, id: "4"},
		]};

        expect(actual).toEqual(expected);

        done();
    })

    it("should execute BTN_ADD_CLICKED action", (done) => {
        const clickedButtonContext = {
            isBtnAddClicked: true,
            typeOfItem: "topics",
        }
		const action = {
			type: "BTN_ADD_CLICKED",
			value: true,
            typeOfItem: "topics"
		};
        const actual = rootReducer(initialState, action);
        const expected = {...initialState, clickedButtonContext};

        expect(actual).toEqual(expected);

        done();
    })

    it("should execute EDITED_ITEM_STATE action", (done) => {
        const editedItemState = {
            item: {
                id: '1',
                label: 'Batman',
                available: false
            },
            input: {
                value: 'Batman',
                isVisible: true
            },
            index: 0,
            type: 'players'
        }

		const action = {
			type: "EDITED_ITEM_STATE",
			editedItemState
		};
        const actual = rootReducer(initialState, action);
        const expected = {...initialState, editedItemState};

        expect(actual).toEqual(expected);

        done();
    })
})