// DOM Elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const editModal = document.getElementById("editModal");
const editTaskInput = document.getElementById("editTaskInput");
const toastContainer = document.getElementById("toastContainer");

// State variables
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentEditId = null;

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
renderTasks();
updateTaskCount();

// Add task on Enter key press
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
});

// Add a new task
function addTask() {
const taskText = taskInput.value.trim();
if (taskText === "") return;

const task = {
    id: Date.now(),
    text: taskText,
    completed: false
};

tasks.push(task);
localStorage.setItem("tasks", JSON.stringify(tasks));
taskInput.value = "";
renderTasks();
updateTaskCount();
showToast("Task Added", `"${taskText}" has been added to your list.`, "success");
}

// Render all tasks
function renderTasks() {
taskList.innerHTML = "";

if (tasks.length === 0) {
    taskList.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-clipboard-list"></i>
            <p>No tasks yet. Add a task to get started!</p>
        </div>
    `;
    return;
}

tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleComplete(${task.id})"></div>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <div class="task-actions">
            <button class="task-btn edit-btn" onclick="openEditModal(${task.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    taskList.appendChild(li);
});
}

// Toggle task completion status
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateTaskCount();

    const action = task.completed ? "completed" : "marked as incomplete";
    showToast("Task Updated", `"${task.text}" has been ${action}.`, "warning");
}

// Open the edit modal
function openEditModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    currentEditId = taskId;
    editTaskInput.value = task.text;
    editModal.classList.add("active");
    editTaskInput.focus();
}

// Close the edit modal
function closeEditModal() {
    editModal.classList.remove("active");
    currentEditId = null;
}

// Save the edited task
function saveEditedTask() {
    if (!currentEditId) return;

    const newText = editTaskInput.value.trim();
    if (newText === "") {
        showToast("Error", "Task cannot be empty.", "danger");
        return;
    }

    const task = tasks.find(t => t.id === currentEditId);
    if (!task) return;

    const oldText = task.text;
    task.text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    closeEditModal();
    showToast("Task Updated", `"${oldText}" has been updated to "${newText}".`, "success");
}

// Delete a task
function deleteTask(taskId) {
const task = tasks.find(t => t.id === taskId);
if (!task) return;

if (confirm(`Are you sure you want to delete "${task.text}"?`)) {
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateTaskCount();
    showToast("Task Deleted", `"${task.text}" has been removed from your list.`, "danger");
}
}

// Update the task count display
function updateTaskCount() {
const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.completed).length;

if (totalTasks === 0) {
    taskCount.textContent = "0 tasks";
} else if (completedTasks === totalTasks) {
    taskCount.textContent = "All done!";
} else {
    taskCount.textContent = `${completedTasks}/${totalTasks} completed`;
}
}

// Show toast notification
function showToast(title, message, type) {
const toast = document.createElement("div");
toast.className = `toast ${type}`;
toast.innerHTML = `
    <div class="toast-icon">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
    </div>
    <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
    </button>
`;
toastContainer.appendChild(toast);

setTimeout(() => {
    toast.classList.add("show");
}, 10);

// Auto remove after 2 seconds
setTimeout(() => {
    if (toast.parentElement) {
        toast.classList.remove("show");
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 400);
    }
}, 2000);
}