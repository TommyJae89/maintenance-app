// Function to check if the date is in the past
function isPastDate(date) {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate < today;
}

// Function to validate email
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate phone number
function isValidPhone(phone) {
    const phonePattern = /^\+?[0-9]{7,15}$/;
    return phonePattern.test(phone);
}

// Add a task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const customerNameInput = document.getElementById('customerNameInput').value.trim();
    const customerEmailInput = document.getElementById('customerEmailInput').value.trim();
    const customerPhoneInput = document.getElementById('customerPhoneInput').value.trim();
    const receiveDateInput = document.getElementById('receiveDateInput').value;
    const priorityInput = document.getElementById('priorityInput').value;
    const productColorInput = document.getElementById('productColorInput').value.trim();
    const productBrandInput = document.getElementById('productBrandInput').value.trim();
    const productTypeInput = document.getElementById('productTypeInput').value.trim();
    const problemFoundInput = document.getElementById('problemFoundInput').value.trim();

    // Input validation
    if (taskInput === '') {
        alert('Please enter a task description.');
        return;
    }

    if (customerNameInput === '') {
        alert('Please enter the customer name.');
        return;
    }

    if (receiveDateInput === '') {
        alert('Please select a receive date.');
        return;
    }

    if (priorityInput === '') {
        alert('Please select a priority level.');
        return;
    }

    if (!isValidEmail(customerEmailInput)) {
        alert('Please enter a valid email address.');
        document.getElementById('customerEmailInput').classList.add('input-error');
        return;
    } else {
        document.getElementById('customerEmailInput').classList.remove('input-error');
    }

    if (!isValidPhone(customerPhoneInput)) {
        alert('Please enter a valid phone number.');
        document.getElementById('customerPhoneInput').classList.add('input-error');
        return;
    } else {
        document.getElementById('customerPhoneInput').classList.remove('input-error');
    }

    if (isPastDate(receiveDateInput)) {
        alert('The selected receive date is in the past. Please choose a valid date.');
        document.getElementById('receiveDateInput').classList.add('input-error');
        return;
    } else {
        document.getElementById('receiveDateInput').classList.remove('input-error');
    }

    // Create a new task item
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <div>
            <strong>Task:</strong> ${taskInput}<br>
            <strong>Customer Name:</strong> ${customerNameInput}<br>
            <strong>Email:</strong> ${customerEmailInput}<br>
            <strong>Phone:</strong> ${customerPhoneInput}<br>
            <strong>Receive Date:</strong> ${receiveDateInput}<br>
            <strong>Priority:</strong> ${priorityInput}<br>
            <strong>Product Color:</strong> ${productColorInput}<br>
            <strong>Product Brand:</strong> ${productBrandInput}<br>
            <strong>Product Type:</strong> ${productTypeInput}<br>
            <strong>Problem Found:</strong> ${problemFoundInput}
        </div>
        <div class="actions">
            <button onclick="markCompleted(this)">Mark as Completed</button>
            <button onclick="deleteTask(this)">Delete Task</button>
        </div>
    `;

    const taskList = document.getElementById('taskList');
    taskList.appendChild(taskItem);

    // Clear inputs
    document.getElementById('taskInput').value = '';
    document.getElementById('customerNameInput').value = '';
    document.getElementById('customerEmailInput').value = '';
    document.getElementById('customerPhoneInput').value = '';
    document.getElementById('receiveDateInput').value = '';
    document.getElementById('priorityInput').value = '';
    document.getElementById('productColorInput').value = '';
    document.getElementById('productBrandInput').value = '';
    document.getElementById('productTypeInput').value = '';
    document.getElementById('problemFoundInput').value = '';
}

// Mark a task as completed
function markCompleted(button) {
    if (confirm('Are you sure you want to mark this task as completed?')) {
        const taskItem = button.parentElement.parentElement;
        taskItem.classList.toggle('completed');
    }
}

// Delete a task from the list
function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskItem = button.parentElement.parentElement;
        taskItem.remove();
    }
}

// Filter tasks based on search input and dropdowns
function filterTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        const isCompleted = task.classList.contains('completed');
        const isOverdue = task.classList.contains('overdue');

        let matchesSearch = taskText.includes(searchInput);
        let matchesStatus = (statusFilter === 'completed' && isCompleted) ||
                            (statusFilter === 'pending' && !isCompleted) ||
                            statusFilter === '';
        let matchesPriority = priorityFilter === '' || taskText.includes(priorityFilter.toLowerCase());

        if (matchesSearch && matchesStatus && matchesPriority) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
