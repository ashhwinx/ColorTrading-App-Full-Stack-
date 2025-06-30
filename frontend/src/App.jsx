import { useState } from 'react'
import Game from './Game'
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/home" element={<Game />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App
