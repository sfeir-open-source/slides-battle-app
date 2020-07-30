import React from 'react';
import { connect } from 'react-redux';

import { updatePlayer } from './actions/players-action';

import './App.scss';
import Header from './components/Header'
import Navigation from './components/Navigation'
import { render } from '@testing-library/react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdatePlayer = this.onUpdatePlayer.bind(this);
    }

    onUpdatePlayer () {
        this.props.onUpdatePlayer('Sammy');
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Navigation />
                <div onClick={this.onUpdatePlayer}>Update Player</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players,
    topics: state.topics,
    selectedTopics: state.selectedTopics
});

const mapActionsToProps = {
    onUpdatePlayer: updatePlayer
};

export default connect(mapStateToProps, mapActionsToProps)(App);
