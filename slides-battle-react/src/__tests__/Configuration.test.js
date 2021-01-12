import React from "react";
import { mount } from "enzyme";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import Configuration from "../components/Configuration";
import helper from "../helper";

const store = createStore(rootReducer);
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

jest.spyOn(helper, "createUUID").mockReturnValue("uuidv4");
TOPICS.map((topic) => (topic.id = helper.createUUID()));
PLAYERS.map((player) => (player.id = helper.createUUID()));

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
    jest.spyOn(helper, "createUUID").mockReturnValue("uuidv4");
    received.map((item) => (item.id = helper.createUUID()));
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
    jest.spyOn(helper, "createUUID").mockReturnValue("uuidv4");
    received.map((item) => (item.id = helper.createUUID()));
    const expected = TOPICS;
    expect(JSON.stringify(received)).toEqual(JSON.stringify(expected));
    done();
  });
});
