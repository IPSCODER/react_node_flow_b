import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/home/Home';
import Theme from 'theme/Theme';
import About from 'pages/about/About';
import Contact from 'pages/contact/Contact';
import SignIn from 'auth/sign-in/SignIn';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Theme/>} >
      <Route path='/' element={<SignIn/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
