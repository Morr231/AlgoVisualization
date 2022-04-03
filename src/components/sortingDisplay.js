import React, { useState } from "react";

import SortBlocks from "./sort-blocks/sort-blocks";

const SortingDisplay = ({ randomBlocks, sortBlocksRefs, sortingAlgorithm }) => {
    const numberOfItems = randomBlocks.length;
    let temp = randomBlocks;

    let start = performance.now();
    const result = sortingAlgorithm(temp, numberOfItems, sortBlocksRefs);
    let end = performance.now();

    return (
        <div className="Bubble_sort">
            <h2>Bubble Sort</h2>
        </div>
    );
};

export default SortingDisplay;
