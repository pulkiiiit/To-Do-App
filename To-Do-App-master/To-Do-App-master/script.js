// Selectors
const taskButton = document.getElementById("taskButton");
const taskInput = document.getElementById("taskText");
const listOfTask = document.getElementById("listOfTasks");

let taskCounter = 0;
let taskContainer = null;
let allChecked = false;

// Add task on button click
taskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

// Add task using "Enter" key
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  }
});

// ⭐ MODIFIED: add completed flag for loading
function addTask(taskText, completed = false) {
  if (!taskContainer) {
    taskContainer = document.createElement("div");
    taskContainer.id = "tasks";
    listOfTask.appendChild(taskContainer);
  }

  taskCounter++;

  const item = document.createElement("div");
  item.className = "items";
  item.id = `item${taskCounter}`;
  taskContainer.appendChild(item);

  const toDo = document.createElement("p");
  toDo.className = "task";
  toDo.textContent = taskText;
  toDo.style.fontSize = "20px";

  // ⭐ ADDED: set initial color and strike based on completion
  toDo.style.color = completed ? "red" : "green";
  if (completed) {
    toDo.style.textDecoration = "line-through";
  }

  item.appendChild(toDo);

  const options = document.createElement("div");
  options.className = "options";
  item.appendChild(options);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.addEventListener("click", () => {
    item.remove();
    removeFromLocalStorage(taskText); // ⭐ ADDED
  });
  options.appendChild(deleteButton);

  // Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  let isActive = !completed; // ⭐ ADDED

  checkButton.addEventListener("click", () => {
    if (isActive) {
      toDo.style.textDecoration = "line-through";
      toDo.style.color = "red";
    } else {
      toDo.style.textDecoration = "none";
      toDo.style.color = "green";
    }
    isActive = !isActive;
    toggleComplete(taskText); // ⭐ ADDED
  });

  options.appendChild(checkButton);

  saveToLocalStorage(taskText, completed); // ⭐ ADDED
}

function deleteAll() {
  if (taskContainer) {
    taskContainer.remove();
    taskContainer = null;
    taskCounter = 0;
    localStorage.removeItem("tasks"); // ⭐ ADDED
  }
}

function checkAll() {
  const allTasks = document.querySelectorAll(".task");

  allTasks.forEach(task => {
    if (!allChecked) {
      task.style.textDecoration = "line-through";
      task.style.color = "red";
    } else {
      task.style.textDecoration = "none";
      task.style.color = "green";
    }
  });

  allChecked = !allChecked;
}

// ⭐ ADDED: Save task to localStorage
function saveToLocalStorage(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Avoid duplicate entries
  if (!tasks.some(task => task.text === taskText)) {
    tasks.push({ text: taskText, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// ⭐ ADDED: Remove task from localStorage
function removeFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ⭐ ADDED: Toggle completion status
function toggleComplete(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ⭐ ADDED: Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
});
