import PropTypes from 'prop-types';

// pass in all props & functions from `TodoList`
// functions used for event handlers
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li> 
    <label>
      {/* toggle checkbox when clicked*/}
      <input 
        type="checkbox" 
        checked={completed} 
        // when checkbox is changed, calls `toggleTodo` for a particular id
        // and passes along whether or not that `todo` is checked
        onChange={e => toggleTodo(id, e.target.checked)}
        />
      {title}
    </label>
    <button 
      // when Delete button is clicked, calls deleteTodo w/ the todo id
      onClick={() => deleteTodo(id)}
      className="btn btn-danger"
    >
      Delete
    </button>
  </li>
  )
}

TodoItem.propTypes = {
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};