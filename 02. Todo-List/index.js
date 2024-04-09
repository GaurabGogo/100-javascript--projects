const addTask = document.querySelector(".add-btn");
const listBox = document.querySelector(".list-box");
const formBox = document.querySelector(".form-box");
const cancelForm = document.querySelector(".cancel-btn");
const submitForm = document.querySelector(".submit-btn");

const taskName = document.querySelector(".task-name");
const checkBox = document.querySelector("#remainder");
const remainderBox = document.querySelector(".remainder-box");
const dateBox = document.querySelector("#date");
const timeBox = document.querySelector("#time");

const listItems = document.querySelector(".list-items");

let list = [];

addTask.addEventListener("click", function (e) {
  formBox.classList.add("toggle");
});

checkBox.addEventListener("click", function (e) {
  if (!checkBox.hasAttribute("checked")) {
    checkBox.setAttribute("checked", true);
    remainderBox.classList.add("toggle");
  } else {
    checkBox.removeAttribute("checked");
    remainderBox.classList.remove("toggle");
  }
});

cancelForm.addEventListener("click", function (e) {
  e.preventDefault();
  formBox.reset();
  formBox.classList.remove("toggle");
});

submitForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (!taskName.value && !checkBox.hasAttribute("checked")) {
    alert("Please enter some task!!!");
    return null;
  } else if (checkBox.hasAttribute("checked")) {
    if (dateBox.value === "" && timeBox.value == "") {
      alert("Please Set Time and Date");
      return null;
    }
  }
  list.push({
    id: `${new Date()}`,
    title: `${taskName.value}`,
    date: `${dateBox.value || null}`,
    time: `${timeBox.value || null}`,
  });
  formBox.reset();
  formBox.classList.remove("toggle");
});

window.onload = renderList(list);

function renderList(taskList) {
  taskList.map((item, index) => {
    const listTitle = document.createElement("h1");
    listTitle.innerHTML = item.title;

    listItems.appendChild(listTitle);
  });
}
