// src/components/TaskForm.js
import React, { useState } from 'react';
import { addTask } from '../utils/api';

const TaskForm = ({ refreshTasks }) => {
    const [task, setTask] = useState({
        description: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        receiveDate: '',
        priority: '',
        productColor: '',
        productBrand: '',
        productType: '',
        problemFound: '',
        assignedTo: '',
        category: '',
        tags: '',
        progress: 0,
        recurring: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Email and Phone Validation
        if (!validateEmail(task.customerEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!validatePhone(task.customerPhone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Date Validation
        if (new Date(task.receiveDate) > new Date()) {
            alert('The selected date cannot be in the future.');
            return;
        }

        if (!task.description || !task.receiveDate || !task.priority) {
            alert('Task Description, Receive Date, and Priority are required.');
            return;
        }

        const taskWithId = { ...task, id: Date.now(), status: 'pending' };
        await addTask(taskWithId);
        refreshTasks();
        setTask({
            description: '',
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            receiveDate: '',
            priority: '',
            productColor: '',
            productBrand: '',
            productType: '',
            problemFound: '',
            assignedTo: '',
            category: '',
            tags: '',
            progress: 0,
            recurring: '',
        });
    };

    // Validate Email
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Validate Phone Number
    const validatePhone = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                placeholder="Task Description"
                value={task.description}
                onChange={handleChange}
            />
            <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={task.customerName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="customerEmail"
                placeholder="Customer Email"
                value={task.customerEmail}
                onChange={handleChange}
            />
            <input
                type="tel"
                name="customerPhone"
                placeholder="Customer Phone"
                value={task.customerPhone}
                onChange={handleChange}
            />
            <input
                type="date"
                name="receiveDate"
                value={task.receiveDate}
                onChange={handleChange}
            />
            <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
            >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input
                type="text"
                name="productColor"
                placeholder="Product Color"
                value={task.productColor}
                onChange={handleChange}
            />
            <input
                type="text"
                name="productBrand"
                placeholder="Product Brand"
                value={task.productBrand}
                onChange={handleChange}
            />
            <input
                type="text"
                name="productType"
                placeholder="Product Type"
                value={task.productType}
                onChange={handleChange}
            />
            <input
                type="text"
                name="problemFound"
                placeholder="Problem Found"
                value={task.problemFound}
                onChange={handleChange}
            />
            <input
                type="text"
                name="assignedTo"
                placeholder="Assigned To"
                value={task.assignedTo}
                onChange={handleChange}
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={task.category}
                onChange={handleChange}
            />
            <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={task.tags}
                onChange={handleChange}
            />
            <input
                type="number"
                name="progress"
                placeholder="Progress (%)"
                value={task.progress}
                onChange={handleChange}
            />
            <select
                name="recurring"
                value={task.recurring}
                onChange={handleChange}
            >
                <option value="">Non-Recurring</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
