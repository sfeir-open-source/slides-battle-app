import React from "react";

class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnAddNewPlayerClicked: false,
            inputNewPlayer: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleDelete(e) {
        const index = e.target.value;
        const { players } = this.props.state;
        this.setState(() => ({
            players: players.splice(index, 1)
        }));
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(() => ({btnAddNewPlayerClicked: true}));
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState(() => ({inputNewPlayer: value}));
    }

    handleKeyPress(e) {
        const {players} = this.props.state;
        const {inputNewPlayer} = this.state;

        if(e.key === 'Enter') {
            const newPlayers = players.push(inputNewPlayer);
            this.setState(() => (
                {
                    players: newPlayers,
                    btnAddNewPlayerClicked: false
                }
            ));

        }
    }

    render() {
        const {players} = this.props.state;
        return (
            <div className="container">
                <h1>Players</h1>
                <ListPlayers
                    list={players}
                    onDeletePlayer={this.handleDelete} />

                { this.state.btnAddNewPlayerClicked ?
                    <input
                        type="text"
                        value={this.state.inputNewPlayer}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                    /> :
                    ''
                }
                <BtnAddNewPlayer handleClick={this.handleClick} />

            </div>
        )
    }
}

class ListPlayers extends React.Component {
    render() {
        const { list: players,  onDeletePlayer} = this.props;
        const listPlayers = players.map( (player, index) => (
        <li key={index} className="form-check mb-2 p-0">
            <span className="form-check-label">{player}</span>
            <button className="btn btn-danger py-0 px-2 ml-2" onClick={onDeletePlayer} value={index}>X</button>
        </li>
        ));
        return <ul>{listPlayers}</ul>
    }
}


class BtnAddNewPlayer extends React.Component {
    render() {
        const { handleClick} = this.props;
        return (<button className="btn btn-primary py-0 px-2" onClick={handleClick}> + </button>);
    }
}
export default Players;