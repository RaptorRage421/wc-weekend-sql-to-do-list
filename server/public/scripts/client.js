console.log('JS is sourced!');

function getTodos(){
  console.log( 'in gettodos' );
  // axios call to server to get todos
  axios({
      method: 'GET',
      url: '/todos'
  })
  .then((response) => {
    // console.log('get todos is running...', response.data)
    renderTodos(response.data)
    console.log("GET /todos working" , response.data)
  })
  .catch((err) => {
    console.error('Error in /GET todos', err)
  })
} // end gettodos



getTodos();


function submitTodo(event) {
  event.preventDefault();

  console.log('Submit button clicked.');
  let toDoHolding = {}
  console.log("todo object," ,toDoHolding)
 
  toDoHolding.text = document.getElementById('todo_text').value;
  toDoHolding.isComplete = false
  toDoHolding.isUrgent = document.getElementById('isUrgent').checked;
  console.log("todo object," ,toDoHolding)
    addTodos(toDoHolding)   
}


function addTodos(todoToAdd){
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
  todoLocation.innerHTML = '';

  for (let i = 0; i < todos.length; i += 1) {
    let todo = todos[i];
    console.log('todo is ', todo)
  

    todoLocation.innerHTML += `
      <tr>
      <td>${todo.text}</td>  
      <td>${todo.isComplete}</td>
      <td>${todo.isUrgent}</td>
      </tr>
    `;


  }
}
