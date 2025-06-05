import React,{useState} from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from "react-router";
import Footer from '../components/Footer'

const RootLayout = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  return (
    <div>
      {/* Pass setSearchQuery to NavBar */}
      <NavBar setIsBlurred={setIsBlurred}/>

      <div
        className={`transition-all duration-300 ${
          isBlurred ? "blur-sm brightness-95 z-50" : ""
        }`}
      >
        {/* Pass searchQuery as context to Outlet */}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout