export interface TodoProps {
  id: string;
  text: string;
  completed: boolean;
}

export interface NewTodoProps {
  value: string;
  updateText: Function;
  handleAction: MouseEventHandler<HTMLButtonElement>;
}
