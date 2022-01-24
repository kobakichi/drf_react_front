/**
 * DrfApi
 * @package components
 * DjangoApiへリクエストを送信する
 */
import React from "react";

export const DrfApi = (props) => {
  const { todos, handleDelete, handleOnEdit } = props;

  return (
    <div>
      <ul>
        {todos &&
          todos.map((todo, index) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.title}
                onChange={(event) => handleOnEdit(index, event.target.value)}
              />
              <button data-id={todo.id} onClick={handleDelete}>
                削除
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
