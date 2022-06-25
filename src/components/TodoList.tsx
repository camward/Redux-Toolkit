import { useSelector } from "react-redux";
import { RootState } from "../store";
import TodoItem from "./TodoItem";
import { TodoProps } from "../types";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <ul>
      {todos.map((todo: TodoProps) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
