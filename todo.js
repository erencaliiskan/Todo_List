const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Please enter a valid value...");
  } else {
    addTodoToUI(newTodo);
    showAlert("success", "Todo successfully added...");
  }

  e.preventDefault();
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 1500);
}

function addTodoToUI(newTodo) {
  // Creating Todo Item
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  //

  // Creating Link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = '<i class = "fa fa-remove"> </i>';
  //

  // Adding TextNode to Todo Item
  listItem.appendChild(document.createTextNode(newTodo));
  //

  // Adding Link to Todo Item
  listItem.appendChild(link);
  //

  // Adding ListItem to Ul Element
  todoList.appendChild(listItem);
  todoInput.value = "";
  //
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    showAlert("success", "Todo successfully deleted...");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important");
    } else {
      listItem.setAttribute("style", "display: block");
    }
  });
}

function clearAllTodos(e) {
  while (todoList.firstElementChild != null) {
    todoList.removeChild(todoList.firstElementChild);
  }
}
