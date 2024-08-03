// src/components/ToggleButton.js
import React from 'react';

const ToggleButton = ({ toggleTheme, isDarkMode }) => {
    return (
        <button onClick={toggleTheme} className="toggle-button">
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};

export default ToggleButton;
