import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./LoginForm.js";
import { RegisterForm } from "./RegisterForm.js";
import { LoginForm } from "./LoginForm.js";
import { Navbar } from "./Navbar.js";
import { ToDoList } from "./ToDoList.js";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/todolist" element={<ToDoList />} />
      </Routes>
    </>
  );
}

export default App;
