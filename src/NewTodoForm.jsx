import { useState } from "react";
import PropTypes from 'prop-types';

// =====  adding new todo item ==== //

// pass `addTodo` function from App.js as prop to add a new todo
export function NewTodoForm({ addTodo }) {     // destructures prop
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault()
    // check to see if `newItem` is an empty string
    if (newItem === "") return

    // call `addTodo` function to add item, pass it `newItem`
    addTodo(newItem)

    // clear out input box after each `todo` item gets added
    setNewItem("") 
    }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        {/* need to link up label to input, use `htmlFor` (instead of `for`) for JSX */}
        <label htmlFor="Item">New Item</label>

        {/* update input when it changes */}
        <input 
          value={newItem} // set the value of input to whatever our newItem variable is 
          onChange={e => setNewItem(e.target.value)}
          type="text" 
          id="item" 
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}

NewTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};