import React, { useState, useEffect, useRef } from "react";

import BlockChild from "./blockChild";
import Block from "./block";

import "./search-blocks.sass";

const SearchBlocks = ({
    xSize,
    ySize,
    blockState,
    resultArray,
    setResultArray,
    startNode,
    endNode,
    setStartNode,
    setEndNode,
    setSearchBlocksRefs,
}) => {
    let randomSearchBlocksRef = useRef({});

    useEffect(() => {
        setSearchBlocksRefs(randomSearchBlocksRef.current);
    }, []);

    useEffect(() => {
        setResultArray(
            new Array(xSize).fill(0).map((f, indexF) => {
                return new Array(ySize).fill(0).map((s, indexS) => {
                    return new Block(indexF * ySize + indexS, indexF, indexS);
                });
            })
        );
    }, []);

    if (startNode) {
        const tempArray = resultArray;

        tempArray.forEach((elF) => {
            return elF.forEach((elS) => {
                const distanceX = Math.abs(startNode.el.x - elS.x);
                const distanceY = Math.abs(startNode.el.y - elS.y);
                elS.weight = Math.floor(
                    Math.sqrt(distanceX * distanceX + distanceY * distanceY) *
                        10
                );
                return elS;
            });
        });

        setResultArray(tempArray);
    }

    return (
        <div className="search-blocks">
            <div
                className="block-container"
                style={{ gridTemplateColumns: `repeat(${ySize}, 50px)` }}
            >
                {resultArray.map((elF, indexF) => {
                    return elF.map((elS, indexS) => {
                        return (
                            <BlockChild
                                el={elS}
                                startNode={startNode}
                                endNode={endNode}
                                setStartNode={setStartNode}
                                setEndNode={setEndNode}
                                blockState={blockState}
                                forwardedRef={(ref) =>
                                    (randomSearchBlocksRef.current[
                                        indexF * ySize + indexS
                                    ] = ref)
                                }
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default SearchBlocks;
