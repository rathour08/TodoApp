console.log("welcome to our todo app");

let todos = [];

let todoDataList = document.getElementById("todo-data-list")

let saveButton = document.getElementById("save-todo");

let todoInputBar = document.getElementById("todo-input-bar");

let getPendingTodos = document.getElementById("get-todos");

getPendingTodos.addEventListener("click", ()=>{
    todos = todos.filter((todo)=> todo.status !== "Finished");
    reRenderTodos();
})

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
    

    let todo = {text: todoText, status: "In Progress", finishButtontext: "Finished"};
    todos.push(todo);

    addTodo(todo, todos.length);
    todoInputBar.value = "";

});

function reRenderTodos(){
    todoDataList.innerHTML = '';
    todos.forEach((element, index)=>{
        addTodo(element, index+1);

    })

}

function removeTodo(event){
    // console.log("Removing", event);
    // event.target.parentElement.parentElement.parentElement.remove();
    
    let buttonPressed = event.target
    let number = Number(buttonPressed.getAttribute("todo-index"));
    todos.splice(number, 1);
    reRenderTodos();


}


function finishTodo(event){
    let finishedButtonPressed = event.target;
    let indexToBeFinished = Number(finishedButtonPressed.getAttribute("todo-index"));

    // toggel functionality
    if(todos[indexToBeFinished].status === "Finished"){
        todos[indexToBeFinished].status = "In Progress";
        todos[indexToBeFinished].finishButtontext = "Finished";
    } else{
        todos[indexToBeFinished].status = "Finished";
        todos[indexToBeFinished].finishButtontext = "Undo";
    }

    todos.sort((a,b)=>{
        if(a.status === "Finished"){
            return 1;
        }
        return -1;
    })

    reRenderTodos();

}

function editTodo(event){
    let editButtonPressed = event.target;
    let indexToEdit = Number(editButtonPressed.getAttribute("todo-index"));
    let detailDiv  = document.querySelector(`div[todo-index="${indexToEdit}"]`);
    let input = document.querySelector(`input[todo-index="${indexToEdit}"]`);
    detailDiv.style.display= "none"
    input.type = "text";
    input.value = detailDiv.textContent;


}

function saveEditedTodo(event){
    // console.log(event.keyCode)
    let input = event.target;
    let indexToEdit = Number(input.getAttribute("todo-index"));
    let detailDiv  = document.querySelector(`div[todo-index="${indexToEdit}"]`);

    
    if(event.keyCode === 13){
        detailDiv.textContent = input.value;
        detailDiv.style.display="block";
        input.type = "";
        input.type= "hidden"

    }

}
function addTodo(todo, todoCount){
    let rowDiv = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoAction = document.createElement("div");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    let finishedButton = document.createElement("button");

    let hiddenInput = document.createElement("input");
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

    editButton.classList.add("btn", "btn-warning","edit-todo")

    hiddenInput.classList.add("form-control", "todo-detail")

    finishedButton.setAttribute("todo-index", todoCount-1);

    deleteButton.setAttribute("todo-index", todoCount-1);

    editButton.setAttribute("todo-index", todoCount-1);
    todoDetail.setAttribute("todo-index", todoCount-1);
    hiddenInput.setAttribute("todo-index", todoCount-1); 

    hiddenInput.addEventListener("keypress", saveEditedTodo)


    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;
    editButton.onclick = editTodo;
    
    hiddenInput.type = "hidden";


    todoNumber.textContent = `${todoCount}.`
    todoDetail.textContent = todo.text; // sets the todo text sent form the input element
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete"
    finishedButton.textContent = todo.finishButtontext;
    editButton.textContent = "Edit";

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishedButton);
    todoAction.appendChild(editButton);
    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput)
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);
    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);



}