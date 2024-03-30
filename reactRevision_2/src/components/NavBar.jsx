import React, { useState ,useEffect, useContext} from 'react';
import "./NavBar.css"
import { Link } from 'react-router-dom';
import { LoginlogoutContext } from '../context/LoginLogoutContrxt';

const NavBar = () => {
  // Declare state variables for login and dark mode
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginlogoutContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to handle login and logout
  const handleLogin = () => {
    setIsLoggedIn(prev => !prev); // Toggle isLoggedIn state
    localStorage.setItem("isLoggedIn", !isLoggedIn);
  }

  // Function to handle dark mode toggle
  const handleDarkModeToggle = () => {
    setIsDarkMode(prev => !prev); // Toggle isDarkMode state
  }

  // Function to apply the dark mode CSS class
  const applyDarkMode = () => {
    const currentTheme = isDarkMode ? 'dark' : 'light';
    document.documentElement.classList = currentTheme;
  }

  // Call the `applyDarkMode` function when the component mounts
  useEffect(() => {
    applyDarkMode();
  }, [isDarkMode]);

  return (
    <nav className={isDarkMode ? 'navbar-dark' : 'navbar-light'}>
      <div className="navbar-nav">
        <div className="nav-item">
          <button className="nav-link" onClick={handleLogin}>
            {isLoggedIn ? 'Logout' : <Link to="/login">Login</Link>}
          </button>
        </div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <div className="nav-item">
          <button className="nav-link" onClick={handleDarkModeToggle}>
            {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
