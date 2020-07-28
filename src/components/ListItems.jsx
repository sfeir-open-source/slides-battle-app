import React from 'react';
import '../App.css';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

class ListItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnAddNewItemClicked: false,
            inputNewItem: '',
            editedItem: null,
            inputEditedItem: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditKeyPress = this.handleEditKeyPress.bind(this)
    }

    handleDelete(e) {
        const index = e.currentTarget.value;
        const items = this.props.data;
        const selectedItem = items[index];
        const selectedItems = this.props.selectedItems || [];
        const exist = selectedItems.includes(selectedItem);
        if(exist) {
            const indexSelectedTopics = selectedItems.indexOf(selectedItem);
            selectedItems.splice(indexSelectedTopics, 1);
        }
        this.setState(() => ({
            items: items.splice(index, 1),
            selectedTopics:  selectedItems
        }));
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(() => ({btnAddNewItemClicked: true}));
    }

    handleChange(e) {
        const value = e.currentTarget.value;
        this.setState(() => ({inputNewItem: value}));
    }

    handleKeyPress(e) {
        const items = this.props.data;
        const {inputNewItem} = this.state;
        if(e.key === 'Enter') {
            const newItems = items.push(inputNewItem);
            this.setState(() => ({
                items: newItems,
                btnAddNewItemClicked: false,
                inputNewItem: ''
            }));
        }
    }

    // Initialize edition
    handleClickEdit(e) {
        const element = e.target.innerHTML;
        this.setState(() => ({
            editedItem: element,
            inputEditedItem: element
        }));
    }

    handleEditChange(e) {
        const value = e.target.value;
        this.setState(() => ({
            inputEditedItem: value
        }));
    }

    handleEditKeyPress(e) {
        const items = this.props.data;
        const value = e.target.value;
        const index = items.indexOf(this.state.editedItem);

        if(e.key === 'Enter') {
            const newItems = items[index] = (value);
            this.setState(() => ({
                items: newItems,
                btnAddNewItemClicked: false,
                editedItem: '',
                inputEditedItem: ''
            }));
        }
    }

    handleCheck(e) {
        const index = e.target.value;
        const topics = this.props.data;
        const selectedTopics = this.props.selectedItems;
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
        const {type, children} = this.props;
        const {editedItem, inputEditedItem} = this.state;
        const items = this.props.data;
        const selectedItems = this.props.selectedItems;
        return (
            <div className="container">
                <h1>{children}</h1>
                <UlListItems
                    items={items}
                    selectedItems={selectedItems}
                    onDeleteItem={this.handleDelete}
                    onSelectItem={this.handleCheck}
                    onEditChange={this.handleEditChange}
                    onClickEditedItem={this.handleClickEdit}
                    editedItem={editedItem}
                    inputEditedItem={inputEditedItem}
                    onEditKeyPress={this.handleEditKeyPress}
                    typeItem={type} />

                { this.state.btnAddNewItemClicked ?
                    <input
                        type="text"
                        value={this.state.inputNewItem}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                    /> :
                    ''
                }
                <BtnAddNewItem handleClick={this.handleClick} />

            </div>
        )
    }
}

class UlListItems extends React.Component {
    render() {
        const { items, onDeleteItem, onSelectItem, onClickEditedItem, onEditChange, typeItem, editedItem, onEditKeyPress, inputEditedItem} = this.props;
        let className = (typeItem === 'players') ? 'p-2' : '' ;
        const listItems = items.map( (item, index) => (
        <li key={index} className={"form-check d-flex justify-content-between " + className}>
            { (typeItem === 'topics') ?
                <input
                    type="checkbox"
                    name={item}
                    className="form-check-input"
                    onClick={onSelectItem}
                    value={index}
                /> :
                ''
            }
            {(editedItem === item) ?
                <input
                    type="text"
                    className="form-control col-md-8"
                    value={inputEditedItem}
                    onKeyPress={onEditKeyPress}
                    onChange={onEditChange}
                /> :
                <span className="form-check-label" onClick={onClickEditedItem}>{item}</span>
            }
            <IconButton aria-label="delete" onClick={onDeleteItem} value={index}>
                <DeleteIcon />
            </IconButton>
        </li>
        ));
        return <ul className="p-0">{listItems}</ul>
    }
}

class BtnAddNewItem extends React.Component {
    render() {
        const { handleClick} = this.props;
        return (
        <>
        <IconButton
            aria-label="add"
            onClick={handleClick}
            title="Add new item"> <AddCircleRoundedIcon /> </IconButton>
        </>);
    }
}

export default ListItems;