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

export interface GoodsProps {
  id: number;
  name: string;
}
