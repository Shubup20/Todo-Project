const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

const addTodoListLocalStorage = (localTodoList) => {
  return localStorage.setItem(
    "youtubeTodoList",
    JSON.stringify(localTodoList)
  );
};

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");

  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li class="list-item">${curElem}</li>  <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();

  inputValue.value = "";

  if (todoListValue != "" && !localTodoList.includes(todoListValue)) {
    localTodoList.push(todoListValue);
    localTodoList = [...new Set(localTodoList)];
    console.log(localTodoList);
    localStorage.setItem(
      "youtubeTodoList",
      JSON.stringify(localTodoList)
    );

    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  localTodoList.forEach((curElem) => {
    addTodoDynamicElement(curElem);
    console.log(localTodoList);
  });
};
showTodoList();

// remove the data

const removeTodoElem = (e) => {
  const todoTORemove = e.target;

  let todoListContent = todoTORemove.previousElementSibling.innerText;

  let parentElem = todoTORemove.parentElement;

  localTodoList = localTodoList.filter((curTodo) => {
  return  curTodo.toLowerCase() !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorage(localTodoList);
  parentElem.remove();
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});