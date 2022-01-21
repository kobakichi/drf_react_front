import React from "react";

export const CreateTodo = (props) => {
  const { editTodo, handleInputChange, handleSubmit } = props;

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          className="addTodo"
          type="text"
          name="title"
          placeholder="title"
          value={editTodo}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
