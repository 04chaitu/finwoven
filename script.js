// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
  }
});

// Add task to DOM
function addTask(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (isCompleted) {
    li.classList.add('completed');
  }

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });

  // Toggle completed
  li.addEventListener('click', function () {
    li.classList.toggle('completed');
    updateTaskInLocalStorage(taskText);
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load tasks from local storage
function loadTasks() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(task => addTask(task.text, task.completed));
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in local storage
function updateTaskInLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.map(task => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}