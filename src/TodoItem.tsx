import React from 'react';

import { Card } from 'react-onsenui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCheck,
  faRedo,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

interface Todo {
  id: number;
  title: string;
  checked: boolean;
  removed: boolean;
}

interface Props {
  todo: Todo;
  onEdit: Function;
  onCheck: Function;
  onRemove: Function;
}

interface HTMLElementEvent<T extends HTMLElement> extends React.ChangeEvent {
  target: T;
}

const TodoItem = (props: Props): JSX.Element => {
  const handleOnEdit = (e: HTMLElementEvent<HTMLInputElement>): void => {
    let val: string = e.target.value;
    props.onEdit(props.todo.id, val);
  };

  const handleOnCheck = (): void => {
    let val = !props.todo.checked;
    props.onCheck(props.todo.id, val);
  };

  const handleOnRemove = (): void => {
    let val = !props.todo.removed;
    props.onRemove(props.todo.id, val);
  };

  return (
    <Card>
      <div className="todo-item-container">
        <input
          className="todo-item"
          value={props.todo.title}
          onChange={(e: HTMLElementEvent<HTMLInputElement>): void =>
            handleOnEdit(e)
          }
          disabled={props.todo.checked}
        />
      </div>
      <div className="card-buttons-container">
        <label>
          <span className="checkbox-container" onClick={handleOnCheck}>
            <FontAwesomeIcon
              icon={props.todo.checked ? faCheckCircle : faCheck}
              style={{
                color: props.todo.checked ? '#FF4081' : '#007aff',
              }}
            />
            <span
              style={{
                color: props.todo.checked ? '#FF4081' : '#AAA',
                fontSize: '0.8em',
                paddingTop: '2px',
              }}>
              Done
            </span>
          </span>
        </label>
        <button onClick={handleOnRemove} className="remove-button">
          <FontAwesomeIcon
            icon={props.todo.removed ? faRedo : faTrash}
            style={{ color: '#AAA' }}
          />
        </button>
      </div>
    </Card>
  );
};

export default TodoItem;
