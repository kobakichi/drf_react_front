/**
 * TodoList
 * @package components
 * DjangoApiへリクエストを送信する
 */
import React from "react";

export const TodoList = (props) => {
  const { todos, handleDelete, handleOnEdit, handlePut } = props;

  return (
    <div>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                name="title"
                value={todo.title}
                onChange={(event) => handleOnEdit(todo.id, event.target.value)}
              />
              <button data-id={todo.id} onClick={handlePut}>
                変更確定
              </button>
              <button data-id={todo.id} onClick={handleDelete}>
                削除する
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
