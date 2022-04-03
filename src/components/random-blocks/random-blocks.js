import React, { useState, useEffect } from "react";

import "./random-blocks.sass";

const RandomBlocks = ({ setRandomBlocks }) => {
    const fill_random = (numberOfItems) => {
        const array = [];
        for (let i = 0; i < numberOfItems; i++) {
            array.push(Math.floor(Math.random() * numberOfItems) + 1);
        }
        return array;
    };

    const numberOfItems = 50;

    const randomArray = fill_random(numberOfItems);

    useEffect(() => {
        setRandomBlocks(randomArray);
    }, []);

    return <div className="random-blocks"></div>;
};

export default RandomBlocks;
