let todos = JSON.parse(localStorage.getItem("todos")) || []
let today = new Date().toISOString().split("T")[0]

document.getElementById("submit").addEventListener("click", function () {
  let todo = document.getElementById("item").value.trim()
  let date = document.getElementById("date").value.trim()
  let priority = document.getElementById("dropdown").value

  if (!todo || !date) {
    alert("Enter all details")
    return
  } else if (todo && date < today) {
    alert("You cannot enter a past date")
    return
  }

  console.log(todo, " ", date, " ", priority, " ", today)

  todos.push({ name: todo, date: date, priority: priority, completed: false })

  localStorage.setItem("todos", JSON.stringify(todos))

  todayDisplay()
  fututerDisplay()
  completedDisplay()
})

function todayDisplay() {
  // if(today )
  document.getElementById("today").innerHTML = ""
  let val = 1
  document.getElementById("today").innerHTML += `<h2>Today's TodoList</h2>`
  todos.map((todo, index) => {
    if (todo.date == today && todo.completed == false) {
      document.getElementById("today").innerHTML += `
  <div class="list">
    <p>${val++}.${todo.name}</p>
    <p>${todo.date}</p>
    <p>${todo.priority}</p>
    <div>
      <img onclick="compTodo('${todo.name}')" src="https://surjeet-todo-list.netlify.app/img/check-circle%201.png">
      <img onclick="deleteTodo('${todo.name}')" src="https://surjeet-todo-list.netlify.app/img/trash%201.png">
    </div>
  </div>
  `
    }
  })
}

function fututerDisplay() {
  document.getElementById("future").innerHTML = ""
  document.getElementById("future").innerHTML += `<h2>Future TodoList</h2>`
  let val = 1
  todos.map((todo, index) => {
    if (todo.date > today && todo.completed == false) {
      document.getElementById("future").innerHTML += `
  <div class="list">
    <p>${val++}.${todo.name}</p>
    <p>${todo.date}</p>
    <p>${todo.priority}</p>
    <div>
      <img onclick="compTodo('${todo.name}')" src="https://surjeet-todo-list.netlify.app/img/check-circle%201.png">
      <img onclick="deleteTodo('${todo.name}')" src="https://surjeet-todo-list.netlify.app/img/trash%201.png">
    </div>
  </div>
  `
    }
  })
}

function completedDisplay() {
  document.getElementById("completed").innerHTML = ""
  document.getElementById("completed").innerHTML +=
    `<h2>Completed TodoList</h2>`
  let val = 1
  todos?.map((todo, index) => {
    if (todo.completed) {
      document.getElementById("completed").innerHTML += `
  <div class="list">
    <p>${val++}.${todo.name}</p>
    <p>${todo.date}</p>
    <p>${todo.priority}</p>
      <img onclick="deleteTodo('${todo.name}')" src="https://surjeet-todo-list.netlify.app/img/2.png">
   
  </div>
  `
    }
  })
}

function compTodo(name) {
  let todo = todos.find((item) => item.name === name)
  if (todo) todo.completed = true

  localStorage.setItem("todos", JSON.stringify(todos))

  todayDisplay()
  fututerDisplay()
  completedDisplay()
}

function deleteTodo(name) {
  todos = todos.filter((item) => item.name !== name)

  localStorage.setItem("todos", JSON.stringify(todos))

  todayDisplay()
  fututerDisplay()
  completedDisplay()
}

todayDisplay()
fututerDisplay()
completedDisplay()
