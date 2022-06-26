import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import { AppDispatch, RootState } from "./store";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const { status } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="app">
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {status === "loading" && <p>Загрузка...</p>}
      <TodoList />
    </div>
  );
}

export default App;
