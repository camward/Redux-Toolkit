import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleStatus, deleteTodo } from "../store/todoSlice";
import { AppDispatch } from "../store";
import { TodoProps } from "../types";

const TodoItem = ({ id, title, completed }: TodoProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onCompletedHandler = useCallback(() => {
    dispatch(toggleStatus(id));
  }, [id]);

  const onRemoveHandler = useCallback(() => {
    dispatch(deleteTodo(id));
  }, [id]);

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={onCompletedHandler}
      />
      <span>{title}</span>
      <span onClick={onRemoveHandler}>&times;</span>
    </li>
  );
};

export default TodoItem;
