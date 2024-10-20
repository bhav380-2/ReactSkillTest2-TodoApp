import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/todoSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  // Local state to manage editing mode and the new title for the todo
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id)); 
  };

  // Function to toggle the completion status of the todo item
  const handleToggleComplete = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed, 
    };
    dispatch(updateTodo(updatedTodo)); 
  };

  // Function to handle editing the title of the todo item
  const handleEditTitle = () => {
    const updatedTodo = {
      ...todo,
      title: newTitle, 
    };
    dispatch(updateTodo(updatedTodo));
    setIsEditing(false); 
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-main">
        {/* Checkbox to toggle completion */}
        <input
          type="checkbox"
          checked={todo.completed} 
          onChange={handleToggleComplete} 
        />
        {isEditing ? (
          // If in editing mode, show an input to edit the title
          <input
            type="text"
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            onBlur={handleEditTitle} // Save changes when input loses focus
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleEditTitle(); // Save changes on pressing Enter
              }
            }}
          />
        ) : (
          // If not in editing mode, show the title
          <span onDoubleClick={() => setIsEditing(true)}>{todo.title}</span> 
        )}
      </div>
      <div className="todo-actions">
        {/* Button to delete the todo */}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
