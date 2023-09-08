import { TodoItem } from "./TodoItem"
import PropTypes from 'prop-types';

// get all `todo` items & functions as props from `App.js`
// props then passed DOWN to `TodoItem` where toggleTodo, deleteTodo used for event handlers 
export function TodoList({ todos, toggleTodo, deleteTodo }) {

  return (
    <ul className="list">
      {/* if no todos, render message */}
      {todos.length === 0 && "No Todos"}

      {todos.map(todo => { // map returns an array 

        // return `TodoItem` which gets passed all props of `todo`
        return (
           // spread operator to pass all props of `todo` = completed, title, id 
          <TodoItem {...todo} key={todo.id} 
            toggleTodo={toggleTodo}  // pass down functions
            deleteTodo={deleteTodo}
          />
        )
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};