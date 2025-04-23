import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from "react-router";
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout