import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='w-full h-16 border-b-2 px-2 flex items-center justify-between' >

    <Link to={"/"} >
      Logo
    </Link>

      <ul className='flex gap-4' >
 {
  ["/","/about","/contact"].map((item) => (
    <li key={item} >
    <Link to={item} >{item == "/" ? "Home" : item.replace("/","")}</Link>
  </li>
  ))
 }
      </ul>
    </header>
  )
}

export default Header