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
// using "enter key to add task"
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  }
});


function addTask(taskText) {
  // Create task container if it doesn't exist
  if (!taskContainer) {
    taskContainer = document.createElement("div");
    taskContainer.id = "tasks";
    listOfTask.appendChild(taskContainer);
  }

  taskCounter++;

  // Create task item
  const item = document.createElement("div");
  item.className = "items";
  item.id = `item${taskCounter}`;
  taskContainer.appendChild(item);

  // Task text
  const toDo = document.createElement("p");
  toDo.className = "task";
  toDo.textContent = taskText;
  toDo.style.fontSize = "20px";
  toDo.style.color = "green";
  item.appendChild(toDo);

  // Options (buttons)
  const options = document.createElement("div");
  options.className = "options";
  item.appendChild(options);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.addEventListener("click", () => item.remove());
  options.appendChild(deleteButton);

  // Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  let isActive = true;

  checkButton.addEventListener("click", () => {
    if (isActive) {
      toDo.style.textDecoration = "line-through";
      toDo.style.color = "red";
    } else {
      toDo.style.textDecoration = "none";
      toDo.style.color = "green";
    }
    isActive = !isActive;
  });

  options.appendChild(checkButton);
}

function deleteAll() {
  if (taskContainer) {
    taskContainer.remove();
    taskContainer = null;
    taskCounter = 0;
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
