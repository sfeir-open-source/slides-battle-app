import React from 'react';
import { mount } from 'enzyme'
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { expect } from 'chai'
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import ListItems from './ListItems'
import Configuration from './Configuration'

const store = createStore(rootReducer);

describe('<ListItems />', () => {
    it('should have correct structure', (done) => {
        const history = createMemoryHistory();
        const route = '/config'
        history.push(route)
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration>
                        <ListItems items={store.getState().topics} type='topics' />
                        <ListItems items={store.getState().players} type='players' />
                    </Configuration>
                </Router>
            </Provider>);
        expect(wrapper.find('Connect(ListItems)')).to.have.lengthOf(2);
        const UlListItems = wrapper.find('Connect(ListItems)').find('UlListItems');
        expect(UlListItems).to.have.lengthOf(2);
        // Topics list items
        expect(UlListItems.first().find('li')).to.have.lengthOf(4);
        // Players list items
        expect(UlListItems.last().find('li')).to.have.lengthOf(4);

        done();
    })
});