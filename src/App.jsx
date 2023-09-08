import { useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);

  // function gets passed down to `NewTodoForm` as prop
  function addTodo(title) {    // pass in title we want to add for new todo
    // pass function to `setTodos` to add new items to `todos` array
    setTodos((currentTodos) => {
      // function returns whatever value we want state to be
      // takes one arg `currentTodos` which is current value of our state 
      return [
        ...currentTodos, // spread operator copies `currentTodos` array & adds new item: 
        { id: crypto.randomUUID(), title, completed: false }, // new item
      ]
    })
  }

  // handles toggling checkbox, function takes in `id` & `completed`
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      // map thru `currentTodos`, check if each `todo` is the one we r trying to toggle
      return currentTodos.map(todo => {
        // if todo.id matches current id 
        if (todo.id === id) {
          // return a brand new `todo` object w/ property completed updated 
          return { ...todo, completed }   // spread operator 
        }
        // if id doesn't match, return `todo` w/ no changes made
        return todo
      })
    })
  } 

  // handles deleting a `todo`
  function deleteTodo(id) {
    setTodos(currentTodos => {
      // filters through `currentTodos`, returns `currentTodos` with deleted todo removed
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {/* if no todos, render message */}
        {todos.length === 0 && "No Todos"}

        {/* for each todo, we want to return one <li> element */}
        {todos.map(todo => { // map returns an array 
          // need to add key prop when returning an array of elements
          // add this to the very top level <li>
          return (
            // unique identifier for each todo element 
            <li key={todo.id}> 
              <label>
                {/* toggle checkbox when clicked*/}
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  // when checkbox is changed, calls `toggleTodo` for a particular id
                  // and passes along whether or not that `todo` is checked
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                  />
                {todo.title}
              </label>
              <button 
                // when Delete button is clicked, calls deleteTodo w/ the todo id
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}