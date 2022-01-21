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
          todos.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
      </ul>
    </div>
  );
};
