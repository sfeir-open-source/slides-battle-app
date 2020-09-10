import React from "react";
import { shallow, mount } from "enzyme";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import Configuration from "./Configuration";

const store = createStore(rootReducer);

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

describe("<Configuration />", () => {
	it("should have 2 components ListItems", (done) => {
		const history = createMemoryHistory();
		const route = "/config";
		history.push(route);
		const wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<Configuration />
				</Router>
			</Provider>
		);
		expect(wrapper.find("ListItems").length).toBe(2);
		done();
	});

	it("should have a component ListItems with prop('type') = 'topics'", (done) => {
		const history = createMemoryHistory();
		const route = "/config";
		history.push(route);
		const wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<Configuration />
				</Router>
			</Provider>
		);
		const received = wrapper.find("ListItems").get(0).props.type;
		expect(received).toEqual("topics");
		done();
	});

	it("should have a component ListItems with prop('type') = 'players'", (done) => {
		const history = createMemoryHistory();
		const route = "/config";
		history.push(route);
		const wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<Configuration />
				</Router>
			</Provider>
		);

		const received = wrapper.find("ListItems").get(1).props.type;
		expect(received).toEqual("players");
		done();
	});
});

describe("<ListItems />", () => {
	it("should have a component ListItems with data", (done) => {
		const history = createMemoryHistory();
		const route = "/config";
		history.push(route);
		const wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<Configuration />
				</Router>
			</Provider>
		);
		const received = wrapper.find("ListItems").get(1).props.items;
		const expected = PLAYERS;
		expect(JSON.stringify(received)).toEqual(JSON.stringify(expected));
		done();
	});
});

describe("<ListItems />", () => {
	it("should have a component ListItems with data", (done) => {
		const history = createMemoryHistory();
		const route = "/config";
		history.push(route);
		const wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<Configuration />
				</Router>
			</Provider>
		);
		const received = wrapper.find("ListItems").get(0).props.items;
		const expected = TOPICS;
		expect(JSON.stringify(received)).toEqual(JSON.stringify(expected));
		done();
	});
});
/*
describe('<Configuration />', () => {
    beforeEach(() => {
        //
    });

    it('renders without crashing', () => {
        const wrapper = shallow(<Configuration store={store} />);
    });

    it('should have a lists of items', () => {

        const history = createMemoryHistory();
        const { container, getByText } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration />
                </Router>
            </Provider>
        )
        console.log(container);
        expect(container.innerHTML).to.contain('Battle')
    });

    it('should contain 2 lists of items', () => {
        const wrapper = shallow(<Configuration store={store} />);
        expect(wrapper.find(ListItems).length).to.equal(2);

    });

    it('should contain Header', () => {
        const wrapper = shallow(<Configuration store={store} />);
        expect(wrapper.find(Header).exists()).to.be.true;
        expect(wrapper.find(Header).text('Slide Battle')).to.have.lengthOf(1);
    });
})*/
