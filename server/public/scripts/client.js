console.log('JS is sourced!');
console.log( 'js' );

function getTodos(){
  // console.log( 'in gettodos' );
  // axios call to server to get todos
  axios({
      method: 'GET',
      url: '/todos'
  })
  .then((response) => {
    // console.log('get todos is running...', response.data)
    renderTodo(response.data)
  })
  .catch((err) => {
    console.error('Error in /GET todos', err)
  })
} // end gettodos



getTodos();
function addTodos(todoToAdd){
  axios({
    method: 'POST',
    url: '/todos',
    data: todoToAdd
  })
  .then((response) => {
    // console.log('addtodo() is working...', response.data)
    getTodos()
  })
  .catch((err) => {
    console.error('Error in POST', err)
      alert('Unable to add todo at this time. Please try again later.');
  })
  }

function submitTodo(event) {
  event.preventDefault();
//   let warningText = document.querySelector('#required_field')
  console.log('Submit button clicked.');
  let todo = {};
 
//   todo.name = document.getElementById('nameIn').value;
//   todo.age = document.getElementById('ageIn').value;
//   todo.favorite_color = document.getElementById('colorIn').value;
//   todo.ready_for_transfer = document.getElementById('readyForTransferIn').value;
//   todo.notes = document.getElementById('notesIn').value;
//   // console.log('todo object: ', todo)
//   if (todo.age.length === 0 || todo.name.length === 0 || todo.favorite_color.length === 0 || todo.ready_for_transfer.length === 0 || todo.notes.length === 0){
//     return
//   }
//   document.getElementById('nameIn').value = '';
//   document.getElementById('ageIn').value = '';
//   document.getElementById('colorIn').value = '';
//   document.getElementById('readyForTransferIn').value = '';
//   document.getElementById('notesIn').value = '';
  
    addTodo(todo)
    

}
function addTodo(todoToAdd){
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

function renderTodo(todos) {
  const todoLocation = document.getElementById('todoListLocation')
  todoLocation.innerHTML = '';

  for (let i = 0; i < todos.length; i += 1) {
    let todo = todos[i];
    // console.log('todo is ', todo)
  

    todoLocation.innerHTML += `
      <tr>
      <td>${todo.text}</td>  
      <td>${todo.isComplete}</td>
      </tr>
    `;


  }
}

// function markReady(todoId, isReady){
//   console.log("Changing status of...", todoId, isReady);
//   axios({
//    method: "PUT",
//    url: "/todos/ready/" + todoId,
//    data: {ready_for_transfer: isReady}
//   })
//   .then((response) => {
//    gettodos()
//   })
//   .catch((error) => {
//    console.log('Error', error);
//    alert('Something went wrong');
//   });
//   }

//  function editNotes(todoId, incNotes){
//   if (incNotes.length === 0){
//     return
//   }
// axios({
//   method: "PUT",
//   url: "/todos/notes/" + todoId,
//   data: {notes: incNotes}
// })

// .then((response) => {
//   console.log('Updating todo: ',todoId+ ": "+ incNotes)
//   gettodos()
//   document.getElementById('notesIn').value = ''
//  })
//  .catch((error) => {
//   console.log('Error', error);
//   alert('Something went wrong');
//  });
//  }

 
//  function editColor(todoId, incColor){
//   if (incColor.length === 0){
//     return
//   }
// axios({
//   method: "PUT",
//   url: "/todos/color/" + todoId,
//   data: {favorite_color: incColor}
// })

// .then((response) => {
//   console.log('Updating todo: ',todoId+ ": "+ incColor)
//   gettodos()
//   document.getElementById('colorIn').value = ''
//  })
//  .catch((error) => {
//   console.log('Error', error);
//   alert('Something went wrong');
//  });
//  }

//  function editAge(todoId, incAge){
//   if (incAge.length === 0){
//     return
//   }
// axios({
//   method: "PUT",
//   url: "/todos/age/" + todoId,
//   data: {age: incAge}
// })

// .then((response) => {
//   console.log('incoming age', incAge)
//   gettodos()
//   document.getElementById('ageIn').value = ''
//  })
//  .catch((error) => {
//   console.log('Error', error);
//   alert('Something went wrong');
//  });
//  }

//  function editName(todoId, incName){
//   if (incName.length === 0){
//     return
//   }
// axios({
//   method: "PUT",
//   url: "/todos/name/" + todoId,
//   data: {name: incName}
// })

// .then((response) => {
//   console.log('incoming name', incName)
//   gettodos()
//   document.getElementById('nameIn').value = ''
//  })
//  .catch((error) => {
//   console.log('Error', error);
//   alert('Something went wrong');
//  });
//  }



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