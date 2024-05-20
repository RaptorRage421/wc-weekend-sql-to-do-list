
function onLoad(){
    console.log('JS is sourced!');

}

onLoad()
function getTodos() {
    // console.log('in gettodos');
    // axios call to server to get todos
    axios({
        method: 'GET',
        url: '/todos'
    })
        .then((response) => {
            // console.log('get todos is running...', response.data)
            renderTodos(response.data)
            // console.log("GET /todos working", response.data)
        })
        .catch((err) => {
            console.error('Error in /GET todos', err)
        })
} // end gettodos



getTodos();


function submitTodo(event) {
    event.preventDefault();
    let inputField = document.getElementById('todo_text').value
    let urgentInput = document.getElementById('isUrgent').value
    if (inputField.length === 0) {
        return
    }
    // console.log('Submit button clicked.');
    let toDoHolding = {}
    // console.log("todo object,", toDoHolding)

    toDoHolding.text = inputField;
    toDoHolding.isComplete = false
    toDoHolding.isUrgent = urgentInput
    // console.log("todo object,", toDoHolding)
    addTodos(toDoHolding)
    document.getElementById('todo_text').value = ""
    document.getElementById('isUrgent').selectedIndex = 0
}


function addTodos(todoToAdd) {
    axios({
        method: 'POST',
        url: '/todos',
        data: todoToAdd
    })
        .then((response) => {
            console.log("Adding todo: ", todoToAdd.text)
            console.log("is it Urgent: ", todoToAdd.isUrgent)
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
    // console.log('is urgent location', todoisUrgent.innerHTML)
    todoisUrgent.innerHTML = ''
    todoLocation.innerHTML = '';

    for (let i = 0; i < todos.length; i += 1) {
        let todo = todos[i]; 
        if (todo.isUrgent === true && todo.isComplete === false) {

            todoisUrgent.innerHTML += `
            <tr class="is_urgent">
                <td class="wordWrap" scope="col">${todo.text} ❗️</td> 
                <td scope="col"><button class="btn btn-sm btn-primary" onClick="markComplete(event,${todo.id}, true)">Completed</button></td>
                <td scope="col"><button class="btn btn-sm btn-danger deleteButton" data-testid="deleteButton" onClick="deleteTodo(event,${todo.id})">Delete</button></td>
            </tr>
    `
        }
        else if (todo.isUrgent === false && todo.isComplete === false) {
            todoLocation.innerHTML += `
            <tr class="row-striped">
                <td class="wordWrap" scope="col">${todo.text} </td> 
                <td scope="col"><button class="btn btn-sm btn-primary" onClick="markComplete(event, ${todo.id}, true)">Completed</button></td>
                <td scope="col"><button class="btn btn-sm btn-danger deleteButton" onClick="deleteTodo(event,${todo.id})">Delete</button></td> 
            </tr>
    `;

        }
     if (todo.isComplete === true) {
            todoLocation.innerHTML += `
            <tr class="completed">
                <td class="wordWrap completed" scope="col">${todo.text}</td>  
                <td class="completed" scope="col"><button disabled class="btn btn-sm btn-primary" onClick="markComplete(event,${todo.id}, false)">Completed</button></td>
                <td class="completed" scope="col"><button class="btn btn-sm btn-danger deleteButton" onClick="deleteTodo(event,${todo.id})">Delete</button></td> 
            </tr>
    `;

        }

    }
}

function markComplete(event,todoId, isComplete){
    event.preventDefault()
    console.log("Great Job! You completed todo: ", todoId);
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


function deleteTodo(event, todoId) {
event.preventDefault()
    axios({
      method: "DELETE",
      url: `/todos/${todoId}`
    })
      .then((response) => {
        console.log('Deleting todo: ', todoId)
        getTodos();
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });
  }