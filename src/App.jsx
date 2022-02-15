/**
 * App
 * @returns
 */

import React, { useState, useEffect } from "react";
import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";

export const App = () => {
  //todoリストの初期値
  const [todos, setTodos] = useState([]);
  //Todoの新規作成用
  const [addInputTodo, setaddInputTodo] = useState("");
  //submitされたかどうかの判定
  const [submit, setSubmit] = useState(false);

  //useEffectを使用して、Djangoのtodosデータを取得する
  useEffect(() => {
    //Django側のurlへリクエスト
    const fetchGet = async () => {
      const response = await fetch("http://localhost:8000/api/todos/");
      //受け取った値をjson形式に変換
      const todoJson = await response.json();
      //setTodosを更新
      setTodos(todoJson);
    };
    fetchGet().catch((error) => {
      console.error(error);
    });
    //submitの状態が変わったらまたGETリクエストを飛ばす
  }, [submit]);

  /**
   * 新規作成の送信処理(POSTリクエスト)
   * @param {*} title - addInputTodoの入力値
   */
  const postTodo = async (title) => {
    await fetch("http://localhost:8000/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
    //prevStateを使用して、setSubmitの状態を参照して、関数が発火するたびに状態を反転させる。
    setSubmit((prevState) => !prevState);
  };

  /**
   * 編集処理後のPUTリクエスト
   * @param {int} id - todosのid
   * @param {*} title - todosを編集した値
   */
  const putTodo = async (id, title) => {
    await fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
    setSubmit((prevState) => !prevState);
  };

  /**
   * 削除ボタンを押してからの削除処理　データベースへdelete処理
   * @param {int} id - todosのid
   */
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: "DELETE",
    });
    setSubmit((prevState) => !prevState);
  };

  /**
   * AddTodoよりフォーム入力を受け取る関数
   * @param {*} event - eventを受け取る
   */
  const handleInputChange = (event) => {
    event.preventDefault();
    setaddInputTodo(event.target.value);
  };

  /**
   * TodoListの新規作成ボタンをクリックしたらPOSTで送信
   * @param {*} event - eventを受け取る
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    postTodo(addInputTodo);
    setaddInputTodo("");
  };

  /**
   * 削除ボタンを押した時の処理
   * @param {*} event - eventを受け取る
   */
  const handleDelete = (event) => {
    if (window.confirm("「todoを削除しますか?」")) {
      const todoId = event.currentTarget.dataset.id;
      const list = todos.filter((todo) => todo["id"].toString() !== todoId);
      setTodos(list);
      deleteTodo(todoId);
    }
  };

  /**
   * TodoListの編集処理
   * @param {int} id - TodoListのid
   * @param {*} value - 変更した値を格納
   */
  const handleOnEdit = (id, value) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  /**
   * TodoListの変更確定ボタンを押した時の処理
   * @param {*} event - 変更確定ボタンのevent受け取り
   * ボタンにidを連携させて、findで抽出したidとボタンidを比較して、一致したtodosだけを抜き出す。
   */
  const handlePut = (event) => {
    if (window.confirm("内容を変更しますか？")) {
      const todoId = event.currentTarget.dataset.id;
      const findTodos = todos.find((todo) => todo["id"].toString() === todoId);
      putTodo(todoId, findTodos.title);
    }
  };

  return (
    <div className="wrapper">
      <h1>DRF x React Todo</h1>
      <AddTodo
        addInputTodo={addInputTodo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleOnEdit={handleOnEdit}
        handlePut={handlePut}
      />
    </div>
  );
};

export default App;
