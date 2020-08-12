import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../App.css";

import Header from "./Header";
import ListItems from "./ListItems";

import getTopics from '../selectors/getTopics';
import getPlayers from '../selectors/getPlayers';
import getSelectedTopics from '../selectors/getSelectedTopics';

function Configuration() {

    const topics = useSelector(getTopics);
    const players = useSelector(getPlayers);
    const selectedTopics = useSelector(getSelectedTopics);

    /*const topicsFromStore = useSelector((state) => state.topics);
    const [topics, setTopics] = useState([]);

    const selectedTopicsFromStore = useSelector((state) => state.selectedTopics);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const playersFromStore = useSelector((state) => state.players);
    const [players, setPlayers] = useState([]);
*/
    useEffect(() => {
        /*setTopics(topicsFromStore);
        setSelectedTopics(selectedTopicsFromStore);
        setPlayers(playersFromStore);*/
    }, [topics, selectedTopics, players]);

    return (
        <React.Fragment>
            <Header />
            <div className="row pt-3 App-content flex-row m-0">
            <div className="col-md-6 border-right">
                <ListItems
                items={topics}
                type="topics"
                selectedItems={selectedTopics}
                >
                Liste des thèmes
                </ListItems>
            </div>
            <div className="col-md-6">
                <ListItems items={players} type="players">
                Liste des joueurs
                </ListItems>
            </div>
            </div>
        </React.Fragment>
    );
}

export default Configuration;
