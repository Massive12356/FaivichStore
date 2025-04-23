import {Toaster} from 'react-hot-toast'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import RootLayout from './layouts/RootLayout';
import Landing from './pages/user/Landing';
import SingleAd from './pages/dashboard/SingleAd';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Adverts from './pages/user/Adverts';
import VendorAds from './pages/dashboard/VendorAds';
import CreateAd from './pages/dashboard/CreateAd';
import UpdateAd from './pages/dashboard/UpdateAd';
import Orders from './pages/dashboard/Orders';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import SingleOrderDetails from './pages/dashboard/SingleOrderDetails';
import Contact from './pages/user/Contact';
import About from './pages/user/About';
import SingleAdvert from './pages/user/SingleAdvert';
import FaqSection from './components/FaqSection';
import CheckOut from './pages/user/CheckOut';

function App() {
  

  return (
    <>
    {/* notification management */}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#4caf50", // Green for success
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#4caf50",
            },
          },
          error: {
            style: {
              background: "#f44336", // Red for error
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#f44336",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />

      {/* routes management */}
      <BrowserRouter>
        <Routes>
          {/* navigation for users */}
          <Route path='/' element={<RootLayout/>}>
            <Route index={true} element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='adverts' element={<Adverts/>}/>
            <Route path='adverts/:id' element={<SingleAdvert/>}/>
            <Route path='/faqs' element={<FaqSection/>}/>
            <Route path='/checkout' element={<CheckOut/>}/>
            
            <Route path='contact' element={<Contact/>}/>
            <Route path='about' element={<About/>}/>
            
            
          </Route>

          
          {/* navigation for vendor */}
          <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route index={true} element={<Overview/>}/>
            <Route path='vendorAds' element={<VendorAds/>}/>
            <Route path='vendorAds/:id' element={<SingleAd/>}/>
            <Route path='createAd' element={<CreateAd/>}/>
            <Route path='updateAd/:id' element={<UpdateAd/>}/>
            <Route path='vendorAds/:id' element={<SingleAd/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='orders/:id' element={<SingleOrderDetails/>}/>
            <Route path='singleAd/:id' element={<SingleAd/>}/>
          </Route>

        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App
