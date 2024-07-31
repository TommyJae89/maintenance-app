// JavaScript for Maintenance Task Tracker

// Function to add a task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const customerNameInput = document.getElementById('customerNameInput').value;
    const customerEmailInput = document.getElementById('customerEmailInput').value;
    const customerPhoneInput = document.getElementById('customerPhoneInput').value;
    const dueDateInput = document.getElementById('dueDateInput').value;
    const priorityInput = document.getElementById('priorityInput').value;
    const productColorInput = document.getElementById('productColorInput').value;
    const productBrandInput = document.getElementById('productBrandInput').value;
    const productTypeInput = document.getElementById('productTypeInput').value;
    const problemFoundInput = document.getElementById('problemFoundInput').value;

    if (!taskInput || !customerNameInput || !customerEmailInput || !customerPhoneInput || !dueDateInput || !priorityInput) {
        alert('Please fill out all fields.');
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
        <div>
            <strong>${taskInput}</strong>
            <p>Customer: ${customerNameInput}, Email: ${customerEmailInput}, Phone: ${customerPhoneInput}</p>
            <p>Due Date: ${dueDateInput}</p>
            <p>Priority: ${priorityInput}</p>
            <p>Product Color: ${productColorInput}, Brand: ${productBrandInput}, Type: ${productTypeInput}</p>
            <p>Problem Found: ${problemFoundInput}</p>
        </div>
        <div class="actions">
            <button onclick="markCompleted(this)">Mark as Completed</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    // Check for overdue tasks
    const today = new Date();
    const dueDate = new Date(dueDateInput);
    if (dueDate < today) {
        li.classList.add('overdue');
    }

    taskList.appendChild(li);

    // Clear input fields after adding the task
    document.getElementById('taskInput').value = '';
    document.getElementById('customerNameInput').value = '';
    document.getElementById('customerEmailInput').value = '';
    document.getElementById('customerPhoneInput').value = '';
    document.getElementById('dueDateInput').value = '';
    document.getElementById('priorityInput').value = '';
    document.getElementById('productColorInput').value = '';
    document.getElementById('productBrandInput').value = '';
    document.getElementById('productTypeInput').value = '';
    document.getElementById('problemFoundInput').value = '';
}

// Function to mark a task as completed
function markCompleted(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    if (li.classList.contains('completed')) {
        button.textContent = 'Mark as Pending';
    } else {
        button.textContent = 'Mark as Completed';
    }
}

// Function to delete a task
function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}

// Function to filter tasks based on search and filters
function filterTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    const tasks = document.querySelectorAll('.task-list li');

    tasks.forEach(task => {
        const text = task.textContent.toLowerCase();
        const isCompleted = task.classList.contains('completed');
        const priority = task.querySelector('p:nth-child(3)').textContent.split(': ')[1].toLowerCase();

        const matchesSearch = text.includes(searchInput);
        const matchesStatus = (statusFilter === '' || (statusFilter === 'completed' && isCompleted) || (statusFilter === 'pending' && !isCompleted));
        const matchesPriority = (priorityFilter === '' || priorityFilter === priority);

        if (matchesSearch && matchesStatus && matchesPriority) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check and apply the user's preferred theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Event listener for the dark mode toggle button
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Store the user's preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }
});
