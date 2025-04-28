// constants
const taskButton = document.getElementById("taskButton");
const taskInput = document.getElementById("taskText");
const task = document.createElement("div");
const listOfTask = document.getElementById("listOfTasks");

// variables
let taskText = "";
let taskCounter = 0;
let active = true;
let statusOfTask = false;
let allChecked = false;

taskButton.addEventListener("click", addTask);

function addTask() {
  taskText = taskInput.value;
  createTask(taskText);
  taskInput.value = "";
}

function createTask(task) {
  if (task != "") {
    if (statusOfTask === false) {
      const tasks = document.createElement("div");
      tasks.id = "tasks";
      listOfTask.appendChild(tasks);
      statusOfTask = true;
    }
    taskCounter++;
    const item = document.createElement("div");
    item.id = "item" + taskCounter;
    item.className = "items";
    tasks.appendChild(item);
    const toDo = document.createElement("p");
    toDo.className = "task";
    toDo.textContent = task;
    toDo.style.fontSize = "20px";
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
}

function deleteAll() {
  listOfTask.removeChild(tasks);
  statusOfTask = false;
}

function checkAll() {
  const CollectionOfAllTheTask = document.getElementsByClassName("task");
  const allTask = Array.from(CollectionOfAllTheTask);

  if (allChecked == false) {
    allTask.forEach(function (element) {
      element.style.textDecoration = "line-through";
      element.style.color = "red";
      allChecked = true;
      console.log("this is runned");
    });
  } else {
    allTask.forEach(function (element) {
      element.style.textDecoration = "none";
      element.style.color = "green";
      allChecked = false;
    });
  }

  console.log(allTask);
}
