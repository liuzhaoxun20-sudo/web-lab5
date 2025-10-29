// In-memory array of tasks
let tasks = [];

// On page load, read existing tasks from localStorage
loadTasksFromStorage();
renderTasks();

// Add a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text === "") {
        return;
    }

    // Push into the in-memory array
    tasks.push(text);

    // Save updated list to localStorage
    saveTasksToStorage();

    // Re-render the list on the page
    renderTasks();

    // Clear the input field
    input.value = "";
}

// Delete a task by its index
function deleteTask(index) {
    // Remove this task from the array
    tasks.splice(index, 1);

    // Save updated list to localStorage
    saveTasksToStorage();

    // Re-render the list on the page
    renderTasks();
}

// Render all tasks inside the <ul>
function renderTasks() {
    const ul = document.getElementById('taskList');
    const emptyHint = document.getElementById('emptyHint');

    // Clear previous list items
    ul.innerHTML = "";

    if (tasks.length === 0) {
        emptyHint.style.display = "block";
    } else {
        emptyHint.style.display = "none";
    }

    // Create <li> for each task
    tasks.forEach((taskText, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const btn = document.createElement('button');
        btn.textContent = "Delete";
        btn.className = "del-btn";
        btn.onclick = function () {
            deleteTask(index);
        };

        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

// Save tasks[] to localStorage
function saveTasksToStorage() {
    // localStorage only stores strings
    // so we serialize the array as JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks[] from localStorage
function loadTasksFromStorage() {
    const raw = localStorage.getItem('tasks');
    if (raw) {
        // Parse the JSON string back into an array
        tasks = JSON.parse(raw);
    } else {
        tasks = [];
    }
}
