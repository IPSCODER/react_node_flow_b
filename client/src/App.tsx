import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/home/Home';
import Theme from 'theme/Theme';
import About from 'pages/about/About';
import Contact from 'pages/contact/Contact';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Theme/>} >
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
