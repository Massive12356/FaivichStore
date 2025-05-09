import React,{useState} from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from "react-router";
import Footer from '../components/Footer'

const RootLayout = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  return (
    <div>
      {/* Pass setSearchQuery to NavBar */}
      <NavBar setIsBlurred={setIsBlurred} setSearchQuery={setSearchQuery} />

      <div
        className={`transition-all duration-300 ${
          isBlurred ? "blur-sm brightness-95 z-50" : ""
        }`}
      >
        {/* Pass searchQuery as context to Outlet */}
        <Outlet context={{ searchQuery }} />
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout