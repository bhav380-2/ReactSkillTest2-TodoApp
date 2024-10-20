// src/redux/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = "https://jsonplaceholder.typicode.com/todos";
let id=100;  // used to give id to newly added todos

// Fetch Todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(url + "?userId=1");
  return await response.json();
});

// Add Todo
export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json(); //returns the newly created todo with an ID
});

// Update Todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const response = await fetch(`${url}/${updatedTodo.id}`, {
    method: "PUT",  // Use PUT for full update
    body: JSON.stringify(updatedTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
});

// Delete Todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await fetch(`${url}/${id}`, { method: "DELETE" });
  return id; // Return the id to filter out the deleted todo
});

// Create the slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.todos = action.payload; 
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // Add the new todo to the beginning of the array
        action.payload.id = id;
        id++;
        state.todos.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Filter out the deleted todo
      });
  },
});

// Export the reducer
export default todoSlice.reducer;
