import React from "react";
import "../App.css";
import { connect } from 'react-redux';

import Header from "./Header";

import ListItems from "./ListItems";
class Configuration extends React.Component {
  constructor(props) {
    super(props);

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
                <ListItems items={this.props.topics} type="topics" selectedItems={this.props.selectedTopics}> Liste des thèmes </ListItems>
            </div>
            <div className="col-md-6">
                <ListItems items={this.props.players} type="players"> Liste des joueurs</ListItems>
            </div>
        </div>
        </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        topics: state.topics,
        players: state.players,
        selectedTopics: state.selectedTopics
    }
}

export default connect(mapStateToProps)(Configuration);