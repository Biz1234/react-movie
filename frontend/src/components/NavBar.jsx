import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Apply theme class to body for CSS targeting
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand">
          🎬 Movie App
        </Link>  
      </div>
      <div className="navbar-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>  
        <Link 
          to="/favorites" 
          className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
        >
          Favorites
        </Link>  
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;