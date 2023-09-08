import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

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
              <input type="checkbox" checked={todo.completed} />
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