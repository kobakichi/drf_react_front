import React from "react";

export const CreateTodo = (props) => {
  const { addInputTodo, handleInputChange, handleSubmit } = props;

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          className="addTodo"
          type="text"
          name="title"
          placeholder="title"
          value={addInputTodo}
          onChange={handleInputChange}
          required
        />
        <button type="submit">新規作成</button>
      </form>
    </div>
  );
};
