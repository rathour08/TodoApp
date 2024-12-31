console.log("welcome to our todo app");

let todos = [];

let todoDataList = document.getElementById("todo-data-list")

let saveButton = document.getElementById("save-todo");

let todoInputBar = document.getElementById("todo-input-bar");

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
    let todoText = todoInputBar.value;
    if(todoText.length == 0){
        if(saveButton.classList.contains("disabled") ) return;
        saveButton.classList.add("disabled");

    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");

    }
    
});

saveButton.addEventListener("click", function getTextAndAddTodo(){

    let todoText = todoInputBar.value;

    if(todoText.length == 0) return;
    todos.push(todoText);

    addTodo(todoText, todos.length);
    todoInputBar.value = "";

});

function removeTodo(event){
    // console.log("Removing", event);
    // event.target.parentElement.parentElement.parentElement.remove();
    todoDataList.innerHTML = '';
    let buttonPressed = event.target
    let number = Number(buttonPressed.getAttribute("todo-index"));
    todos.splice(number, 1);
    todos.forEach((element, index)=>{
        addTodo(element, index+1);

    })

}

function addTodo(todoData, todoCount){
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoAction = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let hr = document.createElement("hr");

    // adding classes
    rowDiv.classList.add("row")


    todoItem.classList.add("todo-item" ,"d-flex", "flex-row", "justify-content-between", "align-items-center")

    todoNumber.classList.add("todo-no")

    todoDetail.classList.add("todo-detail", "text-muted")

    todoStatus.classList.add("todo-status", "text-muted")

    todoAction.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2")

    deleteButton.classList.add("btn", "btn-danger", "delete-todo")

    finishedButton.classList.add("btn", "btn-success", "finished-todo")

    deleteButton.setAttribute("todo-index", todoCount-1);


    deleteButton.onclick = removeTodo;


    todoNumber.textContent = `${todoCount}.`
    todoDetail.textContent = todoData; // sets the todo text sent form the input element
    todoStatus.textContent = "In Progress"
    deleteButton.textContent = "Delete"
    finishedButton.textContent = "Finished"

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishedButton);
    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);
    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);



}