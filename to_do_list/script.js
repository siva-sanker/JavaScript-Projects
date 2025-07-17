const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim(); // ✅ fixed

    if (taskText === "") return;

    const task = {
        id: Date.now(),
        text: taskText
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // ✅ fixed

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button onClick="editTask(${task.id})">Edit</button>
            <button onClick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id == taskId);

    if (!task) return;

    const newText = prompt("Edit Task:", task.text);
    if (newText === null || newText.trim() === "") return;

    task.text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    loadTasks();
}
