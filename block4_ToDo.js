let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let valueInput = "";
let input = null;
let errorMessage = document.getElementById("message");

window.onload = init = () => {
  input = document.getElementById("addTask");
  input.addEventListener("input", updateValue);
  render();
};

const onClickButton = () => {
  const valueTrim = valueInput.trim()
  if(valueTrim){
    allTasks.push({
      text: valueTrim,
      isCheck: false,
    })
  } else {
    errorMessage.innerHTML = "Введите значение!!!"
  } 
  
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = "";
  input.value = "";
  render();
};

const updateValue = (event) => {
  valueInput = event.target.value
  if (valueInput) {
    errorMessage.innerHTML = ""
  }
}

const render = () => {
  const content = document.getElementById("content");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTasks.sort((i, j) => i.isCheck - j.isCheck);
  allTasks.map((item, index) => {
    const conteiner = document.createElement("div");
    conteiner.id = `task-${index}`;
    conteiner.className = "taskCont";
    const checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.checked = item.isCheck;
    checkBox.onchange = () => onChangeCheckBox(index);

    checkBox.id = `checkBox-${index}`;
    checkBox.cheked = item.isCheck;
    conteiner.appendChild(checkBox);
    const text = document.createElement("p");
    text.innerText = item.text;
    text.className = item.isCheck ? "textTask doneText" : "textTask";
    conteiner.appendChild(text);
    content.appendChild(conteiner);

    const imageEdit = document.createElement("img");
    imageEdit.src = "images/edit.png";
    imageEdit.id = `edit-${index}`;

    if (!item.isCheck) {
      imageEdit.onclick = updateTaskText;
      conteiner.appendChild(imageEdit);
    }

    const imageDelete = document.createElement("img");
    imageDelete.src = "images/delete.png";
    imageDelete.onclick = () => onDeleteTask(index);
    conteiner.appendChild(imageDelete);
    content.appendChild(conteiner);
  });
};

const onChangeCheckBox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const onDeleteTask = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const updateTaskText = (event) => {
  if (valueInput) {
    const indexTask = event.target.id.replace("edit-", "");
    allTasks[indexTask].text = valueInput;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    valueInput = "";
    input.value = "";
    render();
  }
};

const doneEditTask = () => {
  activeEditTask = null;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};
