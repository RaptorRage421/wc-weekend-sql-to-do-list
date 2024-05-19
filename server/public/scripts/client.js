
function onLoad(){
    console.log('JS is sourced!');

}

onLoad()
function getTodos() {
    console.log('in gettodos');
    // axios call to server to get todos
    axios({
        method: 'GET',
        url: '/todos'
    })
        .then((response) => {
            // console.log('get todos is running...', response.data)
            renderTodos(response.data)
            console.log("GET /todos working", response.data)
        })
        .catch((err) => {
            console.error('Error in /GET todos', err)
        })
} // end gettodos



getTodos();


function submitTodo(event) {
    event.preventDefault();
    let inputField = document.getElementById('todo_text').value
    let urgentInput = document.getElementById('isUrgent').checked
    if (inputField.length === 0) {
        return
    }
    console.log('Submit button clicked.');
    let toDoHolding = {}
    console.log("todo object,", toDoHolding)

    toDoHolding.text = inputField;
    toDoHolding.isComplete = false
    toDoHolding.isUrgent = urgentInput
    console.log("todo object,", toDoHolding)
    addTodos(toDoHolding)
    document.getElementById('todo_text').value = ""
    document.getElementById('isUrgent').checked = false
}


function addTodos(todoToAdd) {
    axios({
        method: 'POST',
        url: '/todos',
        data: todoToAdd
    })
        .then((response) => {
            console.log('addtodo() is working...', response.data)
            getTodos()
        })
        .catch((err) => {
            console.error('Error in POST', err)
            alert('Unable to add todo at this time. Please try again later.');
        })
}

function renderTodos(todos) {
    const todoLocation = document.getElementById('todoListLocation')
    const todoisUrgent = document.getElementById('urgentTodo')
    const completedLocation = document.getElementById('completed_todos')
    console.log('is urgent location', todoisUrgent.innerHTML)
    todoisUrgent.innerHTML = ''
    todoLocation.innerHTML = '';

    for (let i = 0; i < todos.length; i += 1) {
        let todo = todos[i];
        console.log('todo is ', todo)
        console.log("is it urgent? ", todo.isUrgent)
        if (todo.isUrgent === true && todo.isComplete === false) {

            todoisUrgent.innerHTML += `
            <div class="row row-striped is_urgent">
    <div class="col-xs-3 col-md-6">${todo.text} ❗️</div> 
    <div class="col-md-auto"><button class="btn btn-dm btn-primary" onClick="markComplete(${todo.id}, true)">Completed</button>
    <button class="btn btn-sm btn-danger deleteButton" data-testid="deleteButton" onClick="deleteTodo(${todo.id})">Delete</button></</div>
      </div>
    `
        }
        else if (todo.isUrgent === false && todo.isComplete === false) {
            todoLocation.innerHTML += `
            <div class="row row-striped">
      <div class="col-xs-1 col-md-6">${todo.text} </div> 
      <div class="col-md-auto"><button class="btn btn-sm btn-primary" onClick="markComplete(${todo.id}, true)">Completed</button> 
      <button class="btn btn-sm btn-danger deleteButton" onClick="deleteTodo(${todo.id})">Delete</button></div> 
      </div>
    `;

        }
     if (todo.isComplete === true) {
            todoLocation.innerHTML += `
            <div class="row row-striped completed">
      <div class="col-xs-1 col-md-6 completed">${todo.text}</div>  
      <div class="col-md-auto completed"><button disabled class="btn btn-sm btn-primary" onClick="markComplete(${todo.id}, false)">Completed</button> 
      <button class="btn btn-sm btn-danger deleteButton" onClick="deleteTodo(${todo.id})">Delete</button></div> 
      </div>
    `;

        }

    }
}

function markComplete(todoId, isComplete){
    console.log("Changing status of...", todoId, isComplete);
    axios({
     method: "PUT",
     url: "/todos/complete/" + todoId,
     data: {isComplete: isComplete}
    })
    .then((response) => {
     getTodos()
    })
    .catch((error) => {
     console.log('Error', error);
     alert('Something went wrong');
    });
    }


function deleteTodo(todoId) {

    axios({
      method: "DELETE",
      url: `/todos/${todoId}`
    })
      .then((response) => {
        console.log('Deleting todo: ',todoId)
        getTodos();
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });
  }