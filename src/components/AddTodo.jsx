// src/components/AddTodo.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';

function AddTodo() {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();


  // dispatches addTodo asyncThunk function and adds new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const todoData = {
      title: newTodo,
      userId: 1,
      completed: false,
    };

    dispatch(addTodo(todoData));
    setNewTodo('');
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
