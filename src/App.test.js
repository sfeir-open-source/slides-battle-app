import React from 'react'
import { mount, shallow } from 'enzyme'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import { createStore } from 'redux';
import { Router } from "react-router-dom";

import App from './App'
import Header from './components/Header'
import Navigation from './components/Navigation'

const store = createStore(rootReducer);
describe('<App />', () => {
  it('should renders without crashing', () => {
    const wrapper = shallow(<App />)
  });

  it('shoudl renders 2 components : Header & Navigation', () => {
    const history = createMemoryHistory();
    const route = '/config'
    history.push(route)
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>)
    expect(wrapper.contains(<Header />)).toBe(true);
    expect(wrapper.contains(<Navigation />)).toBe(true);
  });
})
