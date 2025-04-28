// constants
const taskButton = document.getElementById("taskButton");
const taskInput = document.getElementById("taskText");
const tasks = document.getElementById("tasks");
const task = document.createElement("div");

// variables
let taskText = "";
let taskCounter = 0;
let active = true;

taskButton.addEventListener("click", addTask);

function addTask() {
  taskText = taskInput.value;
  createTask(taskText);
  taskInput.value = "";
}

function createTask(task) {
  if (task != "") {
    taskCounter++;
    const item = document.createElement("div");
    item.id = "item" + taskCounter;
    item.className = "items";
    tasks.appendChild(item);
    const toDo = document.createElement("p");
    toDo.className = "task";
    toDo.textContent = task;
    toDo.style.fontSize = "22px";
    toDo.style.color = "green";
    item.appendChild(toDo);
    const options = document.createElement("div");
    options.className = "options";
    options.id = "opitons" + taskCounter;
    item.appendChild(options);
    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton" + taskCounter;
    options.appendChild(deleteButton);
    deleteButton.onclick = function () {
      tasks.removeChild(item);
    };
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";
    deleteButton.appendChild(deleteIcon);
    const cheakButton = document.createElement("button");
    cheakButton.id = "checkButton" + taskCounter;
    options.appendChild(cheakButton);
    const CheckIcon = document.createElement("i");
    CheckIcon.className = "fa-solid fa-check";
    cheakButton.appendChild(CheckIcon);
    cheakButton.onclick = function () {
      if (active === true) {
        toDo.style.textDecoration = "line-through";
        toDo.style.color = "red";
        active = false;
      } else {
        toDo.style.textDecoration = "none";
        toDo.style.color = "green";
        active = true;
      }
    };
  }

  function deleteAll () {
    for (let index = 1; index < taskCounter; index++) {
      
    }
  }
}
