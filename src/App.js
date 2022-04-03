import React, { useState } from "react";

import Header from "./components/header/header";
import RandomBlocks from "./components/random-blocks/random-blocks";
import SortBlocks from "./components/sort-blocks/sort-blocks";
import SortingDisplay from "./components/sortingDisplay";

import { Bubble_sort } from "./components/algorithms/bubble_sort";

import "./App.sass";

function App() {
    const [randomBlocks, setRandomBlocks] = useState([]);
    const [sortBlocksRefs, setSortBlocksRefs] = useState(null);
    const [currentSort, setCurrentSort] = useState("");

    let selectedSort;

    switch (currentSort) {
        case "bubble":
            selectedSort = (
                <SortingDisplay
                    randomBlocks={randomBlocks}
                    sortBlocksRefs={sortBlocksRefs}
                    sortingAlgorithm={Bubble_sort}
                />
            );
            break;
        case "selection":
            selectedSort = (
                <SortingDisplay
                    randomBlocks={randomBlocks}
                    sortBlocksRefs={sortBlocksRefs}
                />
            );
            break;
        default:
            selectedSort = <h1>Hello world</h1>;
            break;
    }

    return (
        <div className="App">
            <Header setCurrentSort={setCurrentSort} />

            <RandomBlocks
                randomBlock={randomBlocks}
                setRandomBlocks={setRandomBlocks}
            />

            {randomBlocks && (
                <div className="sorted">
                    <SortBlocks
                        randomBlocks={randomBlocks}
                        setSortBlocksRefs={setSortBlocksRefs}
                    />
                    {sortBlocksRefs && selectedSort}
                </div>
            )}
        </div>
    );
}

export default App;
