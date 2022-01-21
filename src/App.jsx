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

  const postTodo = (title) => {
    return fetch("http://localhost:8000/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
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
  //   const value = e.target.value;
  //   const name = e.target.value;
  //   setEditTodo({ ...editTodo, [name]: value });
  // };

  // //送信ボタンを押した時に発火。todoをデータベースへ追加
  // const createNewTodo = (todo) => {
  //   try {
  //     async function fetchCreateTodo(todo) {
  //       const config = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(todo),
  //       };
  //       const res = await fetch("http://localhost:8000/api/todos/", config);
  //       const todoJson = await res.json();
  //       setTodos([todoJson, ...todos]);
  //       setEditTodo({ id: "", title: "", content: "" });
  //     }
  //     fetchCreateTodo(todo);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div className="wrapper">
      <CreateTodo
        editTodo={editTodo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        // createNewTodo={createNewTodo}
      />
      <DrfApi todos={todos} />
    </div>
  );
};

export default App;
