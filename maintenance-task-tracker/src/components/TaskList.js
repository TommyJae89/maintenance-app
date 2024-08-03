// src/components/TaskList.js
import React from 'react';
import { deleteTask } from '../utils/api';

const TaskList = ({ tasks, refreshTasks, toggleComplete }) => {
    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            await deleteTask(taskId);
            refreshTasks();
        }
    };

    return (
        <ul className="task-list">
            {tasks.map((task) => {
                const progressPercentage = Math.min(Math.max(task.progress, 0), 100);
                const isOverdue = new Date(task.receiveDate) < new Date() && task.status !== 'completed';
                return (
                    <li key={task.id} className={`task-item ${task.status}`}>
                        <input
                            type="checkbox"
                            checked={task.status === 'completed'}
                            onChange={() => toggleComplete(task.id)}
                        />
                        <div className="task-details">
                            <h3>{task.description}</h3>
                            <p><strong>Customer Name:</strong> {task.customerName}</p>
                            <p><strong>Customer Email:</strong> {task.customerEmail}</p>
                            <p><strong>Customer Phone:</strong> {task.customerPhone}</p>
                            <p><strong>Receive Date:</strong> {task.receiveDate}</p>
                            <p><strong>Priority:</strong> {task.priority}</p>
                            <p><strong>Product Color:</strong> {task.productColor}</p>
                            <p><strong>Product Brand:</strong> {task.productBrand}</p>
                            <p><strong>Product Type:</strong> {task.productType}</p>
                            <p><strong>Problem Found:</strong> {task.problemFound}</p>
                            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
                            <p><strong>Category:</strong> {task.category}</p>
                            <p><strong>Tags:</strong> {task.tags.split(',').map(tag => tag.trim()).join(', ')}</p>
                            <p><strong>Progress:</strong> {progressPercentage}%</p>
                            <p><strong>Recurring:</strong> {task.recurring}</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            {isOverdue && <p className="overdue-notification">Overdue!</p>}
                        </div>
                        <button onClick={() => handleDelete(task.id)} className="delete-btn">Delete</button>
                    </li>
                );
            })}
        </ul>
    );
};

export default TaskList;
