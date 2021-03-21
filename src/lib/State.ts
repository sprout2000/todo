import { Todo } from './Todo';
import { Filter } from './Filter';

export interface State {
  text: string;
  todos: Todo[];
  filter: Filter;
  qrOpen: boolean;
  alertOpen: boolean;
  drawerOpen: boolean;
  dialogOpen: boolean;
}
