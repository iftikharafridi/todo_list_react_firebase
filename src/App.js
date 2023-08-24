import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Link, Routes} from "react-router-dom";
import ToDoForm from './components/ToDoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/ToDoList';

// Import all my pages/components
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Faq from "./components/Faq";
import NavMenu from "./components/NavMenu";

// Firebase related imports
import { db } from './firebase.config';
import {collection, addDoc, doc, getDoc, getDocs, deleteDoc, updateDoc} from "firebase/firestore"

function App() {
// const [todoList, setTodoList] = useState([
//   {
//     task: "Sample Task-01", 
//     isCompleted: false     
//   },
//   {
//     task: "Sample Task-02",
//     isCompleted: false
//   }
// ]);

const [todoList, setTodoList] = useState([]);

const getAllTask = async () => {
  const collectionRef = collection(db, 'todo');
  await getDocs(collectionRef).then((querySnapshot) => {
     // console.log(querySnapshot.docs);
        const listOfAllTask =  querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setTodoList(listOfAllTask)
  }).catch((err) => {
    console.error("Sorry can't fetch the docs due to error: ", err);
  })
}

useEffect(() => {
  getAllTask();
}, [])

// const addTask = newTask => {
//   console.log(newTask);
//     const newTodoList = [...todoList, {task: newTask, isCompleted: false}]; // As the key field in the todoList is task, so I just added the task key 
//     setTodoList(newTodoList);
// }; 

const addTask = async (newTask) => {
    console.log(newTask);
    try {
      const collectionRef = collection(db, 'todo');
      const docRef = await addDoc(collectionRef, {
        task: newTask,
        isCompleted: false
      });
        console.log("Document successfully added to firestore with id: ", docRef.id)
        //getAllTask();
        window.location.reload();
    } catch(err){
      console.error("Sorry there is some error and document is not added to firestore", err)
    }

};

// const deleteTask = index => {
//     console.log(index);
//     const newTodoList = [...todoList];
//     newTodoList.splice(index, 1);
//     setTodoList(newTodoList);    

// };

const deleteTask = async (id) => {
  try {
      const documentRef = doc(db, "todo", id);
      await deleteDoc (documentRef)
      getAllTask();
      //window.location.reload();
  } catch(err) {
    console.error(err)
  }
}

const completeTask = async (id) => {
  try {
      //console.log(id)
      const documentRef = doc(db, "todo", id);
      const docSnap = await getDoc(documentRef)
     // console.log(docSnap.data())
      const task = docSnap.data();
      //console.log(task)
      task.isCompleted === false ? task.isCompleted =true : task.isCompleted = false;

      await updateDoc(documentRef, {isCompleted: task.isCompleted})

      getAllTask();
      //window.location.reload();
  } catch(err) {
    console.error(err)
  }
}

// const completeTask = index => {
//   console.log(index)
//   const newTodoList = [...todoList];
//   newTodoList[index].isCompleted === false ? newTodoList[index].isCompleted = true : newTodoList[index].isCompleted = false;
//   setTodoList(newTodoList);
// };

  return (
    <div className="App">
      <BrowserRouter>
        <NavMenu />
        <Routes>        
          <Route path='/' element = {<Home />} />
          <Route path='/About' element = {<About />} />
          <Route path='/Contact' element = {<Contact />} />
          <Route path='/Faq' element = {<Faq />} />          
          <Route path='*' element = {<NotFound />} />
        </Routes>
      </BrowserRouter>
      <h1>My Todo List</h1>
      <ToDoForm addTask= {addTask} />
      <br />
      <TodoList todoList={todoList} completeTask = {completeTask} deleteTask = {deleteTask} />
    </div>
  );
}

export default App;
