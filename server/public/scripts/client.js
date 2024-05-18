console.log('JS is sourced!');

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
    console.log('is urgent location', todoisUrgent.innerHTML)
    todoisUrgent.innerHTML = ''
    todoLocation.innerHTML = '';

    for (let i = 0; i < todos.length; i += 1) {
        let todo = todos[i];
        console.log('todo is ', todo)
        console.log("is it urgent? ", todo.isUrgent)
        if (todo.isUrgent === true) {

            todoisUrgent.innerHTML += `
    <tr>
      <td class="is_urgent">${todo.text}</td>  
      <td class="is_urgent">${todo.isComplete}${todo.isUrgent}</td>
      <td class="is_urgent"><button onClick="deleteTodo(${todo.id})">Delete</button></td>
      </tr>
    `
        }
        else if (todo.isUrgent === false) {
            todoLocation.innerHTML += `
      <tr>
      <td>${todo.text}</td>  
      <td>${todo.isComplete}${todo.isUrgent}</td>
      <td ><button onClick="deleteTodo(${todo.id})">Delete</button>
      </tr>
    `;

        }
    }
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