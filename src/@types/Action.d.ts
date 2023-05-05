declare type Action =
  | {
      type: 'toggleQR';
    }
  | {
      type: 'toggleDrawer';
    }
  | {
      type: 'toggleDialog';
    }
  | {
      type: 'toggleAlert';
    }
  | {
      type: 'handleChange';
      text: string;
    }
  | {
      type: 'handleSubmit';
    }
  | {
      type: 'handleTodo';
      id: number;
      key: keyof Todo;
      value: Todo[keyof Todo];
    }
  | {
      type: 'handleEmpty';
    }
  | {
      type: 'handleSort';
      filter: Filter;
    }
  | {
      type: 'localforage';
      values: Todo[];
    };
