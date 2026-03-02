import { useState } from 'react'
import { NavBar } from './component/navbar'
import { Footer } from './component/footer'
import { Route,Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { About } from './pages/about'
import { ContactUs } from './pages/contactUs'

function App() {


  return (
    <>
     
    <NavBar/>
    <Routes>
      <Route path='/' element={ <Home/>} />
      <Route path='about' element={ <About/> } />
      <Route path='contactus' element={<ContactUs/>} />
    </Routes>

    <Footer/>

    </>
  )
}

export default App
