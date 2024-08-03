// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/filter';
import ToggleButton from './components/ToggleButton';
import { fetchTasks } from './utils/api';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        category: '',
    });
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        loadTasks();
    }, []);

    const refreshTasks = async () => {
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
    };

    const updateFilter = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const toggleComplete = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                task.status = task.status === 'completed' ? 'pending' : 'completed';
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesStatus = filters.status === '' || task.status === filters.status;
        const matchesPriority = filters.priority === '' || task.priority === filters.priority;
        const matchesCategory = filters.category === '' || task.category === filters.category;
        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    const categories = [...new Set(tasks.map(task => task.category))];

    return (
        <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <header className="app-header">
                <h1>Maintenance Task Tracker</h1>
                <ToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            </header>
            <TaskForm refreshTasks={refreshTasks} />
            <Filter filters={filters} updateFilter={updateFilter} categories={categories} />
            <TaskList tasks={filteredTasks} refreshTasks={refreshTasks} toggleComplete={toggleComplete} />
            <footer className="app-footer">
                <p>© 2024 Task Management System | Follow us on:</p>
                <div className="social-links">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
            </footer>
        </div>
    );
};

export default App;
