import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { btnAddClicked, setEditedItemState } from "../actions/listItemsActions";

import getClickedButtonContext from "../selectors/getBtnAddClicked";

import * as actionTypes from "../actions/actionTypes";

import "../App.css";

export const ListItems = (props) => {
	// Initial setup
	//const [btnAddNewItemClicked, setBtnAddNewItemClicked] = useState(false);
	//const [inputEditedItemVisible, setInputEditedItemVisible] = useState(false);
	//const [editedItem, setEditedItem] = useState(null);
	//const [editedItemIndex, setEditedItemIndex] = useState(null);
	//const [inputEditedItem, setInputEditedItem] = useState("");
	//const [inputNewItem, setInputNewItem] = useState("");

	const editedItemState = props.editedItemState;

	const clickedButtonContext = useSelector(getClickedButtonContext);

	const dispatch = useDispatch();

	const inputEl = useRef(null);

	useEffect(() => {
		const { isBtnAddClicked, typeOfItem } = clickedButtonContext;

		if (isBtnAddClicked && props.type === typeOfItem) {
			if (inputEl.current.value === "") {
				// @TODO Add Error Class
				dispatch(
					setEditedItemState(
						{
							item: null,
							input: {
								value: "",
								isError: false,
							},
							index: null,
							type: props.type,
						},
						actionTypes.EDITED_ITEM_STATE
					)
				);
				//dispatch(btnAddClicked(false, props.type, "BTN_ADD_CLICKED"));
			}
			if (inputEl.current.value !== "") {
				handleSubmit();
				//setBtnAddNewItemClicked(false);
				//setInputNewItem("");
			}
		}
		// eslint-disable-next-line
	}, [clickedButtonContext]);

	const handleDelete = (e) => {
		const index = e.currentTarget.value;
		const items = props.items;
		const selectedItem = items[index];
		const selectedItems = props.selectedItems || [];
		const exist = selectedItems.includes(selectedItem);
		let action =
			props.type === "topics"
				? actionTypes.DELETE_TOPIC
				: actionTypes.DELETE_PLAYER;

		// delete item from selectedItems too
		if (exist) {
			const indexSelectedItem = selectedItems.indexOf(selectedItem);
			dispatch(
				deleteSelectedTopicsItem(
					items[indexSelectedItem],
					actionTypes.DELETE_SELECTED_ITEM
				)
			);
		}
		dispatch(deleteItem(items[index], action));
	};

	const handleClickAdd = (e) => {
		//const { isBtnAddClicked } = clickedButtonContext;

		const value = e.currentTarget.value;

		dispatch(btnAddClicked(true, props.type, actionTypes.BTN_ADD_CLICKED));

		/*if (isBtnAddClicked) {
			const previousSiblingElement = e.currentTarget.previousElementSibling;
			setPreviousSibling(previousSiblingElement);
			if (previousSiblingElement.value !== "") {
				dispatch(btnAddClicked(true, props.type, "BTN_ADD_CLICKED"));
				handleSubmit();
			}
		}*/
	};

	const handleSubmit = () => {
		let action =
			props.type === "topics" ? actionTypes.ADD_TOPIC : actionTypes.ADD_PLAYER;

		dispatch(addItem(editedItemState.input.value, action));
		dispatch(btnAddClicked(false, props.type, actionTypes.BTN_ADD_CLICKED));
		dispatch(
			setEditedItemState(
				{
					item: null,
					input: {
						value: "",
						isVisible: false,
						isError: false,
					},
					index: null,
					type: props.type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	const handleClickRemove = (e) => {
		//setBtnAddNewItemClicked(false);
		dispatch(btnAddClicked(false, props.type, actionTypes.BTN_ADD_CLICKED));
		dispatch(
			setEditedItemState(
				{
					item: null,
					input: {
						value: "",
						isVisible: false,
						isError: false,
					},
					index: null,
					type: props.type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
		//setInputNewItem("");
	};

	const handleChange = (e) => {
		const value = e.currentTarget.value;
		dispatch(
			setEditedItemState(
				{
					item: null,
					input: {
						value,
						isVisible: false,
						isError: false,
					},
					index: null,
					type: props.type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
		//setInputNewItem(value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			let action =
				props.type === "topics"
					? actionTypes.ADD_TOPIC
					: actionTypes.ADD_PLAYER;

			dispatch(addItem(editedItemState.input.value, action));
			dispatch(btnAddClicked(false, props.type, actionTypes.BTN_ADD_CLICKED));
			dispatch(
				setEditedItemState(
					{
						item: null,
						input: {
							value: "",
							isVisible: false,
							isError: false,
						},
						index: null,
						type: props.type,
					},
					actionTypes.EDITED_ITEM_STATE
				)
			);
			//setBtnAddNewItemClicked(false);
			//setInputNewItem("");
		}
	};

	// Initialize edition
	const handleClickEdit = (e) => {
		const element = e.target.innerHTML;
		const index = props.items.indexOf(element);
		//setEditedItem(element);
		//setEditedItemIndex(props.items.indexOf(element));
		//setInputEditedItem(element);
		//setInputEditedItemVisible(true);
		dispatch(
			setEditedItemState(
				{
					item: element,
					input: {
						value: element,
						isVisible: true,
					},
					index: index,
					type: props.type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	const handleEditChange = (e) => {
		const value = e.target.value;
		//setInputEditedItem(value);
		dispatch(
			setEditedItemState(
				{
					item: props.editedItemState.item,
					input: {
						value,
						isVisible: true,
					},
					index: props.editedItemState.index,
					type: props.type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	const handleEditKeyPress = (e) => {
		const items = props.items;
		const value = e.target.value;
		const index = items.indexOf(editedItemState.item);

		if (e.key === "Enter" && value !== "") {
			items[index] = value;
			//setEditedItem(element);
			//setEditedItemIndex(props.items.indexOf(element));
			//setInputEditedItem(element);
			dispatch(
				setEditedItemState(
					{
						item: value,
						input: {
							value,
							isVisible: false,
						},
						index,
						type: props.type,
					},
					actionTypes.EDITED_ITEM_STATE
				)
			);
			//setEditedItem("");
			//setEditedItemIndex(null);
			//setInputEditedItem("");
			//setInputEditedItemVisible(false);
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
					actionTypes.DELETE_SELECTED_ITEM
				)
			);
		} else {
			dispatch(
				addSelectedTopicsItem(selectedTopic, actionTypes.ADD_SELECTED_ITEM)
			);
		}
	};

	const handleBlur = (e) => {
		const value = e.target.value;
		dispatch(
			setEditedItemState(
				{
					item: value,
					input: {
						value,
						isVisible: true,
						isError: value === "" ? true : false,
					},
					index: null,
					type: props.type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	// Source : https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js:857-873
	const useOutsideEvent = (ref) => {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					dispatch(
						setEditedItemState(
							{
								item: null,
								input: {
									value: "",
									isVisible: false,
									isError: false,
								},
								index: null,
							},
							actionTypes.EDITED_ITEM_STATE
						)
					);
					dispatch(
						btnAddClicked(false, props.type, actionTypes.BTN_ADD_CLICKED)
					);
					//setInputEditedItemVisible(false);
				}
			}

			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	};

	const { items, type, children } = props;
	return (
		<div className="container">
			<h1>{children} </h1>
			<UlListItems
				items={items}
				typeItem={type}
				editedItemIndex={editedItemState.index}
				inputEditedItem={editedItemState.input.value}
				inputEditedItemVisible={editedItemState.input.isVisible}
				typeEditedItem={editedItemState.type}
				onDeleteItem={handleDelete}
				onSelectItem={handleCheck}
				onEditChange={handleEditChange}
				onClickEditedItem={handleClickEdit}
				onEditKeyPress={handleEditKeyPress}
				onClickOutside={useOutsideEvent}
				onClickAdd={handleClickAdd}
			/>
			<AddButton
				isClicked={clickedButtonContext.isBtnAddClicked}
				context={clickedButtonContext}
				type={props.type}
				inputValue={editedItemState.input.value}
				onKeyPress={handleKeyPress}
				onChange={handleChange}
				onClickAdd={handleClickAdd}
				remove={handleClickRemove}
				inputRef={inputEl}
				isError={editedItemState.input.isError}
				onBlur={handleBlur}
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
		typeEditedItem,
		onDeleteItem,
		onSelectItem,
		onEditChange,
		onClickEditedItem,
		onEditKeyPress,
		onClickOutside,
	} = props;

	const wrapperRef = useRef(null);
	onClickOutside(wrapperRef);

	const className = typeItem === "players" ? " p-2" : "";

	const listItems = items.map((item, index) => (
		<li
			key={index}
			className={
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
				{editedItemIndex === index &&
				inputEditedItemVisible &&
				typeItem === typeEditedItem ? (
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
		<IconButton
			aria-label="remove"
			onClick={handleClick}
			title="Remove item"
			style={{ color: "#fff" }}
		>
			<RemoveCircleIcon />
		</IconButton>
	);
}

function AddButton(props) {
	const {
		isClicked = false,
		context,
		type,
		onKeyPress,
		onChange,
		inputValue,
		onClickAdd,
		remove,
		inputRef,
		isError,
		onBlur,
	} = props;
	return isClicked && context.typeOfItem === type ? (
		<React.Fragment>
			<input
				type="text"
				value={inputValue}
				name="newItem"
				onKeyPress={onKeyPress}
				onChange={onChange}
				ref={inputRef}
				className={isError ? "error" : ""}
				onBlur={onBlur}
			/>
			<BtnAddNewItem onClick={onClickAdd} />
			<BtnRemoveNewItem onClick={remove} />
		</React.Fragment>
	) : (
		<BtnAddNewItem onClick={onClickAdd} />
	);
}

export default ListItems;
