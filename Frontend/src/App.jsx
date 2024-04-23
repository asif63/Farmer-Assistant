import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import NavigationBar from './Component/NavigationBar';
import Home from './Component/Home';
import Contact from './Component/Contact';
import About from './Component/About';
import Soil from './Component/Soil';
import Crops from './Component/Crops';
import Footer from './Component/Footer';
import Blog from './Component/Blog';
import Signup from './Component/Signup';
import Weather from './Component/Weather';
import LocationMonthSoilCrops from './Crops Suggestion/LocationMonthSoilCrops';
import LocationMonthCrops from './Crops Suggestion/LocationMonthCrops';
import LocationSoilCrops from './Crops Suggestion/LocationSoilCrops';
import MonthSoilCrops from './Crops Suggestion/MonthSoilCrops';


import LocationCrops from './Crops Suggestion/LocationCrops';
import MonthCrops from './Crops Suggestion/MonthCrops';
import SoilCrops from './Crops Suggestion/SoilCrops';
import Login from './Product Management/Login';
import UserDashboard from './Product Management/UserDashboard';

function App() {
  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Check if the current route is the signup page
  const isSignupPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/';
  // Conditionally render NavigationBar and Footer
  const renderNavigationBar = isSignupPage | isLoginPage? null : <NavigationBar />;
  const renderFooter = isSignupPage | isLoginPage ? null : <Footer />;
 



  return (
    <>
      {renderNavigationBar}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu/crops" element={<Crops />} />
        <Route path="/menu/soil" element={<Soil />} />
        <Route path='/services/location-month-soil-crops' element={<LocationMonthSoilCrops />} />
        <Route path='/services/location-month-crops' element={<LocationMonthCrops />} />
        <Route path='/services/location-soil-crops' element={<LocationSoilCrops />} />
        <Route path='/services/month-soil-crops' element={<MonthSoilCrops />} />
        <Route path='/services/location-crops' element={<LocationCrops />} />
        <Route path='/services/month-crops' element={<MonthCrops />} />
        <Route path='/services/soil-crops' element={<SoilCrops />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/menu/weather' element={<Weather/>}/>
      </Routes>
      {renderFooter}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
