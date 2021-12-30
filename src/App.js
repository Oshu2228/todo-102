import React,{ useState } from "react";

function App() {

const [todos, setTodos] = useState([])
const [todoTitle, setTodoTitle] = useState("")
const [todoId, setTodoId] = useState(1)

//タイトルinput内の入力した文字を取得
const handleSetTodoTitle = (e) => {
  setTodoTitle(e.target.value)
}
//入力したタイトルをリセット
const resetTodoTitle = () => {
  setTodoTitle("")
}
//　todosの配列[]にオブジェクトを追加
 const handleAddTodo = () => {
  setTodos([...todos,
    {
      id: todoId,
      title: todoTitle,
      status:"notStated"
  }])
    setTodoId(todoId + 1)
    resetTodoTitle()
}

//
const handleDeleteTodo = (targetTodo) => {
  setTodos(todos.filter((todo) => todo.id !== targetTodo.id))
} 

  return (
    <>
    {/* タイトル追加フォーム */}
    <label htmlFor="todo">タイトル:</label>
    <input type="text" 
           name="todo"
           value={todoTitle}
           onChange={handleSetTodoTitle}></input>
    <button onClick={handleAddTodo}>作成</button>

    {/* 編集フォーム */}
    {/* <label htmlFor="edit">新しいタイトル</label>
    <input type="text" name="edit"></input>
    <button>編集を保存</button>
    <button>キャンセル</button> */}

    {/* 表示切り替えプルダウン */}
    <select>
      <option value="all">全て</option>
      <option value="notStated">未着手</option>
      <option value="inProgress">作業中</option>
      <option value="done">完了</option>
    </select>

    <ul>
      {/* map => ()になる */}
      {todos.map((todo)=> (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <select value={todo.status}>
          <option value="notStated">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
          </select>
        <button>編集</button>
        <button onClick={() => handleDeleteTodo(todo)}>削除</button>
      </li>
      ))}
      
    </ul>
    </>
  );
}

export default App;
