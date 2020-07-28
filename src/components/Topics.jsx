import React from "react";
import "../App.css";

class Topics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnAddNewTopicClicked: false,
            inputNewTopic: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleDelete(e) {
        const index = e.target.value;
        const { topics} = this.props.data;
        this.setState(() => ({
            topics: topics.splice(index, 1)
        }));
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(() => ({btnAddNewTopicClicked: true}));
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState(() => ({inputNewTopic: value}));
    }

    handleKeyPress(e) {
        const {topics} = this.props.data;
        const {inputNewTopic} = this.state;

        if(e.key === 'Enter') {
            const newTopics = topics.push(inputNewTopic);

            this.setState(() => ({
                topics: newTopics,
                btnAddNewTopicClicked: false
            }));
        }
    }
    handleCheck(e) {
        const index = e.target.value;

        const { topics, selectedTopics } = this.props.data;
        const selectedTopic = topics[index];
        const exist = selectedTopics.includes(selectedTopic);
        if(exist) {
            const indexSelectedTopics = selectedTopics.indexOf(selectedTopic)
            selectedTopics.splice(indexSelectedTopics, 1)
        } else {
            selectedTopics.push(selectedTopic)
        }
        this.setState(() => ({
            selectedTopics: selectedTopics
        }));

    }
    render() {
        const {topics, selectedTopics} = this.props.data;
        return (
            <div className="container">
                <h1>Liste des thèmes</h1>
                <p>{selectedTopics}</p>
                <ListTopics
                    list={topics}
                    onSelectTopic={this.handleCheck}
                    onDeleteTopic={this.handleDelete} />

                { this.state.btnAddNewTopicClicked ?
                    <input type="text" value={this.state.inputNewTopic} onKeyPress={this.handleKeyPress} onChange={this.handleChange} /> :
                    ''
                }

                <BtnAddNewTopic handleClick={this.handleClick} />
            </div>
        );
    }
}

class BtnAddNewTopic extends React.Component {
    render() {
        const { handleClick} = this.props;
        return (<button className="btn btn-primary py-0 px-2" onClick={handleClick}> + </button>);
    }
}

class ListTopics extends React.Component {
    render() {
        const { list: topics,  onDeleteTopic, onSelectTopic} = this.props;
        const listTopics = topics.map( (topic, index) => (
        <li key={index} className="form-check mb-2">
            <input type="checkbox" name={topic} className="form-check-input" onClick={onSelectTopic} value={index} />
            <span className="form-check-label">{topic}</span>
            <button className="btn btn-danger py-0 px-2 ml-2" onClick={onDeleteTopic} value={index}>X</button>
        </li>
        ));
        return <ul>{listTopics}</ul>
    }
}

export default Topics;