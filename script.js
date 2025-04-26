// constants
const taskButton = document.getElementById("taskButton");
const taskInput = document.getElementById("taskText");
const task = document.createElement("div");

// variables
let taskText = "";

taskButton.addEventListener("click", addTask);

function addTask() {
  taskText = taskInput.value; 
  createTask(taskText);
  taskInput.value = "";
}

function createTask(task) {
  const toDo = document.createElement("p")
  toDo.className = "task"
  toDo.textContent = task;
  document.getElementById("tasks").append(toDo);
  const options = document.createElement("div")
  options.className = "options"
  options.id = "opitons1"
  document.getElementById("tasks").append(options)
  const deleteButton = document.createElement("button")
  deleteButton.id = "deleteButton"
  document.getElementById("opitons1").append(deleteButton);
  const deleteIcon = document.createElement("i");
  deleteIcon.className  = "fa-solid fa-trash"
  document.getElementById("deleteButton").append(deleteIcon);
  const cheakButton = document.createElement("button")
  cheakButton.id = "checkButton"
  document.getElementById("opitons1").append(cheakButton);
  const CheckIcon = document.createElement("i");
  CheckIcon.className = "fa-solid fa-check"
  document.getElementById("checkButton").append(CheckIcon);


}
