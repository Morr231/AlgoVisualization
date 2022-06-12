import React, { useState, useEffect, useRef } from "react";

import BlockChild from "./blockChild";
import Block from "./block";

import "./search-blocks.sass";

const SearchBlocks = ({
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
            new Array(16).fill(0).map((f, indexF) => {
                return new Array(35).fill(0).map((s, indexS) => {
                    return new Block(indexF * 35 + indexS, indexF, indexS);
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
            <div className="block-container">
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
                                        indexF * 35 + indexS
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
