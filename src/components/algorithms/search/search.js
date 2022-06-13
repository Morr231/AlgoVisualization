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

    let xSize = Math.floor(window.innerHeight / 50) - 1;
    let ySize = Math.floor(window.innerWidth / 50);

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

                    if (
                        el.x + 1 < resultArray.length &&
                        el.x - 1 >= 0 &&
                        el.y + 1 < resultArray[0].length &&
                        el.y - 1 >= 0
                    ) {
                        const N = [];
                        N.push(resultArray[el.x + 1][el.y]);
                        N.push(resultArray[el.x - 1][el.y]);
                        N.push(resultArray[el.x][el.y - 1]);
                        N.push(resultArray[el.x][el.y + 1]);

                        N.forEach((n) => {
                            if (!(n.state === "wall")) {
                                if (currentN.indexOf(n) === -1) {
                                    currentN.push(n);
                                }
                                currentInserted.push(n);
                            }
                        });
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
                    searchBlocksRefs[el.x * ySize + el.y].classList.add(
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
                        endResult[2] * ySize + endResult[3]
                    ].classList.add("block-result");
                    endResult = result[endResult[1]];

                    if (endResult[0] == 0) {
                        searchBlocksRefs[
                            startNode.el.x * ySize + startNode.el.y
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
                        refs: searchBlocksRefs,
                        width: resultArray.length - 1,
                        height: resultArray[0].length - 1,
                        orientation: "h",
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
                xSize={xSize}
                ySize={ySize}
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
