let points = document.getElementById("points");
let pos_buttons = document.getElementsByClassName("button");
let neg_buttons = document.getElementsByClassName("-button");

for (let i = 0; i < pos_buttons.length; i++) {
  pos_buttons[i].addEventListener("dblclick", (ele) => {
    update(ref(database, "points/" + "-NfxCecS27A_diIPkrRd"), {
      value: parseInt(points.innerHTML) + parseInt(pos_buttons[i].value),
    });
  });
}

for (let i = 0; i < neg_buttons.length; i++) {
  neg_buttons[i].addEventListener("click", (ele) => {
    update(ref(database, "points/" + "-NfxCecS27A_diIPkrRd"), {
      value: parseInt(points.innerHTML) - parseInt(neg_buttons[i].value),
    });
  });
}

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

// push(pointsInDb, 1000);
onValue(pointsInDb, function (snapshot) {
  let pointsarr = Object.values(snapshot.val());
  points.innerHTML = pointsarr[0].value;
});
