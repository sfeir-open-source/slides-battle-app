import React from "react";
import "../App.css";

import Header from "./Header";

import ListItems from "./ListItems";
class Configuration extends React.Component {
  constructor(props) {
    super(props);
    const TOPICS = ['Histoire', 'Cinéma', 'Bande dessiné', 'Series US'];
    const PLAYERS = ['Batman', 'Catwoman', 'Superman', 'Supergirl'];
    this.state = {
        topics: TOPICS,
        players: PLAYERS,
        selectedTopics: []
    };
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  startGame() {
    // Launch game's component
    console.log("Start Game");
  }

  render() {
    return (
        <>
        <Header />
        <div className="row pt-3 App-content flex-row m-0">
            <div className="col-md-6 border-right">
                <ListItems items={this.state.topics} type="topics" selectedItems={this.state.selectedTopics}> Liste des thèmes </ListItems>
            </div>
            <div className="col-md-6">
                <ListItems items={this.state.players} type="players"> Liste des joueurs</ListItems>
            </div>
        </div>
        </>
    )
  }
}

export default Configuration;