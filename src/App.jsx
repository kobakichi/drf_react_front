import React, { useState, useEffect } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { DrfApi } from "./components/DrfApi";

export const App = () => {
  //todoリストの初期値
  const [todos, setTodos] = useState([]);
  //Todoの新規作成用
  const [editTodo, setEditTodo] = useState("");
  //submitされたかどうかの判定
  const [submit, setSubmit] = useState(false);

  //useEffectを使用して、Djangoのtodosデータを取得する
  useEffect(() => {
    //Django側のurlへリクエスト
    fetch("http://localhost:8000/api/todos/")
      //受け取った値をjson形式に変換
      .then((res) => res.json())
      .then((todo) => {
        //setTodosを更新
        console.log(todo);
        console.log(submit);
        setTodos(todo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [submit]);

  //新規作成の送信処理(POSTリクエスト)
  const postTodo = (title) => {
    return fetch("http://localhost:8000/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
  };

  //編集処理のPUTリクエスト
  const putTodo = (id, title) => {
    return fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
  };

  //削除ボタンを押した時のDELETEリクエスト
  const deleteTodo = (id) => {
    return fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: "DELETE",
    });
  };

  // //フォーム入力を受け取る関数
  const handleInputChange = (event) => {
    event.preventDefault();
    setEditTodo(event.target.value);
  };

  //ボタンをクリックしたらPOSTで送信
  const handleSubmit = (event) => {
    event.preventDefault();
    postTodo(editTodo);
    setEditTodo("");
    //prevStateを使用して、setSubmitの状態を参照して、関数が発火するたびに状態を反転させる。
    setSubmit((prevState) => !prevState);
  };

  //削除ボタンを押した時の処理
  const handleDelete = (event) => {
    const todoId = event.currentTarget.dataset.id;
    console.log(todoId);
    const list = todos.filter((todo) => todo["id"].toString() !== todoId);
    setTodos(list);
    deleteTodo(todoId);
    setSubmit((prevState) => !prevState);
  };

  //Todoリストの編集処理
  const handleOnEdit = (id, value) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="wrapper">
      <h1>DRF x React Todo</h1>
      <CreateTodo
        editTodo={editTodo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        // createNewTodo={createNewTodo}
      />
      <DrfApi
        todos={todos}
        handleDelete={handleDelete}
        handleOnEdit={handleOnEdit}
        putTodo={putTodo}
      />
    </div>
  );
};

export default App;
