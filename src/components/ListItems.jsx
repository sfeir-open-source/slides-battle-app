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

	const { editedItemState } = props;

	const clickedButtonContext = useSelector(getClickedButtonContext);

	const dispatch = useDispatch();

	const inputEl = useRef(null);

	useEffect(() => {
		const { isBtnAddClicked, typeOfItem } = clickedButtonContext;
		const { type } = props;

		if (isBtnAddClicked && type === typeOfItem) {
			if (inputEl.current.value === "") {
				// @TODO Add Error Class
				dispatch(
					setEditedItemState(
						{
							item: {
								id: "",
								label: "",
								available: false,
							},
							input: {
								value: "",
								isError: false,
							},
							index: null,
							type,
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
		const { items, type } = props;
		const selectedItem = items[index].id;
		const selectedItems = props.selectedItems || [];
		const exist = selectedItems.includes(selectedItem);

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
		dispatch(deleteItem(items[index], type));
	};

	const handleClickAdd = (e) => {
		//const { isBtnAddClicked } = clickedButtonContext;
		const { type } = props;
		dispatch(btnAddClicked(true, type, actionTypes.BTN_ADD_CLICKED));

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
		const { type } = props;

		dispatch(addItem(editedItemState.input.value, type));
		dispatch(btnAddClicked(false, type, actionTypes.BTN_ADD_CLICKED));
		dispatch(
			setEditedItemState(
				{
					item: {
						id: "",
						label: "",
						available: false,
					},
					input: {
						value: "",
						isVisible: false,
						isError: false,
					},
					index: null,
					type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	const handleClickRemove = (e) => {
		//setBtnAddNewItemClicked(false);
		const { type } = props;
		dispatch(btnAddClicked(false, type, actionTypes.BTN_ADD_CLICKED));
		dispatch(
			setEditedItemState(
				{
					item: {
						id: "",
						label: "",
						available: false,
					},
					input: {
						value: "",
						isVisible: false,
						isError: false,
					},
					index: null,
					type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
		//setInputNewItem("");
	};

	const handleChange = (e) => {
		const value = e.currentTarget.value;
		const { type } = props;
		dispatch(
			setEditedItemState(
				{
					item: {
						id: "",
						label: "",
						available: false,
					},
					input: {
						value,
						isVisible: false,
						isError: false,
					},
					index: null,
					type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
		//setInputNewItem(value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			// replace accents
			// camel case

			const { type } = props;
			const id = getLastItem(props) + 1;
			const item = {
				id,
				label: editedItemState.input.value,
				available: false,
			};
			dispatch(addItem(item, type));
			dispatch(btnAddClicked(false, type, actionTypes.BTN_ADD_CLICKED));
			dispatch(
				setEditedItemState(
					{
						item: {
							id: "",
							label: "",
							available: false,
						},
						input: {
							value: "",
							isVisible: false,
							isError: false,
						},
						index: null,
						type,
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
		const label = e.target.innerHTML;
		const id = e.target.id;
		const { items, type } = props;
		const index = items.findIndex((item) => item.id === id);

		//setEditedItem(element);
		//setEditedItemIndex(props.items.indexOf(element));
		//setInputEditedItem(element);
		//setInputEditedItemVisible(true);
		dispatch(
			setEditedItemState(
				{
					item: {
						id,
						label,
						available: false,
					},
					input: {
						value: label,
						isVisible: true,
					},
					index: index,
					type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	const handleEditChange = (e) => {
		const label = e.target.value;
		//setInputEditedItem(value);
		const { type, editedItemState } = props;
		const id = e.target.id;

		dispatch(
			setEditedItemState(
				{
					item: {
						id,
						label,
						available: false,
					},
					input: {
						label,
						isVisible: true,
					},
					index: editedItemState.index,
					type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	const handleEditKeyPress = (e) => {
		const label = e.target.value;
		const id = e.target.id;
		const { items, type } = props;
		const index = items.findIndex((item) => item.id === id);
		if (e.key === "Enter") {
			dispatch(
				setEditedItemState(
					{
						input: {
							label,
							isVisible: true,
							isError: label === "" ? true : false,
						},
						index,
						type,
					},
					actionTypes.EDITED_ITEM_STATE
				)
			);
		}
		if (e.key === "Enter" && label !== "") {
			items[index] = {
				id,
				label,
				available: false,
			};
			//setEditedItem(element);
			//setEditedItemIndex(props.items.indexOf(element));
			//setInputEditedItem(element);
			dispatch(
				setEditedItemState(
					{
						item: {
							id,
							label,
							available: false,
						},
						input: {
							label,
							isVisible: false,
							isError: label === "" ? true : false,
						},
						index,
						type,
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
		const { items } = props;
		const selectedTopic = items[index];
		const available = items[index].available;
		if (available) {
			selectedTopic.available = false;
			dispatch(
				deleteSelectedTopicsItem(
					selectedTopic,
					actionTypes.DELETE_SELECTED_ITEM
				)
			);
		} else {
			selectedTopic.available = true;
			dispatch(
				addSelectedTopicsItem(
					selectedTopic,
					actionTypes.ADD_SELECTED_ITEM
				)
			);
		}
	};

	const handleBlur = (e) => {
		const value = e.target.value;
		const id = e.target.id;
		const { type } = props;
		dispatch(
			setEditedItemState(
				{
					item: {
						id: id,
						label: value,
						available: false,
					},
					input: {
						value,
						isVisible: true,
						isError: value === "" ? true : false,
					},
					index: null,
					type,
				},
				actionTypes.EDITED_ITEM_STATE
			)
		);
	};

	// Source : https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js:857-873
	const useOutsideEvent = (ref) => {
		useEffect(() => {
			function handleClickOutside(event) {
				const { type } = props;
				if (ref.current && !ref.current.contains(event.target)) {
					dispatch(
						setEditedItemState(
							{
								item: {},
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
						btnAddClicked(false, type, actionTypes.BTN_ADD_CLICKED)
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
				inputEditedItem={editedItemState.input}
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
				type={type}
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

function getLastItem(props) {
	const { items } = props;
	const lastItem = items[items.length - 1];
	return parseInt(lastItem.id, 10);
}

function UlListItems(props) {
	const {
		items,
		typeItem,
		editedItemIndex,
		inputEditedItem,
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
	const inputClassName = "form-control col-md-10";
	const listItems = items.map((item, index) => (
		<li
			key={index}
			className={
				"form-check d-flex justify-content-between item-row" + className
			}>
			<div className="form-group">
				{typeItem === "topics" ? (
					<input
						type="checkbox"
						name={item.label}
						className="form-check-input"
						onClick={onSelectItem}
						value={index}
					/>
				) : (
					""
				)}
				{editedItemIndex === index &&
				inputEditedItem.isVisible &&
				typeItem === typeEditedItem ? (
					<input
						ref={wrapperRef}
						type="text"
						className={
							inputEditedItem.isError
								? "error "
								: "" + inputClassName
						}
						value={inputEditedItem.value}
						onKeyPress={onEditKeyPress}
						onChange={onEditChange}
						id={item.id}
					/>
				) : (
					<span
						className="form-check-label"
						id={item.id}
						onClick={onClickEditedItem}>
						{item.label}
					</span>
				)}
			</div>
			<IconButton
				aria-label="delete"
				onClick={onDeleteItem}
				value={index}
				style={{ color: "#fff" }}>
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
			style={{ color: "#fff" }}>
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
			style={{ color: "#fff" }}>
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
