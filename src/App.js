import React,{ useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import EditForm from "./components/EditForm";
import Filter from "./components/Filter";



function App() {

const [todos, setTodos] = useState([])
const [todoTitle, setTodoTitle] = useState("")
const [todoId, setTodoId] = useState(1)
//フィルター要素
const [filterTodos, setFilterTodos] = useState([])
const [filter, setFilter] = useState("notStated")
// 編集用関数
const [isEditable, setIsEditable] = useState(false)
const [editId, setEditId] = useState()
const [newTitle, setNewTitle] = useState("")


const handleSetNewTitle = (e) => {
  setNewTitle(e.target.value)
}
// 引数内の{}を忘れないように注意
const handleOpenEditForm = ({id, title}) => {
  setIsEditable(true)
  setEditId(id)
  setNewTitle(title)
}

const handleCloseEditForm = () => {
  setIsEditable(false)
  setEditId()
}

const handleEditTodo = () => {
  setTodos([...todos].map((todo) => 
    todos.id === editId.id ? {...todo, title: newTitle} : todo
  ))
  setNewTitle("")
  handleCloseEditForm()
  setEditId()
}

//フィルター
// const handleStatusChange = ({id}, e) => {
//   const newTodos = todos.map((todo) => ({...todo}))
//   setTodos(
//     newTodos.map((todo) => todo.id === id ? {...todo, status: e.target.value}:todo)
//   )
// }


// useEffect(() => {
//   const filteringTodos = () => {
//     switch(filter){
//       case "notStated":
//       setFilterTodos(
//         todos.filter((todo) => {
//           todo.status === "notStated"
//         })
//       )
//       break;
//       case "inProgress":
//         setFilterTodos(
//           todos.filter((todo) => {
//             todo.status === "inProgress"
//           })
//         )
//         break;
//       case "done":
//         setFilterTodos(
//           todos.filter((todo) => {
//             todo.status === "done"
//           })
//         )
//         break;
//       default:
//         setFilterTodos(todos)  
//     }
//   }
//   filteringTodos()
// }, [filter, todos])

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
    {!isEditable ? (
        <InputForm
          todoTitle = {todoTitle}
          handleSetTodoTitle = {handleSetTodoTitle}
          handleAddTodo = {handleAddTodo}/>   
    ):(
        <EditForm
        newTitle = {newTitle}
        handleSetNewTitle = {handleSetNewTitle}
        handleEditTodo = {handleEditTodo}
        handleCloseEditForm = {handleCloseEditForm}
        />
        
    )}
    
      <Filter/>

    <ul>
      {/* map => ()になる */}
      {todos.map((todo)=> (
        <li key={todo.id}>
          <span>{todo.id}</span>
          <span>{todo.title}</span>
          <select defaultValue={todo.status}>
          <option value="notStated">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
          </select>
        <button onClick={() => handleOpenEditForm(todo)}>編集</button>
        <button onClick={() => handleDeleteTodo(todo)}>削除</button>
      </li>
      ))}
      
    </ul>
    </>
  );
}

export default App;
