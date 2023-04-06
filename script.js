// testing close button addition
for (let i of document.getElementById("checkList").children) {
  i.lastElementChild.onclick = remove_func;
  i.children[0].onclick = edit_func;
  i.addEventListener('click', function check_uncheck(ev) {
    if (ev.target.tagName == "LI") {
      ev.target.classList.toggle("checked");
      // console.log(ev.target.firstElementChild);
    }
  }, false);
}

// seconds counter and display
const def_min = 25;
const def_sec = 00;


const timer = {
  "minutes": def_min,
  "seconds": def_sec
}

function formatTime(time){
  if (time<10){
    return `0${time}`
  }
  return time
}


let clock = document.getElementById("clock").firstElementChild
let s_id;

const start = () => {
  document.getElementById("start_btn").toggleAttribute("disabled");
  document.getElementById("pause_btn").toggleAttribute("disabled");
  s_id = setInterval(() => {
    clock.innerHTML = formatTime(timer["minutes"]) + ":" + formatTime(timer["seconds"])
    if (timer["seconds"] == 0) {
      if (timer["minutes"] == 0)
        clearInterval(s_id);
      else {
        timer["minutes"] -= 1;
        timer["seconds"] = 60;
      }
    }
    timer["seconds"]--;
  }, 1000)
}

const pause = () => {
  document.getElementById("start_btn").toggleAttribute("disabled"); document.getElementById("pause_btn").toggleAttribute("disabled");
  clearInterval(s_id);
}

const reset = () => {
  document.getElementById("start_btn").removeAttribute("disabled"); document.getElementById("pause_btn").setAttribute("disabled", "true");
  clearInterval(s_id);
  timer["minutes"] = def_min;
  timer["seconds"] = def_sec;
  clock.innerHTML = timer["minutes"] + ":" + timer["seconds"]
}

let start_btn = document.getElementById("start_btn")
let reset_btn = document.getElementById("reset_btn")
let pause_btn = document.getElementById("pause_btn")
start_btn.onclick = start;
reset_btn.onclick = reset;
pause_btn.onclick = pause;


const newElement = () => {
  let li = document.createElement("li");
  let ip = document.getElementById("myInput").value;
  li.appendChild(document.createTextNode(ip));
  if (ip == "") {
    alert("Please write something to add to the list");
  }
  else {
    document.getElementById("checkList").appendChild(li);

    document.getElementById("myInput").value = "";

    let span_close = document.createElement("span");
    span_close.innerHTML = '<object data="close_icon.svg"></object>';
    span_close.classList.add("close");
    li.append(span_close);
    span_close.onclick = remove_func;

    let span_edit = document.createElement("span");
    span_edit.innerHTML = '<object data="edit_icon.svg"></object>';
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


