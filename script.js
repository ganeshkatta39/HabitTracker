let points = document.getElementById("points");
let tasksList = document.getElementById("taskList");

// adding task
const addTask = (arr) => {
  arr.forEach((task) => {
    if (task[1].status == false) createLiElement(task);
  });
};

const createLiElement = (value, dest, isRemove) => {
  const task = document.createElement("li");
  task.innerHTML = `<b>+${value[1].reward}</b> &nbsp ${value[1].name}`;
  task.addEventListener("dblclick", () => {
    taskCompleted(value);
  });
  tasksList.append(task);
};

const taskCompleted = (value) => {
  console.log(value);
  update(ref(database, "points/" + "-NfxCecS27A_diIPkrRd"), {
    value: parseInt(points.innerHTML) + parseInt(value[1].reward),
  });
  update(ref(database, `tasks/` + value[0]), {
    status: true,
  });
};

// resetting tasks
let resetButton = document.getElementById("reset");
resetButton.addEventListener("dblclick", () => {
  onValue(tasksInDb, function (snapshot) {
    let tasksArr = Object.entries(snapshot.val());
    for (let i = 0; i < tasksArr.length; i++) {
      update(ref(database, "tasks/" + tasksArr[i][0]), {
        status: false,
      });
    }
  });
});

// db
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://habit-tracker-ad0d2-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const pointsInDb = ref(database, "points");
const tasksInDb = ref(database, "tasks");
const todoTasksInDb = ref(database, "todo-Tasks");

// push(tasksInDb, {
//   name: "Early start (up at 4, brush)",
//   reward: 25,
//   status: false,
// });

// when the tasks or the points change this will happen
onValue(tasksInDb, function (snapshot) {
  let tasksArr = Object.entries(snapshot.val());
  tasksList.innerHTML = "";
  addTask(tasksArr);
});

onValue(pointsInDb, function (snapshot) {
  let pointsarr = Object.values(snapshot.val());
  points.innerHTML = pointsarr[0].value;
});

const addButton = document.getElementById("newTask_button");
const inputField = document.getElementById("input_field");
const todoList = document.getElementById("Todo_taskList");

addButton.addEventListener("click", () => {
  let inputVal = inputField.value;

  if (inputVal == "") {
    alert("task cannot be empty");
  } else {
    push(todoTasksInDb, {
      name: inputVal,
      reward: 25,
      status: false,
    });
    clearInputfield();
  }
});

const createTodoLiElement = (value) => {
  const task = document.createElement("li");
  task.innerHTML = `<b>+${value[1].reward}</b> &nbsp ${value[1].name}`;

  task.addEventListener("dblclick", () => {
    update(ref(database, "points/" + "-NfxCecS27A_diIPkrRd"), {
      value: parseInt(points.innerHTML) + parseInt(value[1].reward),
    });
    let locOfTaskInDb = ref(database, `todo-Tasks/${value[0]}`);
    remove(locOfTaskInDb);
  });

  todoList.append(task);
};

const clearInputfield = () => {
  inputField.value = "";
};

const addTasksFromDB = (data) => {
  data.forEach((task) => {
    createTodoLiElement(task);
  });
};

onValue(todoTasksInDb, function (snapshot) {
  if (snapshot.exists()) {
    let todoArr = Object.entries(snapshot.val());
    todoList.innerHTML = "";
    addTasksFromDB(todoArr);
  } else {
    todoList.innerHTML = "<h3>No tasks in list</h2>";
  }
});
