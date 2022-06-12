import React, { useState } from "react";

import Graph from "./graph";
import LinkedList from "./linked-list";
import SearchBlocks from "../../random-blocks/search-blocks/search-blocks";

import recursiveDivision from "./maze/recursive-division";

const Search = () => {
    const [blockState, setBlockState] = useState("");
    const [resultArray, setResultArray] = useState([]);
    const [searchBlocksRefs, setSearchBlocksRefs] = useState(null);

    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);

    const [speed, setSpeed] = useState(150);

    let xSize = 50;
    let ySize = 15;

    const mainGraph = new Graph();

    const startSearch = async () => {
        if (startNode && endNode) {
            let visited = [startNode.el];
            mainGraph.graph.set(visited[0].vertice, new LinkedList());

            let foundEnd = false;
            let noWay = false;
            let timerTime = 150;

            while (!foundEnd) {
                let currentN = [];
                let currentNSlow = [];

                for (let el of visited) {
                    let currentInserted = [];

                    if (el.x + 1 < resultArray.length) {
                        const upperN = resultArray[el.x + 1][el.y];
                        if (!(upperN.state == "wall")) {
                            if (currentN.indexOf(upperN) == -1) {
                                currentN.push(upperN);
                            }
                            currentInserted.push(upperN);
                        }
                    }

                    if (el.x - 1 >= 0) {
                        const lowerN = resultArray[el.x - 1][el.y];
                        if (!(lowerN.state == "wall")) {
                            if (currentN.indexOf(lowerN) == -1) {
                                currentN.push(lowerN);
                            }
                            currentInserted.push(lowerN);
                        }
                    }

                    if (el.y + 1 < resultArray[0].length) {
                        const rightN = resultArray[el.x][el.y + 1];
                        if (!(rightN.state == "wall")) {
                            if (currentN.indexOf(rightN) == -1) {
                                currentN.push(rightN);
                            }
                            currentInserted.push(rightN);
                        }
                    }

                    if (el.y - 1 >= 0) {
                        const leftN = resultArray[el.x][el.y - 1];
                        if (!(leftN.state == "wall")) {
                            if (currentN.indexOf(leftN) == -1) {
                                currentN.push(leftN);
                            }
                            currentInserted.push(leftN);
                        }
                    }

                    currentInserted.forEach((N) => {
                        mainGraph.insert(el, N);
                    });

                    if (currentN == currentNSlow) {
                        noWay = true;
                        break;
                    }

                    if (currentN.indexOf(endNode.el) != -1) {
                        foundEnd = true;
                        break;
                    }

                    currentNSlow = currentInserted;
                }

                if (noWay) {
                    break;
                }

                currentN.forEach((el) => {
                    searchBlocksRefs[el.x * 35 + el.y].classList.add(
                        "block-visited"
                    );
                });

                await new Promise((r) => {
                    setTimeout(r, timerTime);
                });
                visited = currentN;
            }

            if (noWay) {
                console.log("No way!");
            } else {
                const result = mainGraph.dijkstra(startNode.el.vertice);

                let endResult = result[endNode.el.vertice];

                while (endResult[0] != startNode.el.vertice) {
                    searchBlocksRefs[
                        endResult[2] * 35 + endResult[3]
                    ].classList.add("block-result");
                    endResult = result[endResult[1]];

                    if (endResult[0] == 0) {
                        searchBlocksRefs[
                            startNode.el.x * 35 + startNode.el.y
                        ].classList.add("block-result");
                        break;
                    }
                }
            }
        }
    };

    const changeSpeed = (e) => {
        setSpeed(e.target.value);
    };

    return (
        <div className="search">
            <button
                className="block-state"
                onClick={() => {
                    setBlockState("start");
                }}
            >
                Start
            </button>
            <button
                className="block-state"
                onClick={() => {
                    setBlockState("end");
                }}
            >
                End
            </button>
            <button
                className="block-state"
                onClick={() => {
                    setBlockState("wall");
                }}
            >
                Wall
            </button>

            <button
                className="block-state"
                onClick={() => {
                    recursiveDivision({
                        array: resultArray,
                        center: Math.floor(resultArray[0].length / 2),
                        refs: searchBlocksRefs,
                    });
                }}
            >
                Build maze
            </button>

            <button className="search-start" onClick={startSearch}>
                Start
            </button>

            <input
                type="range"
                min="50"
                max="500"
                value={speed}
                step="10"
                onChange={changeSpeed}
            />

            <SearchBlocks
                blockState={blockState}
                resultArray={resultArray}
                startNode={startNode}
                endNode={endNode}
                setResultArray={setResultArray}
                setStartNode={setStartNode}
                setEndNode={setEndNode}
                setSearchBlocksRefs={setSearchBlocksRefs}
            />
        </div>
    );
};

export default Search;
