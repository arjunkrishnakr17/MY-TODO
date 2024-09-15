import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot } from 'recoil'
import { GetTodo } from './components/GetTodo'
import { CreateTodo } from './components/CreateTodo'
import {BrowserRouter, Routes,Route} from "react-router-dom";
import { Login } from './components/Login'
import { Signup } from './components/Signup'

function App() {
  return (
  <div>
    <BrowserRouter>
    <RecoilRoot>
    <Routes>
      <Route path="/" element={<Suspense fallback={"loading"}><CreateTodo></CreateTodo><GetTodo></GetTodo></Suspense>} />
      <Route path="/login" element={<Suspense fallback={"loading"}><Login></Login></Suspense>} />
      <Route path="/signup" element={<Suspense fallback={"loading"}><Signup></Signup></Suspense>} />
    </Routes>
    </RecoilRoot>
    </BrowserRouter>
    
  </div>
  )
}

export default App
