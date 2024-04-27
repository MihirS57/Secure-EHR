import "./styles.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./views/login"
import Dashboard from "./views/dashboard"
import Register from "./views/register"
export default function App(){
  return (
    <>
    <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard/*" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> 
    </Routes>
    </>
    
    
  )
}