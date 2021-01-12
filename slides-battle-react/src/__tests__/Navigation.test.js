import React from "react";
import { shallow } from "enzyme";
import { Link, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import Navigation from "../components/Navigation";
import rootReducer from "../reducers/rootReducer";
import renderer from "react-test-renderer";

import { createStore } from "redux";
import { Provider } from "react-redux";

import Config from "../components/Configuration";
import Battle from "../components/Battle";
import Routes from "../components/Routes";

const store = createStore(rootReducer);

describe("<Navigation />", () => {
  // Initializes the context
  beforeEach(() => {
    const wrapper = shallow(<Navigation />);
    const history = [];
  });

  it("should renders without crashing", () => {
    const wrapper = shallow(<Navigation />);
  });

  it("should contain a configuration link", () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find(Link).filter({ to: "/config" }).length).toBe(1);
  });

  it("should contain a battle link", () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.find(Link).filter({ to: "/battle" }).length).toBe(1);
  });

  it("full app rendering battle", () => {
    const history = createMemoryHistory();
    const route = "/battle";
    history.push(route);
    const { container, getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    fireEvent.click(getByText("Battle"));

    // check that the content changed to the new page
    expect(getByText("Battle")).not.toBeNull();
  });
});
