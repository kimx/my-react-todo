import { MdDelete, MdEdit } from "react-icons/md";
import EditForm from "./EditForm";  
function Todo({ todo, deleteTodo, toggleComplete, toggleEditing ,editTodo}) {
  return (
    todo.editing ? <EditForm todo={todo} editTodo={editTodo} /> : 
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      <p onClick={() => toggleComplete(todo.id)}>
        {todo.content} 
      </p>
      <div >
        <MdEdit style={{ cursor: "pointer" }} onClick={() => toggleEditing(todo.id)} /> 
        <MdDelete style={{ cursor: "pointer",marginLeft: "10px" }} onClick={() => deleteTodo(todo.id)} />
      </div>
    </div>
    
  );
}

export default Todo;
