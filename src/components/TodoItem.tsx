import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, removeTodo } from "../store/todoSlice";
import { TodoProps } from "../types";

const TodoItem = ({ id, text, completed }: TodoProps) => {
  const dispatch = useDispatch();

  const onCompletedHandler = useCallback(() => {
    dispatch(toggleComplete({ id }));
  }, [id]);

  const onRemoveHandler = useCallback(() => {
    dispatch(removeTodo({ id }));
  }, [id]);

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={onCompletedHandler}
      />
      <span>{text}</span>
      <span onClick={onRemoveHandler}>&times;</span>
    </li>
  );
};

export default TodoItem;
