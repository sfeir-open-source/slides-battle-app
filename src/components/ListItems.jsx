import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

// @material-ui import
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

// actions import
import { addItem, deleteItem } from "../actions/ItemActions";
import {
    addSelectedTopicsItem,
    deleteSelectedTopicsItem,
} from "../actions/selectedTopicsItemActions";

import "../App.css";

export const ListItems = (props) => {
    // Initial setup
    const [btnAddNewItemClicked, setBtnAddNewItemClicked] = useState(false);
    const [inputEditedItemVisible, setInputEditedItemVisible] = useState(false);
    const [inputNewItem, setInputNewItem] = useState("");
    const [editedItem, setEditedItem] = useState(null);
    const [editedItemIndex, setEditedItemIndex] = useState(null);
    const [inputEditedItem, setInputEditedItem] = useState("");

    const dispatch = useDispatch();

    const handleDelete = (e) => {
        const index = e.currentTarget.value;
        const items = props.items;
        const selectedItem = items[index];
        const selectedItems = props.selectedItems || [];
        const exist = selectedItems.includes(selectedItem);
        let action = props.type === "topics" ? "DELETE_TOPIC" : "DELETE_PLAYER";

        // delete item from selectedItems too
        if (exist) {
            const indexSelectedItem = selectedItems.indexOf(selectedItem);
            dispatch(
                deleteSelectedTopicsItem(
                    items[indexSelectedItem],
                    "DELETE_SELECTED_ITEM"
                )
            );
        }
        dispatch(
            deleteItem(
                items[index],
                action
            )
        );
    };

    const handleClickAdd = (e) => {
        setBtnAddNewItemClicked(true);
        const previousSibling = e.currentTarget.previousElementSibling;

        if (btnAddNewItemClicked) {
            if (previousSibling.value === "") {
                previousSibling.classList.add("error");
            }
            if (previousSibling.value !== "") {
                let action = props.type === "topics" ? "ADD_TOPIC" : "ADD_PLAYER";
                dispatch(
                    addItem(
                        inputNewItem,
                        action
                    )
                );

                setBtnAddNewItemClicked(false);
                setInputNewItem("");
            }
        }
    };

    const handleClickRemove = (e) => {
        e.currentTarget.previousSibling.previousElementSibling.classList.remove("error");
        setBtnAddNewItemClicked(false);
        setInputNewItem("");
    };

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        setInputNewItem(value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            let action = props.type === "topics" ? "ADD_TOPIC" : "ADD_PLAYER";
            dispatch(
                addItem(
                    inputNewItem,
                    action
                )
            );
            setBtnAddNewItemClicked(false);
            setInputNewItem("");
        }
    };

    // Initialize edition
    const handleClickEdit = (e) => {
        const element = e.target.innerHTML;
        setEditedItem(element);
        setEditedItemIndex(props.items.indexOf(element));
        setInputEditedItem(element);
        setInputEditedItemVisible(true);
    };

    const handleEditChange = (e) => {
        const value = e.target.value;
        setInputEditedItem(value);
    };

    const handleEditKeyPress = (e) => {
        const items = props.items;
        const value = e.target.value;
        const index = items.indexOf(editedItem);
        if (e.key === "Enter" && value !== "") {
            items[index] = value;

            setEditedItem("");
            setEditedItemIndex(null);
            setInputEditedItem("");
            setInputEditedItemVisible(false);
        }
    };

    const handleCheck = (e) => {
        const index = e.target.value;
        const { items, selectedItems } = props;
        const selectedTopic = items[index];
        const exist = selectedItems.includes(selectedTopic);

        if (exist) {
            dispatch(
                deleteSelectedTopicsItem(
                    selectedTopic,
                    "DELETE_SELECTED_ITEM"
                )
            );
        } else {
            dispatch(
                addSelectedTopicsItem(
                    selectedTopic,
                    "ADD_SELECTED_ITEM"
                )
            );
        }
    };

    // Source : https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js:857-873
    const useOutsideEvent = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setInputEditedItemVisible(false);
                    setBtnAddNewItemClicked(false);
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const { items, type, children } = props;
    return (
        <div className="container">
            <h1>{children} </h1>
            <UlListItems
                items={items}
                typeItem={type}
                editedItemIndex={editedItemIndex}
                inputEditedItem={inputEditedItem}
                inputEditedItemVisible={inputEditedItemVisible}
                onDeleteItem={handleDelete}
                onSelectItem={handleCheck}
                onEditChange={handleEditChange}
                onClickEditedItem={handleClickEdit}
                onEditKeyPress={handleEditKeyPress}
                onClickOutside={useOutsideEvent}
            />
            <AddButton
                isClicked={btnAddNewItemClicked}
                inputValue={inputNewItem}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                add={handleClickAdd}
                remove={handleClickRemove}
            />

        </div>
    );
};

function UlListItems(props) {
    const {
        items,
        typeItem,
        editedItemIndex,
        inputEditedItem,
        inputEditedItemVisible,
        onDeleteItem,
        onSelectItem,
        onEditChange,
        onClickEditedItem,
        onEditKeyPress,
        onClickOutside
    } = props;

    const wrapperRef = useRef(null);
    onClickOutside(wrapperRef);

    const className = typeItem === "players" ? " p-2" : "";
    const listItems = items.map((item, index) => (
        <li
            key = {index}
            className = {
                "form-check d-flex justify-content-between item-row" + className
            }
        >
            <div className="form-group">
                {typeItem === "topics" ? (
                    <input
                        type="checkbox"
                        name={item}
                        className="form-check-input"
                        onClick={onSelectItem}
                        value={index}
                    />
                ) : (
                    ""
                )}
                { ( editedItemIndex === index && inputEditedItemVisible ) ? (
                    <input
                        ref={wrapperRef}
                        type="text"
                        className="form-control col-md-10"
                        value={inputEditedItem}
                        onKeyPress={onEditKeyPress}
                        onChange={onEditChange}
                    />
                ) : (
                    <span className="form-check-label" onClick={onClickEditedItem}>
                        {item}
                    </span>
                )}
            </div>
            <IconButton
                aria-label="delete"
                onClick={onDeleteItem}
                value={index}
                style={{ color: "#fff" }}
            >
                <DeleteIcon />
            </IconButton>
        </li>
    ));
    return <ul className="p-0">{listItems}</ul>;
}

function BtnAddNewItem(props) {
    const handleClick = props.onClick;

    return (
        <IconButton
            aria-label="add"
            onClick={handleClick}
            title="Add new item"
            style={{ color: "#fff" }}
        >
            <AddCircleRoundedIcon />
        </IconButton>
    );
}

function BtnRemoveNewItem(props) {
    const handleClick = props.onClick;
    return (
        <React.Fragment>
            <IconButton
                aria-label="remove"
                onClick={handleClick}
                title="Remove new item"
                style={{ color: "#fff" }}
            >
            <RemoveCircleIcon />
            </IconButton>
        </React.Fragment>
    );
}


function AddButton(props) {
    const {
        isClicked,
        onKeyPress,
        onChange,
        inputValue,
        add,
        remove
    } = props;

    return isClicked ? (
        <React.Fragment>
            <input
                type="text"
                value={inputValue}
                name="newItem"
                onKeyPress={onKeyPress}
                onChange={onChange}
            />
            <BtnAddNewItem onClick={add} />
            <BtnRemoveNewItem onClick={remove} />
        </React.Fragment>
    ) : (
        <BtnAddNewItem onClick={add} />
    )
}

export default ListItems;
