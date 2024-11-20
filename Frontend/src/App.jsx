import React from 'react'
import Home from "./home/Home"
import {Navigate, Route,Routes} from "react-router-dom"
import Courses from './courses/Courses.jsx'
import Signup from './components/Signup.jsx'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider.jsx'

function App() {
  
  const [authUser,setAuthUser]=useAuth();
  console.log(authUser);
  return (
    <>
    <div className='dark:bg-slate-800 dark:text-white '>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Course" element={authUser ? <Courses /> : <Navigate to="/signup" />}
    />
    <Route path="/signup" element={<Signup />}/>
   </Routes>
   <Toaster />
    </div>
   
    </>
  )
}

export default App
