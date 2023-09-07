import "./styles.css"

export default function App() {
  return (
  // wrap in fragment, returns more than 1 element
  <> 
    <form className="new-item-form">
      <div className="form-row">
        {/* need to link up label on our input, use htmlFor (instead if for) bc JSX */}
        <label htmlFor="Item">New Item</label>
        <input type="text" id="item" />
      </div>
      <button className="btn">Add</button>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
      <i>
        <label>
          <input type="checkbox" />
          Item 1
        </label>
        <button className="btn btn-danger">Delete</button>
      </i>
      <i>
        <label>
          <input type="checkbox" />
          Item 2
        </label>
        <button className="btn btn-danger">Delete</button>
      </i>
    </ul>
  </>
  )
}