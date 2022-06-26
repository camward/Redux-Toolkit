export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}

export interface NewTodoProps {
  value: string;
  updateText: Function;
  handleAction: MouseEventHandler<HTMLButtonElement>;
}
