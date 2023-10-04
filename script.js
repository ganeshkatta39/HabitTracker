let points = document.getElementById("points");
let pos_buttons = document.getElementsByClassName("button");
let neg_buttons = document.getElementsByClassName("-button");

for (let i = 0; i < pos_buttons.length; i++) {
  pos_buttons[i].addEventListener("dblclick", (ele) => {
    points.innerHTML =
      parseInt(points.innerHTML) + parseInt(pos_buttons[i].value);
  });
}

for (let i = 0; i < neg_buttons.length; i++) {
  neg_buttons[i].addEventListener("click", (ele) => [
    (points.innerHTML =
      parseInt(points.innerHTML) - parseInt(neg_buttons[i].value)),
  ]);
}
