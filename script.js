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


const taskList = sessionStorage.getItem("task_list") ? JSON.parse(sessionStorage.getItem("task_list")) : [];
window.onload = function(){
  listDisplay();
}

const newElement = () => {
  const input = document.getElementById("myInput").value;
  document.getElementById("myInput").value = "";
  if (input == "") {
    alertModal.style.display = 'block';
    document.getElementById("closeModal").onclick = ()=>{
      closeModalWindow(alertModal);
    }
  }
  else {
    taskList.push(input);
    sessionStorage.setItem("task_list", JSON.stringify(taskList));
    
  }
  listDisplay();
}

// modal close
function closeModalWindow(modalID){
  modalID.style.display = "none";
}

// activateDeleteListener
function activateDeleteListener(){
  let delBtn = document.querySelectorAll(".deleteBtn");
  delBtn.forEach((btn,idx)=>{
    btn.addEventListener('click',()=>{listTaskDelete(idx)},false);
  })
}

// activateEditListener
function activateEditListener(){
  let editBtn = document.querySelectorAll(".editBtn");
  editBtn.forEach((btn,idx)=>{
    btn.addEventListener('click',()=>{listTaskEdit(idx)},false);
  })
}

// to display the list
function listDisplay(){
  checklist.innerHTML = null;
  for (let item of taskList){
    const li = document.createElement("li");
    li.innerHTML = `${item}
                    <span class="edit editBtn"><img src="edit_icon.svg"></span>
                    <span class="close deleteBtn"><img src="close_icon.svg"></span>`
    checklist.append(li);
    li.addEventListener('click', function check_uncheck(ev) {
      if (ev.target.tagName == "LI") {
        ev.target.classList.toggle("checked");
      }
    }, false);
  }
  activateDeleteListener();
  activateEditListener();
  
}

// to clear a list element
function listTaskDelete(idx) {
  taskList.splice(idx,1);
  sessionStorage.setItem("task_list",JSON.stringify(taskList));
  listDisplay();
}

// to edit a list element
function listTaskEdit(idx) {
  editModal.style.display = "block";
  saveTextModal.onclick = function(){
    const newTask = editTextModal.value;
    if (newTask==""){
      editTextModal.placeholder = "Field cannot be blank";
    }
    else{
      closeModalWindow(editModal);
      listTaskDelete(idx);
      taskList.splice(idx,0,editTextModal.value);
      sessionStorage.setItem("task_list",JSON.stringify(taskList));
    }
    listDisplay();
  }
  editTextModal.value = null;
  editTextModal.placeholder = "Edit your task name";
  saveTextModal.previousElementSibling.onclick = ()=>{
    closeModalWindow(editModal);
  };

}