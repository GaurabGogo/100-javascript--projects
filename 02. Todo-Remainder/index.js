const soundToggle = document.querySelector(".sound");
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

let list = [
  // {
  //   id: "1712665434669",
  //   date: "2024-04-23",
  //   time: "02:03",
  //   title: "asdasd",
  //   checked: false,
  //   remainder: false,
  // },
];

let itemsArray = localStorage.getItem("list")
  ? JSON.parse(localStorage.getItem("list"))
  : [];
list = itemsArray;

window.onload = renderList(list);
window.onload = remainder();

addTask.addEventListener("click", function (e) {
  formBox.classList.add("toggle");
  listItems.classList.add("hide");
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
  listItems.classList.remove("hide");
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
    id: `${Date.now()}`,
    title: `${taskName.value}`,
    date: `${dateBox.value || null}`,
    time: `${timeBox.value || null}`,
    checked: false,
    remainder: checkBox.hasAttribute("checked"),
  });
  formBox.reset();
  formBox.classList.remove("toggle");
  renderList(list);
});

function renderList(taskList) {
  localStorage.setItem("list", JSON.stringify(taskList));
  listItems.classList.remove("hide");
  listItems.innerHTML = "";
  taskList.map((item, i) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");

    const listDetail = document.createElement("div");
    listDetail.classList.add("list-detail");

    const listTitle = document.createElement("p");
    listTitle.classList.add("list-title");
    listTitle.innerHTML = item.title;

    const listRem = document.createElement("span");
    listRem.classList.add("list-rem");
    listRem.innerHTML = `${
      item.date !== "null"
        ? item.remainder === true
          ? "Remainder at: " + item.date + " " + item.time
          : "Reminded"
        : "Remainder not set!"
    }`;

    const listCheckBox = document.createElement("input");
    listCheckBox.setAttribute("type", "checkbox");
    listCheckBox.setAttribute("name", "listCheck");
    listCheckBox.setAttribute("id", item.id);
    listCheckBox.classList.add("list-check-box");

    if (item.checked) {
      listItem.classList.add("item-checked-effect");
      listCheckBox.setAttribute("checked", item.checked);
    } else {
      listItem.classList.remove("item-checked-effect");
      listCheckBox.removeAttribute("checked");
    }

    const delBtn = document.createElement("button");
    delBtn.setAttribute("id", item.id);
    delBtn.setAttribute("name", "delete");
    delBtn.classList.add("del-btn");
    delBtn.textContent = "🗑️";

    // const editBtn = document.createElement("button");
    // editBtn.setAttribute("id", item.id);
    // editBtn.setAttribute("name", "edit");
    // editBtn.classList.add("edit-btn");
    // editBtn.textContent = "📝";

    listDetail.appendChild(listTitle);
    listDetail.appendChild(listRem);

    listItem.appendChild(listCheckBox);
    listItem.appendChild(listDetail);
    // listItem.appendChild(editBtn);
    listItem.appendChild(delBtn);

    listItems.appendChild(listItem);
  });
}

document.querySelector(".list-items").addEventListener("click", function (e) {
  if (e.target.matches("input")) {
    if (e.target.name === "listCheck") {
      list.map((item, index) => {
        if (e.target.id === item.id) {
          if (e.target.hasAttribute("checked")) {
            item.checked = false;
          } else {
            item.checked = true;
          }
        }
        renderList(list);
      });
    }
  }

  if (e.target.matches("button")) {
    if (e.target.name === "delete") {
      list = list.filter((item, index) => e.target.id !== item.id);
      renderList(list);
    }
    // if (e.target.name === "edit") {
    // }
  }
});

soundToggle.addEventListener("click", function () {
  if (soundToggle.value === "on") {
    soundToggle.setAttribute("value", "off");
    soundToggle.innerHTML = "🔇";
  } else {
    soundToggle.setAttribute("value", "on");
    soundToggle.innerHTML = "🔊";

    Notification.requestPermission().then((perm) => {
      if (perm === "granted") return;
    });
  }
});

function remainder() {
  const myInterval = setInterval(function (e) {
    list.map((item, index) => {
      if (!item.checked && item.date !== "null") {
        // let dateNow = new Date().toJSON().slice(0, 10);
        let dateNow = new Date();
        let date = dateNow.getDate();
        if (date < 10) date = "0" + date;
        let month = dateNow.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year = dateNow.getFullYear();
        dateNow = year + "-" + month + "-" + date;
        let timeNow = new Date().toTimeString().slice(0, 5);
        if (dateNow === item.date && timeNow === item.time) {
          if (item.remainder && !item.checked) {
            // console.log("congrats");

            let notification = new Notification("Todo-Remainder", {
              body: `${item.title} at ${item.time}`,
              icon: "https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f47d.svg",
              image:
                "https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f4a2.svg",
              tag: item.id,
              vibrate: [300, 200, 400],
            });

            audio = new Audio(
              "http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg"
            );

            notification.addEventListener("show", (e) => {
              if (soundToggle.value === "on") audio.play();
            });
            notification.addEventListener("close", (e) => {
              if (soundToggle.value === "on") audio.pause();
            });

            item.remainder = false;
            renderList(list);
          }
        }
      }
    });
  }, 10000);
}
