import CreateForm from "./CreateForm";
import Todo from "./Todo";
import { useState } from "react";
function TodoWrapper() {
  const [todos, setTodos] = useState([
    { content: "洗衣服", completed: false, id: 1 ,editing:false},
    { content: "煮飯", completed: false, id: 2 ,editing:false},
    { content: "打掃", completed: false, id: 3 ,editing:false},
  ]);
  const addTodo = (content) => {
    setTodos([
      ...todos,
      { content: content, completed: false, id: Math.random() },
    ]);
  };

  const deleteTodo = (id) => {
    console.log(id);
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const toggleComplete = (id) => {
    var find = todos.find((todo) => todo.id === id);
    find.completed = !find.completed;
    setTodos([...todos]);
  };

  const toggleEditing = (id) => {
    var find = todos.find((todo) => todo.id === id);
    find.editing = !find.editing;
    setTodos([...todos]);
  };

  const editTodo = (id, content) => {
    var find = todos.find((todo) => todo.id === id);
    find.content = content;
    find.editing = false;
    setTodos([...todos]);
  };

  return (
    <div className="wrapper">
      <h1>Todo List</h1>
      <CreateForm addTodo={addTodo} />
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} toggleEditing={toggleEditing} editTodo={editTodo} />;
      })}
    </div>
  );
}

export default TodoWrapper;
