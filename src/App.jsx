import { useState, useEffect } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  // get item from local storage by calling useState & passing it a function
  const [todos, setTodos] = useState(() => {
    // useState checks localStorage & gets value if it exists
    const localValue = localStorage.getItem("ITEMS")
    // if it doesn't exist, default to empty array 
    if (localValue == null) return []

    // parse whats in localStorage & return that as default value
    return JSON.parse(localValue) 
  });

  // any time `todos` is modified, useEffect calls this function
  // which goes to `localStorage` & sets `ITEMS` property to be JSON stringified version of `todos`
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))   // takes our todo and stores it in localStorage
  }, [todos])


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
      {/* pass todos & functions as props to `TodoList` */}
      <TodoList 
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        /> 
    </>
  )
}