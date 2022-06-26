import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoProps } from "../types";
import { RootState } from "./index";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const setError = (hasError: boolean, errorValue: string) => {
  if (hasError) {
    throw new Error(errorValue);
  }
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}/todos?_limit=10`);
      setError(!response.ok, "Server Error");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id: string, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      setError(!response.ok, "Can't delete task. Server error");
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id: string, { rejectWithValue, dispatch, getState }) {
    const { todos } = getState() as RootState;
    const todo = todos.todos.find((todo: TodoProps) => todo.id === id);
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo?.completed,
        }),
      });

      setError(!response.ok, "Can't toggle status. Server error");
      dispatch(toggleComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function (text: string, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      setError(!response.ok, "Can't add task. Server error");
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as TodoProps[],
    status: null as null | string,
    error: null as null | unknown,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    toggleComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(toggleStatus.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
