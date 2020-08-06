import React from 'react';
import { shallow, mount } from 'enzyme'
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { expect } from 'chai'
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import Configuration from './Configuration'

const store = createStore(rootReducer);

describe('<Configuration />', () => {
    it('should have 2 components ListItems', (done) => {
        const history = createMemoryHistory();
        const route = '/config'
        history.push(route)
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration />
                </Router>
            </Provider>);
        expect(wrapper.find('Connect(ListItems)')).to.have.lengthOf(2);
        done();
    })

    it("should have a component ListItems with prop('type') = 'topics'", (done) => {
        const history = createMemoryHistory();
        const route = '/config'
        history.push(route)
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration />
                </Router>
            </Provider>);
            const received = wrapper.find('Connect(ListItems)').get(0).props.type;
            expect(received).to.equal('topics')
        done();
    })

    it("should have a component ListItems with prop('type') = 'players'", (done) => {
        const history = createMemoryHistory();
        const route = '/config'
        history.push(route)
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration />
                </Router>
            </Provider>);

        const received = wrapper.find('Connect(ListItems)').get(1).props.type;
        expect(received).to.equal('players')
        done();
    })
});

describe('<ListItems />', () => {
    it("should have a component ListItems with data : ['Batman', 'Catwoman', 'Superman', 'Supergirl']", (done) => {
        const history = createMemoryHistory();
        const route = '/config'
        history.push(route)
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration />
                </Router>
            </Provider>);
        const received = wrapper.find('Connect(ListItems)').get(1).props.items;
        const expected = ['Batman', 'Catwoman', 'Superman', 'Supergirl'];
        expect(JSON.stringify(received)).to.equal(JSON.stringify(expected));
        done();
    })
});

describe('<ListItems />', () => {
    it("should have a component ListItems with data : ['Histoire', 'Cinéma', 'Bande dessiné', 'Series US']", (done) => {
        const history = createMemoryHistory();
        const route = '/config'
        history.push(route)
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Configuration />
                </Router>
            </Provider>);
        const received = wrapper.find('Connect(ListItems)').get(0).props.items;
        const expected = ['Histoire', 'Cinéma', 'Bande dessiné', 'Series US'];
        expect(JSON.stringify(received)).to.equal(JSON.stringify(expected));
        done();
    })
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
