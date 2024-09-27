import Footer from 'common/footer/Footer'
import Header from 'common/header/Header'
import { Outlet } from 'react-router-dom'

const Theme = () => {
  return (
    <>
        <Header/>
    <main className='h-[calc(100vh_-_56px)] w-full' >
        <Outlet/>
    </main>
        <Footer/>
    </>
  )
}

export default Theme