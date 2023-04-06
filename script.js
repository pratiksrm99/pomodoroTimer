// testing close button addition
for (let listElement of document.getElementById("checkList").children) {
  listElement.lastElementChild.onclick = remove_func;
  listElement.children[0].onclick = edit_func;
  listElement.addEventListener('click', function checkUncheck(event) {
    if (event.target.tagName == "li") {
      event.target.classList.toggle("checked");
    }
  }, false);
}

// seconds counter and display
const defaultMinutes = 25;
const defaultSeconds = 00;


const timer = {
  "minutes": defaultMinutes,
  "seconds": defaultSeconds
}

function formatTime(time) {
  if (time < 10) {
    return `0${time}`
  }
  return time
}


const clock = document.getElementById("clock").firstElementChild
let startTimerId;

const start = () => {
  document.getElementById("start_btn").toggleAttribute("disabled");
  document.getElementById("pause_btn").toggleAttribute("disabled");
  startTimerId = setInterval(() => {
    clock.innerHTML = formatTime(timer["minutes"]) + ":" + formatTime(timer["seconds"])
    if (timer["seconds"] == 0) {
      if (timer["minutes"] == 0)
        clearInterval(startTimerId);
      else {
        timer["minutes"] -= 1;
        timer["seconds"] = 60;
      }
    }
    timer["seconds"]--;
  }, 1000)
}

const pause = () => {
  document.getElementById("start_btn").toggleAttribute("disabled"); 
  document.getElementById("pause_btn").toggleAttribute("disabled");
  clearInterval(startTimerId);
}

const reset = () => {
  document.getElementById("start_btn").removeAttribute("disabled"); 
  document.getElementById("pause_btn").setAttribute("disabled", "true");
  clearInterval(startTimerId);
  timer["minutes"] = defaultMinutes;
  timer["seconds"] = defaultSeconds;
  clock.innerHTML = formatTime(timer["minutes"]) + ":" + formatTime(timer["seconds"]);
}

const start_btn = document.getElementById("start_btn")
const reset_btn = document.getElementById("reset_btn")
const pause_btn = document.getElementById("pause_btn")
start_btn.onclick = start;
reset_btn.onclick = reset;
pause_btn.onclick = pause;


const newElement = () => {
  const li = document.createElement("li");
  const input = document.getElementById("myInput").value;
  li.appendChild(document.createTextNode(input));
  if (input == "") {
    alert("Please write something to add to the list");
  }
  else {
    document.getElementById("checkList").appendChild(li);
    document.getElementById("myInput").value = "";
    const span_close = document.createElement("span");
    span_close.innerHTML = '<img src="close_icon.svg">';
    span_close.classList.add("close");
    li.append(span_close);
    span_close.onclick = remove_func;
    const span_edit = document.createElement("span");
    span_edit.innerHTML = '<img src="edit_icon.svg">';
    span_edit.classList.add("edit");
    li.lastChild.before(span_edit);
    span_edit.onclick = edit_func;

    li.addEventListener('click', function check_uncheck(ev) {
      if (ev.target.tagName == "LI") {
        ev.target.classList.toggle("checked");
        // ev.target.firstElementChild
        // console.log(ev.target.firstElementChild);
      }
    }, false);

  }

}

// to clear a list element
function remove_func() {
  let div = this.parentNode;
  div.remove();
}

// to edit a list element
function edit_func() {
  let div = this.parentNode;
  let ip = prompt("Enter the new task");
  if (ip != null) {
    div.firstChild.textContent = ip;
  }

}


