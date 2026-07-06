import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaBars, FaTimes, FaSun, FaMoon, FaFilm } from "react-icons/fa";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand">
          <Link to="/" className="brand">
            <FaFilm className="brand-icon" />
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
            className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
          >
            Favorites
          </Link>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="hamburger mobile-only"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Menu */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-hidden={!sidebarOpen}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
          <FaTimes />
        </button>

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
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
