const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group"); // the name of ul element
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    clearButton.addEventListener("click", clearAllTodos);
}

function addTodo(e){

    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger", "PLease add a Todo....");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo added successfully....")
    }


    e.preventDefault();
}

function addTodoToUI(newTodo){

    /* <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>

</li> */

   const listItem = document.createElement("li");
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";

   listItem.className = "list-group-item d-flex justify-content-between";

   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);

   todoList.appendChild(listItem);
   todoInput.value = "";

 
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(() => {
        alert.remove()
    }, 1000);
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage( e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo successfully deleted.....")
    }

}

function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAllTodos(e){
    if(confirm("Are you sure ???")){
        // todoList.innerHTML = ""
        while(todoList.firstElementChild != null){

            todoList.removeChild(todoList.firstElementChild);

        }
        localStorage.removeItem("todos");
        
    }
}
