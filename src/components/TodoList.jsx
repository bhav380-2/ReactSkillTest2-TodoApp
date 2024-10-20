import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import TodoItem from './TodoItem'; 
import { fetchTodos } from '../redux/todoSlice'; 

function TodoList() {
  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);

  // Effect to fetch todos when the component mounts or when the status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos()); 
    }
  }, [status, dispatch]);

  // Display a loading message while fetching todos
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Render the list of todos
  return (
    <ul className="todo-list">
      {todos.slice().map((todo) => (
        // Map through the todos array and render a TodoItem for each todo
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
