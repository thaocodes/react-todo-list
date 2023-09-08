import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  // handles adding new item
  function handleSubmit(e) {
    e.preventDefault()
  
    // pass function to `setTodos` to add new items to `todos` array
    setTodos((currentTodos) => {
      // function returns whatever value we want state to be
      // takes one arg `currentTodos` which is current value of our state 
      return [
        ...currentTodos, // spread operator copies `currentTodos` array & adds new item: 
        { id: crypto.randomUUID(), title: newItem, completed: false }, // new item
      ]
    })
    // clear out input box after each `todo` item gets added
    setNewItem("") 
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

  return (
  // wrap in fragment, returns more than 1 element
  <> 
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        {/* need to link up label to input, use `htmlFor` (instead of `for`) for JSX */}
        <label htmlFor="Item">New Item</label>

        {/* update input when it changes */}
        <input 
          value={newItem} // set the value of input to whatever our newItem variable is 
          onChange={e => setNewItem(e.target.value)}
          type="text" 
          id="item" />
      </div>
      <button className="btn">Add</button>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
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
            <button className="btn btn-danger">Delete</button>
          </li>
        )
      })}
    </ul>
  </>
  )
}