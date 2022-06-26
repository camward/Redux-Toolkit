import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import { AppDispatch, RootState } from "./store";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import Goods from "./components/Goods";
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
      <h3>Redux Toolkit</h3>
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {status === "loading" && <p>Загрузка...</p>}
      <TodoList />
      <h3>RTK Query</h3>
      <Goods />
    </div>
  );
}

export default App;
