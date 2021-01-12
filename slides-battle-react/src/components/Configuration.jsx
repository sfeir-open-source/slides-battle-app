import React from "react";
import { useSelector } from "react-redux";
import "../App.css";

import Header from "./Header";
import ListItems from "./ListItems";

import getTopics from "../selectors/getTopics";
import getPlayers from "../selectors/getPlayers";
import getEditedItemState from "../selectors/getEditedItemState";

function Configuration() {
	const topics = useSelector(getTopics);
	const players = useSelector(getPlayers);
	const editedItemState = useSelector(getEditedItemState);

	return (
		<React.Fragment>
			<Header />
			<div className="row pt-3 App-content flex-row m-0">
				<div className="col-md-6 border-right">
					<ListItems
						items={topics}
						type="topics"
						editedItemState={editedItemState}
					>
						Liste des thèmes
					</ListItems>
				</div>
				<div className="col-md-6">
					<ListItems
						items={players}
						type="players"
						editedItemState={editedItemState}
					>
						Liste des joueurs
					</ListItems>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Configuration;
