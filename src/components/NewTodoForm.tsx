import { NewTodoProps } from "../types";

const NewTodoForm = ({ value, updateText, handleAction }: NewTodoProps) => {
  return (
    <div className="form">
      <input
        value={value}
        className="input"
        onChange={(e) => updateText(e.target.value)}
      />
      <button className="button" onClick={handleAction}>
        Добавить
      </button>
    </div>
  );
};

export default NewTodoForm;
