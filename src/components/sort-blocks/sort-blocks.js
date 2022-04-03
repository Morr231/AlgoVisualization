import React, { useState, useRef, useEffect } from "react";

import "./sort-blocks.sass";

const SortBlocks = ({ randomBlocks, setSortBlocksRefs }) => {
    let randomBlocksRef = useRef({});

    useEffect(() => {
        setSortBlocksRefs(randomBlocksRef.current);
    }, []);

    return (
        <div className="sort-blocks">
            {randomBlocks.map((randomBlock, index) => {
                return (
                    <div
                        className="sort-blocks-element"
                        ref={(ref) => (randomBlocksRef.current[index] = ref)}
                        style={{ height: `${5 * randomBlock}px` }}
                    ></div>
                );
            })}
        </div>
    );
};

export default SortBlocks;
