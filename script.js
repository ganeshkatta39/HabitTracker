let points = document.getElementById("points");

// adding tasks
let tasksList = document.getElementById("taskList");
function addTask(taskArr) {
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i][1].status == false) {
      let taskLi = document.createElement("li");
      taskLi.innerHTML = `<b>+${taskArr[i][1].reward}</b> &nbsp ${taskArr[i][1].name}`;
      taskLi.addEventListener("dblclick", (ele) => {
        update(ref(database, "points/" + "-NfxCecS27A_diIPkrRd"), {
          value: parseInt(points.innerHTML) + parseInt(taskArr[i][1].reward),
        });
        update(ref(database, "tasks/" + taskArr[i][0]), {
          status: true,
        });
      });
      tasksList.append(taskLi);
    }
  }
}

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

// push(tasksInDb, {
//   name: "Early start (up at 4, brush)",
//   reward: 25,
//   status: false,
// });
// push(tasksInDb, {
//   name: "Take care of body (exercise, jog,bath)",
//   reward: 50,
//   status: false,
// });

// push(tasksInDb, {
//   name: "Take care of mind (meditate,self-affirmation, read)",
//   reward: 15,
//   status: false,
// });

// push(tasksInDb, {
//   name: "Coding",
//   reward: 50,
//   status: false,
// });

// push(tasksInDb, {
//   name: "Projects, papers, patents, research",
//   reward: 30,
//   status: false,
// });

// push(tasksInDb, {
//   name: "Selfimprovement (write,learn,language, talk, act,etc)",
//   reward: 20,
//   status: false,
// });

// push(tasksInDb, {
//   name: "End of day (days highlight,gratitude,journal)",
//   reward: 10,
//   status: false,
// });

// push(tasksInDb, {
//   name: "Youtube video",
//   reward: 50,
//   status: false,
// });

// push(pointsInDb, 1000);

onValue(tasksInDb, function (snapshot) {
  let tasksArr = Object.entries(snapshot.val());
  tasksList.innerHTML = "";
  addTask(tasksArr);
  console.log("change");
});

onValue(pointsInDb, function (snapshot) {
  let pointsarr = Object.values(snapshot.val());
  points.innerHTML = pointsarr[0].value;
});
