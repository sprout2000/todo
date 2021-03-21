import { Todo } from './Todo';
import { Filter } from './Filter';

export type Action =
  | {
      type: 'localforage';
      value: Todo[];
    }
  | {
      type: 'dialog';
      value: boolean;
    }
  | {
      type: 'text';
      value: string;
    }
  | {
      type: 'edit';
      id: number;
      val: string;
      value: Todo[];
    }
  | {
      type: 'check';
      id: number;
      checked: boolean;
      value: Todo[];
    }
  | {
      type: 'remove';
      id: number;
      removed: boolean;
      value: Todo[];
    }
  | {
      type: 'drawer';
      value: boolean;
    }
  | {
      type: 'submit';
    }
  | {
      type: 'qr';
      value: boolean;
    }
  | {
      type: 'alert';
      value: boolean;
    }
  | {
      type: 'delete';
    }
  | {
      type: 'sort';
      value: Filter;
    };
