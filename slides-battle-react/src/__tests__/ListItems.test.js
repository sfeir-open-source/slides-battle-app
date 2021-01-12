import React, { useRef } from "react";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ListItems, { AddButton } from "../components/ListItems";
import Configuration from "../components/Configuration";
import { mount, shallow } from "enzyme";
import { UlListItems } from "../components/ListItems.jsx";
import { render, fireEvent, screen } from "@testing-library/react";
import {
  addSelectedTopicsItem,
  deleteSelectedTopicsItem,
} from "../actions/selectedTopicsItemActions";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { addItem, deleteItem } from "../actions/ItemActions";
import { btnAddClicked, setEditedItemState } from "../actions/ListItemsActions";

import { Provider } from "react-redux";
const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};
const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => thunk(store)(next)(action);

  return { store, next, invoke };
};
describe("<ListItems />", () => {
  let wrapper;
  let store;
  let state;
  let container;
  let mockStore;
  const history = createMemoryHistory();
  const route = "/config";
  history.push(route);

  beforeEach(() => {
    store = createStore(rootReducer);
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Configuration>
            <ListItems items={store.getState().topics} type="topics" />
            <ListItems items={store.getState().players} type="players" />
          </Configuration>
        </Router>
      </Provider>
    );

    mockStore = wrapper.find(Provider).prop("store");

    jest.mock("react-redux", () => ({
      ...jest.requireActual("react-redux"),
      useSelector: jest.fn(),
      useDispatch: (action) => mockStore.dispatch(action),
    }));

    container = document.createElement("div");
    document.body.appendChild(container);
    state = store.getState();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    store = null;
    wrapper.unmount();
  });

  it("should have correct structure", () => {
    expect(wrapper.find("ListItems").length).toBe(2);
    const UlListItems = wrapper.find("ListItems").find("UlListItems");
    expect(UlListItems.length).toBe(2);
    // Topics list items
    expect(UlListItems.first().find("li").length).toBe(4);
    // Players list items
    expect(UlListItems.last().find("li").length).toBe(4);
  });

  it("should <UlListItems /> have correct datas", () => {
    const onClickOutsideMock = jest.fn();

    const wrapper = shallow(
      <UlListItems
        items={store.getState().topics}
        onClickOutside={onClickOutsideMock}
      />
    );
    expect(wrapper.find("li").length).toBe(4);
    expect(wrapper.findWhere((node) => /Séries/.test(node.text())));
  });

  it("should <AddButton /> have correct structure", () => {
    let btnAdd = wrapper.find("button[id='btnAddTopics']");
    expect(btnAdd.length).toBe(1);
    btnAdd.simulate("click");

    let input = wrapper.find("input[name='newItem']");
    let btnRemove = wrapper.find("button[id='btnDelTopics']");

    expect(input.length).toBe(1);
    expect(btnAdd.length).toBe(1);
    expect(btnRemove.length).toBe(1);
  });

  it("should <Input /> have correct behavior", () => {
    let btnAdd = wrapper.find("button[id='btnAddTopics']");
    expect(btnAdd.length).toBe(1);
    btnAdd.simulate("click");

    let input = wrapper.find("input[name='newItem']");
    expect(input.length).toBe(1);

    let btnRemove = wrapper.find("button[id='btnDelTopics']");
    expect(btnRemove.length).toBe(1);

    btnAdd.simulate("click");
    input.props().value = "changed";

    input.props().onChange({ currentTarget: { value: "changed" } });
    expect(input.prop("value")).toEqual("changed");
    btnRemove.simulate("click");
    input = wrapper.find("input[name='newItem']");
    expect(input.length).toBe(0);
  });

  it("should handleDelete have correct behavior", async () => {
    let items;
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <Configuration>
              <ListItems items={store.getState().topics} type="topics" />
              <ListItems items={store.getState().players} type="players" />
            </Configuration>
          </Router>
        </Provider>,
        container
      );
    });
    items = container.querySelectorAll("li[data-testid*='item-topics-']");
    expect(items.length).toBe(4);
    const btn = items[0].querySelector("button");
    fireEvent.click(btn);
    items = container.querySelectorAll("li[data-testid*='item-topics-']");
    expect(items.length).toBe(3);
  });

  it("should handleBlur have correct behavior", () => {
    let input;

    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <Configuration>
              <ListItems items={store.getState().topics} type="topics" />
              <ListItems items={store.getState().players} type="players" />
            </Configuration>
          </Router>
        </Provider>,
        container
      );
    });
    const addButton = container.querySelector("#btnAddTopics");
    act(() => {
      addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    input = container.querySelector("#inputNewItemTopics");
    act(() => {
      input.dispatchEvent(new MouseEvent("focus", { bubbles: true }));
      input.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
    });
    expect(input.className).toBe("error");
    input = container.querySelector("#inputNewItemTopics");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter" });

    expect(input.className).toBe("");
    expect(input.value).toEqual("changed");
    let btnAdd = container.querySelector("#inputNewItemTopics + #btnAddTopics");
    btnAdd.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    const item = {
      id: 5,
      label: "changed",
      available: false,
    };
    const expected = {
      type: "ADD_TOPIC",
      item,
    };
    expect(addItem(item, "topics")).toEqual(expected);
    const { next, invoke } = create();
    const action = addItem(item, "topics");
    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    let items = container.querySelectorAll("li[data-testid*='item-topics-']");
    expect(items.length).toBe(5);
  });

  it("should  <AddButton> have correct behavior", () => {
    let input;
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <Configuration>
              <ListItems items={store.getState().topics} type="topics" />
              <ListItems items={store.getState().players} type="players" />
            </Configuration>
          </Router>
        </Provider>,
        container
      );
    });
    let editedItemState = {
      input: {
        value: "changed",
        isError: false,
        isVisible: true,
      },
    };
    const addButton = container.querySelector("#btnAddTopics");
    act(() => {
      addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    input = container.querySelector("#inputNewItemTopics");
    fireEvent.change(input, { target: { value: "changed" } });

    setEditedItemState("SET_EDITED_ITEM_STATE", editedItemState);
  });

  it("should handleCheck have correct behavior", () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <Router history={history}>
            <Configuration>
              <ListItems items={store.getState().topics} type="topics" />
              <ListItems items={store.getState().players} type="players" />
            </Configuration>
          </Router>
        </Provider>,
        container
      );
    });
    const checkboxe = container.querySelector(
      "input[type='checkbox'][name='Histoire']"
    );
    act(() => {
      checkboxe.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(store.getState().topics[0].available).toBe(true);
    act(() => {
      checkboxe.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(store.getState().topics[0].available).toBe(false);
    act(() => {
      checkboxe.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    let items = container.querySelectorAll("li[data-testid*='item-topics-']");
    expect(items.length).toBe(4);
    const btn = items[0].querySelector("button");
    act(() => {
      btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    items = container.querySelectorAll("li[data-testid*='item-topics-']");
    expect(items.length).toBe(3);
  });
});
