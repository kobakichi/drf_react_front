/**
 * DrfApi
 * @package components
 * DjangoApiへリクエストを送信する
 */
import React from "react";

export const DrfApi = (props) => {
  const { todos } = props;

  return (
    <div>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <input type="text" value={todo.title} />
              <button>削除</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
