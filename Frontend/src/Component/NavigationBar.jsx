import { Link,useNavigate } from "react-router-dom";
import logo from "../images/farmer logo.png";
import "../Style/Navbar.css";
import { useState } from 'react';


const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = () => {
    // Perform logout actions
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
  };
  return (
    <nav className="navbar">
      <div className="nav logo">
        <img src={logo} alt="Logo" width="90px" />
        <Link to="/dashboard" className="lst">
          Dashboard
        </Link>
      </div>
      <div className="nav link">
      
        <Link to="/home" className="lst">
          Home
        </Link>
        <div className="dropdown">
        <span className="lst"> {/* Replace Link with span */}
            Menu
          </span>
          <div className="dropdown-content">
            <Link to="/menu/weather">Weather</Link>
            <Link to="/menu/crops">Crops</Link>
            <Link to="/menu/soil">Soil</Link>
            {/* Add more sub-links as needed */}
          </div>
        </div>
        <div className="dropdown">
        <span className="lst"> {/* Replace Link with span */}
            Services
          </span>
          <div className="dropdown-content">
            <Link to="/services/location-crops">Location Crops</Link>
            <Link to="/services/month-crops">Month Crops</Link>
            <Link to="/services/soil-crops">Soil Crops</Link>
            <Link to="/services/location-month-crops">
              Location Month Crops
            </Link>
            <Link to="/services/location-soil-crops">Location Soil Crops</Link>
            <Link to="/services/month-soil-crops">Month Soil Crops</Link>
            <Link to="/services/location-month-soil-crops">
              Location Month Soil Crops
            </Link>

            {/* Add more sub-links as needed */}
          </div>
        </div>

        
        <Link to="/about" className="lst">
          About
        </Link>
        <Link to="/contact" className="lst">
          Contact
        </Link>
        <div className="button">
        {isLoggedIn ? (
            <button onClick={handleLogout} className="Logout Btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="Login Btn">
                Login
              </Link>
              <Link to="/signup" className="Signup Btn">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
