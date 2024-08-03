// src/components/Filter.js
import React from 'react';

const Filter = ({ filters, updateFilter, categories }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFilter(name, value);
    };

    return (
        <div className="filters">
            <input
                type="text"
                name="search"
                placeholder="Search tasks"
                value={filters.search}
                onChange={handleChange}
            />
            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
            >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            <select
                name="priority"
                value={filters.priority}
                onChange={handleChange}
            >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select
                name="category"
                value={filters.category}
                onChange={handleChange}
            >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
