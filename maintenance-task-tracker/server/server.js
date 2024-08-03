// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = []; // In-memory tasks store for simplicity

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.sendStatus(204);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
