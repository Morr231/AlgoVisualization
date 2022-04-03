import React, { useState, useEffect } from "react";

import "./header.sass";

const Header = ({ setCurrentSort }) => {
    const setSort = (sorting) => {
        setCurrentSort(sorting);
    };

    return (
        <div className="header">
            <h1 className="header-container-logo">Sort it!</h1>

            <div className="header-buttons">
                <a
                    className="header-buttons__element"
                    onClick={() => {
                        setSort("bubble");
                    }}
                >
                    Bubble Sort
                </a>
                <a
                    className="header-buttons__element"
                    onClick={() => {
                        setSort("selection");
                    }}
                >
                    Selection Sort
                </a>
            </div>
        </div>
    );
};

export default Header;
