import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="brand">
             Boza Movies 
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links desktop-only">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
          >
            Favorites
          </Link>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="hamburger mobile-only"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
  <button className="close-btn" onClick={() => setSidebarOpen(false)}>
    <FaTimes />
  </button>

  {/* Column layout */}
  <div className="sidebar-links">
    <Link
      to="/"
      className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      onClick={() => setSidebarOpen(false)}
    >
      Home
    </Link>
    <Link
      to="/favorites"
      className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
      onClick={() => setSidebarOpen(false)}
    >
      Favorites
    </Link>
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  </div>
</div>


    </>
  );
}

export default NavBar;
